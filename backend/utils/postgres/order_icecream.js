// joins with order
module.exports = (db, Sequelize) => (
  db.define('order_icecream', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  }, {
    underscored: true,
  })
);
