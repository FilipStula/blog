const express = require("express");
const router = express.Router();
const Comment = require("../model/comment.model");
const Blog = require("../model/blog.model");
const User = require("../model/users.model");

// every variable named POST, is referencing Blog schema I created

router.post("/create", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).send({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
    res
      .status(501)
      .send({ message: "Something is wrong inside creating comments" });
  }
});

router.get("blog/:postId", async (req, res) => {
  try {
    const postid = req.params.postId;
    if (!Blog.findById(postid)) {
      res.status(404).send({ message: "No blog with that ID" });
      return;
    }
    const parameter = {
      postId: postid,
    };
    const allComments = await Comment.find(parameter);
    res.status(201).send({
      message: "Found comments",
      comment: allComments,
    });
  } catch (error) {
    console.log(error);
    res
      .status(501)
      .send({ message: "Something is wrong inside getting comments" });
  }
});

//TODO: When User schema is created, this will be needed to list every ocmment a user has sent
router.get("/user/:userId", async (req, res) => {
  try {
    const userComments = await Comment.find({ userId: userId });
    res.status(201).send({
      message: "Found comments from the specified user",
      comments: userComments,
    });
  } catch (error) {
    console.log(error);
    res
      .status(501)
      .send({ message: "Something is wrong inside getting comments" });
  }
});

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(201).send({ message: "All comments", comments: comments });
  } catch (error) {
    console.log(error);
    res
      .status(501)
      .send({ message: "Something is wrong inside getting comments" });
  }
});

module.exports = router;
