const express = require("express");
const Recipes = require("./recipes-model");
const router = express.Router();

router.get("/", (req, res) => {
  Recipes.findAll()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: `Server Error` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Recipes.findByID(id)
    .then((rec) => {
      if (!rec) {
        res.status(401).json({ message: `you must enter a recipe` });
      } else {
        res.status(201).json(rec);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Server Error` });
    });
});

router.post("/", (req, res) => {
  let recipe = req.body;
  try {
    if (!recipe) {
      res.status(401).json({ message: `You must enter a recipe` });
    } else {
      res.status(201).json(recipe);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server Error` });
  }
});

module.exports = router;
