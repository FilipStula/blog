const express = require("express");
const Blog = require("../model/blog.model");
const router = express.Router();

// Create a new blog
router.post("/create", async (req, res) => {
  try {
    res.send(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Somethign went wrong" });
  }
});

// get all routes
router.get("/", (req, res) => {
  res.send("Blog router is here");
});

module.exports = router;
