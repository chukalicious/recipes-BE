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

module.exports = router;
