const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");
const Users = require("../users/users-model");
const router = express.Router();

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Register
router.post("/", async (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
  console.log("hash: ", hash);

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
router.post("/", async (req, res) => {
  const user = req.body;
  const { email, password } = req.body;
  console.log("email and password in the login: ", email, password);

  //   const hash = bcrypt.hashSync(password, salt);

  //   user.password = hash;
  //   console.log("hash: ", hash);
  try {
    const user = await Users.findBy({ email }).first();
    console.log("user: ", user);
    if (user == null) {
      res.status(401).json({ message: `Invalid credentials` });
      return;
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.json({ message: `You are now logged in, ${email}!` });
    } else {
      res.status(401).json({ message: `Invalid credentials` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server Error` });
  }
});

// The below fn is for use with JWT
// const generateToken = (user) => {
//   const payload = {
//     subject: user.id,
//     email: user.email,
//   };
//   const options = {
//     expiresIn: "1d",
//   };
// };
module.exports = router;
