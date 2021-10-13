module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    postPicture: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userProfilePicture: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    likes: {
      type: DataTypes.INTEGER
    },
    dislikes: {
      type: DataTypes.INTEGER
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
