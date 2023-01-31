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
  let { id } = req.params;

  Recipes.findByID(id)
    .then((rec) => {
      if (rec) {
        res.status(200).json(rec);
      } else {
        res.status(401).json({ message: `Cannot find that recipe` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Server Error` });
    });
});

router.post("/", async (req, res) => {
  let recipe = req.body;
  try {
    if (!recipe.recipe_name) {
      res.status(401).json({ message: `You must enter a recipe` });
    } else {
      const newRecipe = await Recipes.insert(recipe);
      res.status(201).json(newRecipe);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server Error` });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;

  try {
    if (!change.recipe_name) {
      res.status(401).json({ message: `you must enter a recipe name` });
    } else {
      const updated = await Recipes.update(id, change);
      res.status(201).json(updated);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server Error` });
  }
});

module.exports = router;
