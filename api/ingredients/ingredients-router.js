const express = require("express");
const Ingredients = require("./ingredients-model");
const router = express.Router();

router.get("/ingredients", (req, res) => {
  Ingredients.getAll()
    .then((ingrd) => {
      res.status(201).json(ingrd);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Server Error` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Ingredients.findByID(id)
    .then((ingr) => {
      if (ingr) {
        res.status(201).json(ingr);
      } else {
        res.status(400).json({ message: `Could not find the ingredient` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: `Server error` });
    });
});

router.post("/:id/ingredients", async (req, res) => {
  const ingredient = req.body;

  const newIngredient = await Ingredients.insert(ingredient);

  try {
    if (!ingredient.ingredient) {
      res.status(402).json({ message: `You must enter an ingredient` });
    } else {
      res.status(201).json(newIngredient);
    }
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(400).json({ message: `request error` });
    } else {
      console.log(err);
      res.status(500).json({ message: `Server Error` });
    }
  }
});

module.exports = router;
