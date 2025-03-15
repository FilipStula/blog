const express = require("express");
const validator = require("validator");
const router = express.Router();
const User = require("../model/users.model");
const Comment = require("../model/comment.model");
const generateToken = require("../middleware/generateJsonToken");

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

// login, first checking if email exists, then check if the password is there
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    if (!(await user.comparePassword(password))) {
      // this is a user defined function i created inside mongoDB model for the user
      res.status(404).send({ message: "User not found" });
      return;
    }
    // if the user exists, generate JWT
    const token = await generateToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(201).send({ message: "User found", user: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

// logout
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(201).send({ message: "Logging out successfull", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong when loging out" });
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).send({ message: "Found users", users: users });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Something went wrong when getting all users" });
  }
});

// Deleting a user, based of the provided id in the url
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!validator.isAlphanumeric(userId)) {
      res.status(500).send({ message: "Blocked by WAF" });
      return;
    }
    await Comment.deleteMany({ userId: userId }); //MongoDB to delete multiple comments
    await Blog.deleteMany({ author: userId });
    if (!(await User.findById(userId))) {
      res.status(404).send({ message: "User doesnt exist" });
      return;
    }
    // await User.findByIdAndDelete(userId);
    res.status(201).send({ message: "User successfully deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Something went wrong when deleting a user" });
  }
});

module.exports = router;
