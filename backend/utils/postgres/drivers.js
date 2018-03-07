
module.exports = (db, Sequelize) => (
  db.define('drivers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    location_lat: {
      type: Sequelize.DOUBLE,
    },
    location_lon: {
      type: Sequelize.DOUBLE,
    },
    stock: {
      type: Sequelize.JSONB,
    },
    online: {
      type: Sequelize.BOOLEAN,
    },
    password: {
      type: Sequelize.STRING,
    },
  }, {
    underscored: true,
  })
);
