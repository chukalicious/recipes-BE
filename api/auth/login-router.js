const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");
const Users = require("../users/users-model");
const router = express.Router();
const secret = process.env.SECRET;
const iat = Math.floor(Date.now() / 1000);

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
    if (bcrypt.compareSync(password.toString(), user.password)) {
      req.session.user = user;
      console.log("session: user: ", user);
      const token = generateToken(user);
      res
        .status(201)
        .json({ message: `You are now logged in, ${email}`, token });
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
const generateToken = (user) => {
  const payload = {
    subject: user.id,
    name: user.name,
    iat: iat,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.encode(
    secret,
    payload,
    function (err, token) {
      if (err) {
        console.error(err.name, err.message);
      } else {
        return token;
      }
    },
    options
  );
};

module.exports = router;
