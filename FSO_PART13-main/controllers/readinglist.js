const router = require("express").Router();
const { Blog, User, Readlist } = require("../models/index");
const { sequelize } = require("../util/db");
const { tokenExtractor } = require("../util/middleware");

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const readlist = await Readlist.create(req.body);
    console.log(JSON.stringify(readlist));
    return res.status(201).json(readlist);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Readlist.findByPk(req.params.id);
    if (blog && blog.userId === req.decodedToken.id) {
      blog.read = req.body.read;
      await blog.save();
      res.json(blog);
    } else {
      console.log("No blog found with id belnging to the user");
      res.json(blog);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
