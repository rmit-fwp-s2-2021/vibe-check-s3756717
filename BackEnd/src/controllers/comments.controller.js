const db = require("../database");
const comment = require("../database/models/comment");

// Select all comments from the database for the relevant post.
exports.all = async (req, res) => {
    const comments = await db.comment.findAll();
  
    res.json(comments);
};

// Create a comment in the database.
exports.create = async (req, res) => {
    const comment = await db.comment.create({
      commentText: req.body.commentText,
      post_id: req.body.post_id,
      username: req.body.username,
      postPicture: req.body.postPicture,
      userProfilePicture: req.body.userProfilePicture
    });
  
    res.json(comment);
  };