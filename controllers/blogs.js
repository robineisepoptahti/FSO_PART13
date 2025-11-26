const router = require("express").Router();
const { Blog } = require("../models/blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs));
  res.json(blogs);
});

router.post("/", async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    console.log(JSON.stringify(blog));
    return res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    console.log(blog);
    await blog.destroy();
    res.status(204).json(blog);
  } else {
    res.status(404).end();
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      console.log(blog);
      blog.likes = req.body.likes;
      await blog.save();
      res.status(200).json(blog);
    } else {
      const error = new Error("Blog not found");
      error.name = "BlogNotFoundError";
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
