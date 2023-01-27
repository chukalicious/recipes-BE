const express = require("express");
const Recipes = require("./recipes-model");
const router = express.Router();

router.get("/", (req, res) => {
  Recipes.getAll()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: `Server Error` });
    });
});

module.exports = router;
