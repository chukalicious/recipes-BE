const express = require("express");
const Ingredients = require("./ingredients-model");
const router = express.Router();

router.get("/", (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const change = req.body;
  Ingredients.update(id, change)
    .then((ingre) => {
      res.status(201).json(ingre);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Server error` });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Ingredients.remove(id)
    .then((deleted) => {
      Ingredients.findByRecipeID(deleted.recipe_id)
        .then((ingred) => {
          res.status(200).json(deleted);
        })
        .catch((err) => {
          console.log(err);
          res.status(401).json({ message: `could not find ingredient` });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: `Server Error` });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Server Error` });
    });
});

module.exports = router;
