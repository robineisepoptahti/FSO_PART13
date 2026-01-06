const router = require("express").Router();
const { User, Blog, Readlist } = require("../models/index");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["id"] },
    },
  });
  console.log(JSON.stringify(users));
  res.json(users);
});

router.get("/:id", async (req, res) => {
  let read = {
    [Op.in]: [true, false],
  };
  if (req.query.read) {
    read = req.query.read === "true";
  }
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["id", "createdAt", "updatedAt", "userId"] },
        through: {
          where: {
            read,
          },
          attributes: ["read", "id"], // Get the read status and readlist entry id
        },
      },
    ],
  });
  console.log(JSON.stringify(user));
  res.json(user);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    console.log(JSON.stringify(user));
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    if (user) {
      console.log(user);
      user.name = req.body.name;
      await user.save();
      res.status(200).json(user);
    } else {
      const error = new Error("User not found");
      error.name = "UserNotFoundError";
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
