const blogRouter = require("./controllers/blogs");
const { printBlogs } = require("./util/printBlogs");
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const express = require("express");
const app = express();
app.use(express.json());

app.use("/api/blogs", blogRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    printBlogs();
  });
};

start();
