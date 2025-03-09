const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
// console.log(process.env.MONGODB_URL);

const blogRoutes = require("./src/routers/blog.routes");
app.use('/api/blogs', blogRoutes)

const mongoConnectionString = process.env.MONGODB_URL;

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
