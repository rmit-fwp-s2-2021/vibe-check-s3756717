module.exports = (sequelize, DataTypes) =>
  sequelize.define("login", {
    login_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  }, {
    timestamps: true,
    dialectOptions: {
      // useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
      timezone: "+05:30"
    },
    timezone: "+05:30"
  });