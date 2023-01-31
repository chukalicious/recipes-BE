const express = require("express");
const Steps = require("./steps-model");
const router = express.Router();

router.get("/", (req, res) => {
  Steps.findAll()
    .then((steps) => {
      res.status(201).json(steps);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Server Error` });
    });
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  Steps.findByID(id)
    .then((step) => {
      if (step) {
        res.status(201).json(step);
      } else {
        res.status(401).json({ message: `There's no step by that ID` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Server Error` });
    });
});

router.post("/", async (req, res) => {
  let step = req.body;
  const newStep = await Steps.insert(step);

  try {
    if (!step.step) {
      res.status(401).json({ message: `Step was not entered` });
    } else {
      res.status(201).json(newStep);
    }
  } catch (err) {
    res.status(500).json({ message: `Server Error` });
  }
});

router.put("/:id", async (req, res) => {
  let change = req.body;
  const { id } = req.params;

  const newStep = await Steps.update(id, change);

  try {
    if (!change.step) {
      res.status(401).json({ message: `Step is needed` });
    } else {
      res.status(201).json(newStep);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server Error` });
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  Steps.remove(id)
    .then((deleted) => {
      Steps.findByRecipeID(deleted.recipe_id)
        .then((step) => {
          res.status(200).json(deleted);
        })
        .catch((err) => {
          console.log(err);
          res.status(401).json({ message: `Could not find step` });
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
