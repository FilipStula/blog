const express = require("express");
const Blog = require("../model/blog.model");
const blogRouter = express.Router();

blogRouter.post("/create", async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {}
});

// get all routes
blogRouter.get("/", (req, res) => {
  res.send("Blog router is here");
});

module.exports = blogRouter;
