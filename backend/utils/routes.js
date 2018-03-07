const router = require('express').Router();
const bp = require('body-parser');
const twilio = require('./twilio');

const {
  Order,
  Icecream,
  OrderIcecream,
} = require('./postgres');
const getDistance = require('./getDistance');

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
    const phone = req.body.From.slice(2);
    const o = await Order.findOne({ where: { phone }, order: [['id', 'DESC']] });
    const oi = await OrderIcecream.findAll({ where: { order_id: o.id }, include: [{ model: Icecream }] });
    let body = `Forwarded message\n============\n${req.body.Body}\n============\n`;
    body += `\nid: ${o.id}\nAddress: ${o.address}\nPhone: ${o.phone}\nName: ${o.name}`;
    oi.forEach(x => body += `\n${x.quantity} ${x.icecream.flavor}`);
    const msg = { from: process.env.TWILIO_PHONE_NUMBER, body };
    msg.to = process.env.JEFF_PHONE;
    twilio.messages.create(msg);
    msg.to = process.env.ROB_PHONE;
    twilio.messages.create(msg);
    res.send('OK');
  } catch (error) {
    console.log('Error sending Twilio webhook', error);
    res.send('Error!');
    throw error;
  }
});

module.exports = router;
