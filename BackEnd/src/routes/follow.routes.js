module.exports = (express, app) => {
    const controller = require("../controllers/follow.controller.js");
    const router = express.Router();
  
    // Select a single user with id.
    router.get("/select/:id", controller.all);
  
    // Add new follower.
    router.post("/", controller.create);

    // Delete follower
    router.delete("/", controller.delete);
  
    // Add routes to server.
    app.use("/api/follow", router);
  };