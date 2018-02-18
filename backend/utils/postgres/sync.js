const {
  db,
  Order,
  Icecream,
  OrderIcecream,
} = require('./index.js');

const menu = require('./menu.js');

const populate = async () => {
  try {
    await Promise.all(menu.map(x => Icecream.create(x)));
    // receives a socket object with order properties
    // and an array of objects that represents ice creams
    // client ice creams should be an array of objects with id and quantities
    const o1 = await Order.create({
      name: 'Bob',
      address: '874 Fell St.',
      phone: '5136966969',
    });
    // for each if ice cream obj, if quantity is greater than 0, find the ice cream
    // and create an OrderIcecream with order_id o1 and ice_cream obj.icecream[i].id
  } catch (err) { console.log('Error populating', err); }
};

(async () => {
  try {
    await db.sync({ force: true });
    await populate();
    console.log(`\nSuccessfully seeded ${process.env.POSTGRES_URI} tables!`);
    process.exit(0);
  } catch (err) {
    console.log('\nError seeding database tables:', err);
    process.exit(1);
  }
})();
