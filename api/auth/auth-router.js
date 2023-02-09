const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");
const Users = require("../users/users-model");
const router = express.Router();

// const saltRounds = 12;
// const salt = bcrypt.genSaltSync(saltRounds);

// Register
// router.post("/", async (req, res) => {
//   let user = req.body;

//   const hash = bcrypt.hashSync(user, salt);
//   console.log("hash: ", hash);

//   user.password = hash;
//   console.log("hash: ", hash);

//   try {
//     const registered = await Users.add(user);
//     console.log("registered: ", registered);
//     if (!registered.email || !registered.password) {
//       res.status(400).json({ message: "Request must include required fields" });
//     } else {
//       res.status(201).json(registered);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Could not create user",
//       detail: err.detail,
//       table: `In ${err.table} table`,
//     });
//   }
// });

// Login /////////
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // This line below was my problem. I needed to add the .first()
    const user = await Users.findBy({ email }).first();

    if (user == null) {
      res.status(401).json({ status: 401, message: "Invalid Credentials" });
      return;
    }
    console.log("password: ", typeof password.toString());
    if (bcrypt.compareSync(password.toString(), user.password)) {
      req.session.user = user;
      res.json({ message: `You are now logged in, ${email}` });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", err });
  }
});

// Logout

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "you are now logged out" });
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
