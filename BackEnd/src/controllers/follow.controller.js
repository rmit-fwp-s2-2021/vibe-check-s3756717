const db = require("../database");
const follow = require("../database/models/follow");

// Select all following users from the database.
exports.all = async (req, res) => {
    const following = await db.follow.findAll(
      {
        where: {
          username: req.params.id
        }
      }
    );
  
    res.json(following);
};

// Add following entry to the database.
exports.create = async (req, res) => {
    const following = await db.follow.create({
      followingUsername: req.body.followingUsername,
      username: req.body.username
    });
  
    res.json(following);
  };

// Remove following user from database for relevant user
exports.delete = async (req, res) => {
  const following = await db.follow.destroy(
    {
      where:{
        followingUsername: req.query.followingUsername,
        username: req.query.username
      }
    }
  );

  res.json(following);
}

