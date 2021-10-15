const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) =>
  sequelize.define("login", {
    login_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    loginTime: {
        type: DataTypes.DATE(6),
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });