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

Order.hasMany(OrderIcecream);
Icecream.hasMany(OrderIcecream);

module.exports = {
  db,
  Op,
  Order,
  Icecream,
  OrderIcecream,
};
