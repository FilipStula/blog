const mongoose = require("mongoose");
// TODO Need to create user
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content: String,
  coverImg: String,
  category: String,
  author: {
    type: String,
  },
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog;
