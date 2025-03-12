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

const mongoConnectionString = process.env.MONGODB_URL;

const blogRouter = require("./src/routers/blog.routes");
const loginRouter = require("./src/routers/login.routes")
app.use("/api/blogs", blogRouter);
app.use("/api/login", loginRouter)

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
