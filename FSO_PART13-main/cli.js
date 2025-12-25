const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { printBlogs } = require("./util/printBlogs");
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const middleware = require("./util/middleware");
const express = require("express");
const app = express();
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    printBlogs();
  });
};

start();
