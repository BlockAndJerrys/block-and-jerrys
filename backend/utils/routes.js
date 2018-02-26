const router = require('express').Router();
const bp = require('body-parser');
const twilio = require('./twilio');

const {
  Order,
  Icecream,
  OrderIcecream,
} = require('./postgres');
const googleDistance = require('./distance');

router.use(bp.json());
router.use(bp.urlencoded({ extended: false }));

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
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

router.use('/dashboard', async (req, res) => {
  if (req.body.baseball === process.env.BASEBALL) {
    const data = await Order.findAll({
    });
    res.json({ success: true, data });
  } else {
    res.json({ success: false });
    // ping us that there was an incorrect password attempt
    // log and save request data
  }
});

router.post('/twilio', async (req, res) => {
  try {
    if (req.body.From === process.env.JEFF_PHONE ||
        req.body.From === process.env.ROB_PHONE) {
      // split[0] is the id to look up, split[1] is the address of the driver
      const split = req.body.Body.split(' - ');
      const o = await Order.findOne({ where: { id: split[0] } });
      const d = await googleDistance({ origins: split[1], destinations: o.address });
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

module.exports = router;
