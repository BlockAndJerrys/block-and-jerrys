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
    paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    invoice: {
      type: Sequelize.STRING(1234),
      unique: true,
    },
  }, {
    underscored: true,
  })
);
