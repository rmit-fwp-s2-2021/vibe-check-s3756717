module.exports = (express, app) => {
    const controller = require("../controllers/login.controller.js");
    const router = express.Router();
  
    // Select all loginEntry.
    router.get("/", controller.all);
  
    // Create a new loginEntry.
    router.post("/", controller.create);
  
    // Add routes to server.
    app.use("/api/loginEntries", router);
  };