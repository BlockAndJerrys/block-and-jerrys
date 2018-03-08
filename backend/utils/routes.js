const router = require('express').Router();
const bp = require('body-parser');
const twilio = require('./twilio');
const axios = require('axios');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  Promise: Promise,
});


const locations = require('./benAndJerriesLocations.js');
const {
  Order,
  Icecream,
  OrderIcecream,
  DriverOrders,
  db
} = require('./postgres');
const findDistance = (distanceArray) => {
  return distanceArray[0].distance.value + distanceArray[1].distance.value;
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
  router.use('/dashboard/driverQueue/:driverId', async(req, res) => {
    const data = db.query('SELECT d_o.order_id, d.name as driver_name, o.id, o.name, o.status, o.address, o.invoice, o.email, o.created_at, o.updated_at FROM driver_orders d_o left join drivers d on d_o.driver_id=d.id left join orders o on d_o.order_id=o.id');
    res.json({ data });
  });
  router.use('/dashboard/order/:orderId', async (req, res) => {
    const data = await OrderIcecream.findAll({
      where: {
        order_id: req.params.orderId,
      },
      include: [{ model: Icecream }],
    });
    const additionalInfo = await DriverOrders.find({ where: { order_id: req.params.orderId } });
    res.json({ data, additionalInfo});
  });

  router.use('/dashboard/orders', async (req, res) => {
    let data = await db.query('SELECT d.name as delivery_driver, o.id, o.name, o.status, o.address, o.invoice, o.email, o.created_at, o.updated_at FROM driver_orders d_o left join drivers d on d_o.driver_id=d.id right join orders o on d_o.order_id=o.id;');
    res.json({ success: true, data });
  });
  router.post('/login', passport.authenticate('local'), async (req, res) => {
    let data = await db.query('SELECT d.name as delivery_driver, o.id, o.name, o.status, o.address, o.invoice, o.email, o.created_at, o.updated_at FROM driver_orders d_o left join drivers d on d_o.driver_id=d.id right join orders o on d_o.order_id=o.id;');
    res.json({ success: true, data, driver: req.user.get() });
  });
  router.use('/dashboard', async(req, res) => {
    if (!req.user) {
      res.json({ success: false });
    } else {
      let data = await db.query('SELECT d.name as delivery_driver, o.id, o.name, o.status, o.address, o.invoice, o.email, o.created_at, o.updated_at FROM driver_orders d_o left join drivers d on d_o.driver_id=d.id right join orders o on d_o.order_id=o.id;');
      res.json({ success: true, data });
    }
  });

  router.post('/acceptJob', async (req, res) => {
    const {jobId, driverId, latitude, longitude, orderLocation} = req.body;
    // find closest waypoint_store
    let distances = await Promise.all(locations.map(location => {
      return googleMapsClient.directions({
        origin: [latitude, longitude],
        destination: orderLocation,
        waypoints: [location.address],
      }).asPromise();
    }));
    distances = distances.map(x => x.json.routes[0].legs);
    let minDistance = distances[0][0].distance.value + distances[0][1].distance.value;
    let minRoute = distances[0];
    distances.forEach(distance => {
      const totalDistance = findDistance(distance);
      if (totalDistance < minDistance) {
        minDistance = totalDistance;
        minRoute = distance;
      }
    });
    // find closest grocery stores and calculate waypoint times to destination
    const DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
    const query = DISTANCE_API_URL + `location=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&opennow=true&rankby=distance&type=convenience_store`;
    let nearByStores = await axios.get(query);
    nearByStores = nearByStores.data.results.slice(0, 3);

    let storeDistances = await Promise.all(nearByStores.map(store => {
      return googleMapsClient.directions({
        origin: [latitude, longitude],
        destination: orderLocation,
        waypoints: [store.formatted_address],
      }).asPromise();
    }));
    storeDistances = storeDistances.map(x => [x.json.routes[0].legs[0].end_address,findDistance(x.json.routes[0].legs)]);

    // find closest orders within 5 minutes of the order.
    let untakenOrders = await db.query('SELECT * FROM orders o WHERE  NOT EXISTS (SELECT 1 FROM   driver_orders i WHERE  o.id = i.order_id);');
    untakenOrders = untakenOrders[0];
    const filteredOrders = await Promise.all(untakenOrders.map(order => {
      return googleMapsClient.distanceMatrix({
        origins: [orderLocation],
        destinations: [order.address],
      }).asPromise();
    }));
    const closeByOrders = [];
    untakenOrders.forEach(order => {
      filteredOrders.forEach(filteredOrder => {
        const distanceFromTargetOrder = filteredOrder.json.rows[0].elements[0].distance.value;
        if (filteredOrder.query.destinations !== filteredOrder.query.origins && order.address === filteredOrder.query.destinations && distanceFromTargetOrder <= 1600) {
          closeByOrders.push(order.id);
        }
      });
    });
    DriverOrders.create({ progress: 'Accepted', accepted_at: new Date(), order_id: jobId, driver_id: driverId, grocery_stores: storeDistances, waypoint_store: [minRoute[0].end_address, minDistance], nearby_orders: closeByOrders }).then(result => {
      res.json(result);
    });
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
