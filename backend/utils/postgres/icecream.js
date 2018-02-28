// joins with order
module.exports = (db, Sequelize) => (
  db.define('icecream', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    flavor: {
      type: Sequelize.STRING,
      unique: true,
    },
    price: {
      type: Sequelize.DOUBLE,
      defaultValue: 7.00,
    },
    img_url: {
      type: Sequelize.STRING,
    },
    img_logo: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING(1234),
      defaultValue: '',
    },
  }, {
    underscored: true,
  })
);
