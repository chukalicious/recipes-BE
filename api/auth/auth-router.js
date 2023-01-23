const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");
const Users = require("../users/users-model");
const router = express.Router();

// Register
router.post("/", async (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  try {
    const registered = await Users.add(user);
    console.log("registered: ", registered);
    if (!registered.email || !registered.password) {
      res.status(400).json({ message: "Request must include required fields" });
    } else {
      res.status(201).json(registered);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not create user",
      detail: err.detail,
      table: `In ${err.table} table`,
    });
  }
});

// Login

module.exports = router;
