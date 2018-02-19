const router = require('express').Router();
const bp = require('body-parser');

const {
  Order,
  Icecream,
  OrderIcecream,
} = require('./postgres');

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

router.use('/dashboard', bp.json(), bp.urlencoded({ extended: false }), async (req, res) => {
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

module.exports = router;
