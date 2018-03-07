// Many to many relationship between drivers and orders

module.exports = (db, Sequelize) => (
  db.define('driver_orders', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    progress: {
      type: Sequelize.STRING,
    },
    accepted_at: {
      type: Sequelize.DATE,
    },
    grocery_stores: {
      type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING)),
    },
    waypoint_store: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    nearby_orders: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
  }, {
    underscored: true,
  })
);
