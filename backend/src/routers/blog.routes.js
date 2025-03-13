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
    res.status(500).json({ error: "Something went wrong in creating blogs" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search, author } = req.query; // implemented search option, will search for title, description, content, author
    let query = {};

    if (search) {
      query = {
        ...query,
        $or: {
          title: { $regex: `^${search}$`, $options: "i" },
          description: { $regex: search, $options: "i" },
          content: { $regex: search, $options: "i" },
        },
      };
    }

    if (author) {
      query = {
        ...query,
        author: { $regex: `^${author}$`, $options: "i" },
      };
    }
    console.log(query);
    const allPosts = await Blog.find(query).sort({ createdAt: -1 }); // to sort from newest to oldest created
    res.status(201).send(
      JSON.stringify(
        {
          message: "All posts:",
          posts: allPosts,
        },
        null,
        2
      )
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong in all blogs" });
  }
});

//get single post based on id
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Blog.findById(postId);
    if (!post) {
      res.status(404).send({ message: "Post not found" });
    }
    res.status(201).send({ message: "Returned post", post: post });
    console.log(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something is wrong in search by id" });
  }
});

router.get("/related/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).send({ message: "Post not found" });
    }
    const split = new RegExp(blog.title.split(" ")[0], "i");
    console.log(split);

    const relatedQuery = {
      _id: { $ne: blog._id },
      title: { $regex: split },
    };
    const related = await Blog.find(relatedQuery);
    res.status(201).send({ message: "Related posts", posts: related });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Something is wrong in related posts" });
  }
});

// get all routes
router.get("/", (req, res) => {
  res.send("Blog router is here");
});

module.exports = router;
