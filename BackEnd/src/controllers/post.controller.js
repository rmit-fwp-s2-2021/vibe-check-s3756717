const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.post.create({
    text: req.body.text,
    username: req.body.username,
    postPicture: req.body.postPicture,
    userProfilePicture: req.body.userProfilePicture,
    likes: req.body.likes,
    dislikes: req.body.dislikes
  });

  res.json(post);
};

// Update Likes and Dislikes
exports.likes = async (req, res) => {
  const post = await await db.post.findByPk(req.body.post_id);
  
  post.likes = req.body.likes;
  post.dislikes = req.body.dislikes;

  await post.save();

  res.json(post);
};
