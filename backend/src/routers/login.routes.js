const express = require("express");
const Blog = require("../model/blog.model");
const router = express.Router();

// Create a new blog

// get all routes
router.get("/", (req, res) => {
  res.send("Blog router is here");
});

module.exports = router;