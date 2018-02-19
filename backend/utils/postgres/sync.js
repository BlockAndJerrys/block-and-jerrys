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
    const o1 = await Order.create({
      name: 'Bob',
      address: '874 Fell St.',
      phone: '5136966969',
      invoice: 'lnsb ~ test invoice ~',
    });
    await OrderIcecream.create({
      order_id: o1.id,
      icecream_id: 1,
      quantity: 2,
    });
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
