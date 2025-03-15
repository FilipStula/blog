const express = require("express");
const Blog = require("../model/blog.model");
const Comment = require("../model/comment.model");
const { default: mongoose } = require("mongoose");
const verifyToken = require("../middleware/verifytoken");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

// Create a new blog
router.post("/create",verifyToken, isAdmin, async (req, res) => {
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

// get all blogs
router.get("/",verifyToken,isAdmin, async (req, res) => {
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
    return;
  }
});

//get single blog based on id
// also get all the comments for the given post
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Blog.findById(postId);
    if (!post) {
      res.status(404).send({ message: "Post not found" });
      return;
    }
    const comments = await Comment.find({ postId: postId });
    res
      .status(201)
      .send({ message: "Returned post", post: post, comments: comments });
    console.log(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something is wrong in search by id" });
  }
});
//delete a post based on id, also delete comments, since if there is no blog there are also no comments
router.delete("/delete/:id",verifyToken, isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    if (!(await Blog.findById(id))) {
      res.status(404).send({ message: "Blog not found" }); // if blog not found, just return
      return;
    }
    await Comment.deleteMany({ postId: id }); // for deleting comments
    await Blog.findByIdAndDelete(id); // for deleting blog
    res.status(201).send({ message: "Blog successfully deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong when edeleting a blogpost" });
  }
});

//gets posts withe hte same first word of the title as the id which is provided as params to the function
router.get("/related/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).send({ message: "Post not found" });
      return;
    }
    const split = new RegExp(blog.title.split(" ")[0], "i");
    console.log(split);

    const relatedQuery = {
      _id: { $ne: blog._id }, // wont get the posts which is provided in the URL
      title: { $regex: split },
    };
    const related = await Blog.find(relatedQuery);
    res.status(201).send({ message: "Related posts", posts: related });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Something is wrong in related posts" });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!(await Blog.findOneById(id))) {
      return res.status(404).send({ message: "Blog not found" });
    }
    await Blog.updateOne({ _id: id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error in updating post" });
  }
});

module.exports = router;
