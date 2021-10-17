module.exports = (express, app) => {
    const controller = require("../controllers/follow.controller.js");
    const router = express.Router();
  
    // Select a single following with id.
    router.get("/select/:id", controller.all);
  
    // Add new following user.
    router.post("/", controller.create);

    // Delete following user.
    router.delete("/", controller.delete);
  
    // Add routes to server.
    app.use("/api/follow", router);
  };