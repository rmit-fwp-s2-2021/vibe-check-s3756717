module.exports = (sequelize, DataTypes) =>
  sequelize.define("follow", {
    follow_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    followingUsername: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });