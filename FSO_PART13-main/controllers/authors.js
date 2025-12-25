const router = require("express").Router();
const { Blog, User } = require("../models/index");
const { sequelize } = require("../util/db");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("title")), "count"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
  });
  res.json(authors);
});

module.exports = router;
