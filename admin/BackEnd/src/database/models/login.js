module.exports = (sequelize, DataTypes) =>
  sequelize.define("login", {
    login_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: true
  });