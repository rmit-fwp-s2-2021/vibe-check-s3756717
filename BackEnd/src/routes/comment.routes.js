module.exports = (express, app) => {
    const controller = require("../controllers/comments.controller.js");
    const router = express.Router();
  
    // Select comments with post_id
    router.get("/", controller.all);
  
    // Create a new post.
    router.post("/", controller.create);
  
    // Add routes to server.
    app.use("/api/comments", router);
  };
  