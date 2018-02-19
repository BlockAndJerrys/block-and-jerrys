// joins with ice_creams
module.exports = (db, Sequelize) => (
  db.define('order', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING(1234),
    },
    // unpaid, paid, delivered
    status: {
      type: Sequelize.STRING,
      defaultValue: 'unpaid',
    },
    invoice: {
      type: Sequelize.STRING(1234),
      unique: true,
    },
  }, {
    underscored: true,
  })
);
