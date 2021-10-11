const db = require("../database");
const argon2 = require("argon2");
const user = require("../database/models/user");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    username: req.body.username,
    password_hash: hash,
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    profilePicture: req.body.profilePicture
  });

  res.json(user);
};

// Update a user in the database
exports.update = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const currentUser = await db.user.findByPk(req.body.username);

  if(req.body.firstname == null){
    user.first_name = currentUser.firstname;
  }

  else if(req.body.lastname == null){
    user.first_name = currentUser.lastname;
  }

  else if(req.body.password == null){
    user.first_name = currentUser.password;
  }

  else{
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.password = hash;
  }
  

  await user.save();

  res.json(user);
}
