module.exports = (sequelize, DataTypes) =>
  sequelize.define("comment", {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    commentText: {
      type: DataTypes.STRING(600),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });