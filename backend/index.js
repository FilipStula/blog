const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
// console.log(process.env.MONGODB_URL); This is how you get stuff from the .env file
// NOTE: .env file is not visible here, because i put it in .gitignore

app.use(express.json({ limit: "4kb" }));

const mongoConnectionString = process.env.MONGODB_URL;

const blogRouter = require("./src/routers/blog.routes");
const commentRouter = require("./src/routers/comment.routes");
const userRouter = require("./src/routers/auth.user.route");
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);
app.use("/auth/user", userRouter);

async function main() {
  await mongoose.connect(mongoConnectionString);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}

main()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
