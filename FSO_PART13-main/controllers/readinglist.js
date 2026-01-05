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

module.exports = router;
