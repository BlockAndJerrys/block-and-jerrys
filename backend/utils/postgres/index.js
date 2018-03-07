const {
  Sequelize,
  Op,
} = require('sequelize');

const db = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,
});

db.authenticate()
  .then(() => console.log(`\nConnected to "${process.env.POSTGRES_URI}".`))
  .catch((error) => {
    console.log(`\nUnable to connect to database: ${error}`);
    process.exit(1);
  });

const Order = db.import('./order.js');
const Icecream = db.import('./icecream.js');
const OrderIcecream = db.import('./order_icecream.js');
const Driver = db.import('./drivers.js');
const DriverOrders = db.import('./driver_orders.js');
Order.hasMany(OrderIcecream);
Icecream.hasMany(OrderIcecream);
OrderIcecream.belongsTo(Order);
OrderIcecream.belongsTo(Icecream);
Order.belongsToMany(Driver, {
  through: {
    model: DriverOrders,
  },
  foreignKey: 'order_id',
  constraints: false,
});
Driver.belongsToMany(Order, {
  through: {
    model: DriverOrders,
  },
  foreignKey: 'driver_id',
  constraints: false,
});
OrderIcecream.coneCount = async () => {
  const oics = await OrderIcecream.findAll({
    include: [{
      model: Order,
      where: { status: 'paid' },
    }],
  });
  const coneCount = oics.reduce((sum, x) => x.quantity + sum, 0);
  return coneCount;
};

Icecream.cart = async () => {
  const cart = await Icecream.findAll({
    order: [
      ['id', 'ASC'],
    ],
  });
  return cart;
};

module.exports = {
  db,
  Op,
  Order,
  Icecream,
  OrderIcecream,
  Driver,
  DriverOrders,
};
