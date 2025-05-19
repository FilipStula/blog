const express = require("express");
const validator = require("validator");
const router = express.Router();
const User = require("../model/users.model");
const Comment = require("../model/comment.model");
const generateToken = require("../middleware/generateJsonToken");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifytoken");
const jwtSecret = process.env.JSONSECRET;

const usernameReg = new RegExp("username")

router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const newUser = new User({
      email: email,
      password: password,
      username: username,
    });
    await newUser.save();
    res.status(201).send({ message: "New user created" });
  } catch (error) {
    console.log(error.message);
    if(usernameReg.test(error.message))
      res.status(500).send({ message:  "Username already in use"});
    else
      res.status(500).send({ message:  "Email already in use"});
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
    const token = await generateToken(user._id, user.role, user.username);
    res.cookie("token", token, {
      httpOnly: true, // if set to false, cookie is accessible via console in the browser
      secure: true,
      sameSite: "Strict", // when set to Strict, eliminates CSRF attacks
      path:"/"
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
    if (req.headers.cookie) {
      console.log("LOGOUT");
      res.clearCookie("token", {
        httpOnly: true, // if set to false, cookie is accessible via console in the browser
        secure: true,
        sameSite: "Strict",
        path:"/"
      });
      res.status(200).send({ message: "Logging out successfull" });
    } else {
      res.status(404).send({ message: "User must be logged on" });
    }
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

router.get("/check", verifyToken, (req, res) => {
  try {
    console.log(req.headers.cookie);
    const token = req.headers.cookie.split("=")[1];
    if (token) {
      console.log(token);
      const decoded = jwt.verify(token, jwtSecret);
      res.json({ username: decoded.username });
    } else {
      console.log("No token");
    }
  } catch (error) {
    res.status(404).send({ message: "No token available" });
  }
});

module.exports = router;
