const mongoose = require("mongoose");

// TODO: Create User collection, so when the comment is created userId will be needed

const commentSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId, // passing the id of the Blog that the comment will be on
    ref: "Blog", // this specifies from where the ID will be fetched, in this case, the Blog collection
    required: true,
  },
  /*
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  */
  userId: String,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
