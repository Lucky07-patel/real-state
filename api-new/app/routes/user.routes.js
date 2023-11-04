module.exports = app => {
  const tutorials = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/signup", tutorials.create);
  router.post("/login", tutorials.login);

  router.post("/createRole", tutorials.createRole);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/user", router);
};
