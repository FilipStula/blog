const express = require("express");
const router = express.Router();
const User = require("../model/users.model");
const jwt = require('jsonwebtoken')

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({
      username: username,
      password: password,
      email: email,
    });
    await newUser.save();
    res.status(201).send({ message: "New user created" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});
// login, first checking if email exists
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    if (!(await user.comparePassword(password))) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.status(201).send({ message: "User found", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = router;
