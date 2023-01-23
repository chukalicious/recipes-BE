const express = require("express");
const Users = require("./users-model");
const router = express.Router();

router.get("/", (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the users",
      });
    });
});

router.post("/", async (req, res) => {
  let user = req.body;

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

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `The user has been deleted` });
      } else {
        res.status(404).json({ message: `The user could not be found` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Server error` });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Users.update(id, changes)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: `The user could not be found` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Server Error` });
    });
});

module.exports = router;
