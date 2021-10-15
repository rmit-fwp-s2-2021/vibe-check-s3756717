const db = require("../database");

exports.all = async (req, res) => {
    const loginEntries = await db.login.findAll();
  
    res.json(loginEntries);
};

exports.create = async(req,res) => {
    const loginEntry = await db.login.create(
        {
            username: req.body.username
        }
    )

    res.json(loginEntry);
}