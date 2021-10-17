const db = require("../database");

// Get all login entry records
exports.all = async (req, res) => {
    const loginEntries = await db.login.findAll();
  
    res.json(loginEntries);
};

// Add login entry record to database
exports.create = async(req,res) => {
    const loginEntry = await db.login.create(
        {
            username: req.body.username
        }
    )

    res.json(loginEntry);
}