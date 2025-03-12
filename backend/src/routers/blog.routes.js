const express = require("express");
const Blog = require("../model/blog.model");
const { default: mongoose } = require("mongoose");
const router = express.Router();

// Create a new blog
router.post("/create", async (req, res) => {
  try {
    const newPost = new Blog({ ...req.body });
    await newPost.save();
    res.status(201).send({
      message: "Post created successfully",
      post: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allPosts = await Blog.find();
    res.status(201).send({
      message: "All posts:",
      posts: allPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// get all routes
router.get("/", (req, res) => {
  res.send("Blog router is here");
});

module.exports = router;
