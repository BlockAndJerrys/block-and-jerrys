const router = require('express').Router();
const bp = require('body-parser');
const twilio = require('./twilio');
const bluebird = require('bluebird');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  Promise: Promise,
});


const locations = require('./benAndJerriesLocations.js');
const {
  Order,
  Icecream,
  OrderIcecream,
} = require('./postgres');
const findDistance = (distanceArray) => {
  return parseFloat(distanceArray[0].distance.text.split(' ')[0]) + parseFloat(distanceArray[1].distance.text.split(' ')[0]);
}
const getDistance = require('./getDistance');

module.exports = (passport) => {
  router.use(bp.json());
  router.use(bp.urlencoded({ extended: false }));

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  router.use('/dashboard/order/:orderId', async (req, res) => {
    const data = await OrderIcecream.findAll({
      where: {
        order_id: req.params.orderId,
      },
      include: [{ model: Icecream }],
    });
    res.json({ data });
  });

  router.use('/dashboard/orders', async (req, res) => {
    const data = await Order.findAll({
    });
    res.json({ success: true, data });
  });
  router.post('/login', passport.authenticate('local'), async (req, res) => {
    const data = await Order.findAll();
    // req.logIn(req.user, (err) => {
    //   return res.redirect('/dashboard');
    // });
    res.cookie('driver', req.user.get(), { maxAge: 900000, httpOnly: true });
    res.json({ success: true, data, driver: req.user.get() });
  });
  router.use('/dashboard', async(req, res) => {
    console.log("req user", req.user);
    console.log("req cookies", req.cookies);
    if (!req.user) {
      res.json({ success: false });
    } else {
      const data = await Order.findAll();
      res.json({ success: true, data });
    }
  });

  router.post('/acceptJob', async (req, res) => {
    console.log("reqbody", req.body);
    const {jobId, orderId, latitude, longitude, orderLocation} = req.body;
    // find closest waypoint_store
    let distances = await Promise.all(locations.map(location => {
      return googleMapsClient.directions({
        origin: [latitude, longitude],
        destination: orderLocation,
        waypoints: [location.address],
      }).asPromise();
    }));
    distances = distances.map(x => x.json.routes[0].legs);
    console.log("distances", distances[0][0].duration,distances[0][0].distance, distances[0][1].duration,distances[0][1].distance );
    let minDistance = distances[0][0].distance.value + distances[0][1].distance.value;
    let minRoute = distances[0];
    distances.forEach(distance => {
      const totalDistance = findDistance(distance);
      if (totalDistance < minDistance) {
        minDistance = totalDistance;
        minRoute = distance;
      }
    });
    console.log("min", minDistance, minRoute);
    const qs = require('querystring');
    const axios = require('axios');

    const DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
    const query = DISTANCE_API_URL + `location=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&opennow=true&rankby=distance&type=convenience_store`;
    console.log("QUERY", query);
    let nearByStores = await axios.get(query);
    // let nearByStores = await googleMapsClient.places({ location: [latitude, longitude], opennow: true, type: 'convenience_store', radius: 800 }).asPromise();
    // nearByStores = nearByStores.json.results.slice(3);
    nearByStores = nearByStores.data.results.slice(0, 3);

    let storeDistances = await Promise.all(nearByStores.map(store => {
      return googleMapsClient.directions({
        origin: [latitude, longitude],
        destination: orderLocation,
        waypoints: [store.formatted_address],
      }).asPromise();
    }));
    storeDistances = storeDistances.map(x => [x.json.routes[0].legs[0].end_address,findDistance(x.json.routes[0].legs)]);
    console.log("stores", storeDistances);
    // calculate geolocation and batch orders. I think it's only a greedy algorithm
    // find closest grocery stores and calculate waypoint times to destination
    // find closest orders within 5 minutes of the order.

    // DriverOrders.create({progress: 'Accepted', accepted_at: new Date(), order_id: req.body.jobId, driver_id: req.body.})
  });
  router.post('/twilio', async (req, res) => {
    try {
      if (req.body.From === process.env.JEFF_PHONE ||
          req.body.From === process.env.ROB_PHONE) {
        // split[0] is the id to look up, split[1] is the address of the driver
        const split = req.body.Body.split(' - ');
        const o = await Order.findOne({ where: { id: split[0] } });
        const d = await getDistance({ origins: split[1], destinations: o.address });
        if (d.status === 'OK') {
          let time = parseFloat(d.duration.text); // time taken if bicycling
          time += 10;
          twilio.messages.create({
            to: o.phone,
            from: process.env.TWILIO_PHONE_NUMBER,
            body: `Your ice cream is arriving. ETA: ${time} minutes 😛`,
          });
        }
      } else {
        console.log('Error making Google Destination query');
        twilio.messages.create({
          to: process.env.JEFF_PHONE,
          from: process.env.TWILIO_PHONE_NUMBER,
          body: 'Error making Google Destination query',
        });
      }
      res.send('OK');
    } catch (error) {
      console.log('Error sending Twilio webhook', error);
      res.send('Error!');
      throw error;
    }
  });
  return router;
};
