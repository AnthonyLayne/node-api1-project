// BUILD YOUR SERVER HERE

const express = require("express");
const { del } = require("express/lib/application");
const User = require("./users/model");
const server = express();
server.use(express.json());

server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  } else {
    User.insert(user)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Please provide name and bio for the user",
        });
      });
  }
});

server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    });
});

server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The users information could not be retrieved",
      });
    });
});

server.delete("/api/users/:id", async (req, res) => {
  const xUser = await User.findById(req.params.id);
  if (!xUser) {
    res.status(404).json({
      message: "The user with the specified ID does not exist",
    });
  } else {
    const delUser = await User.remove(xUser.id);
    res.status(200).json(delUser);
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
