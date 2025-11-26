const router = require("express").Router();
const { User } = require("../models/index");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  console.log(JSON.stringify(users));
  res.json(users);
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
    const user = await User.findByPk(req.params.username);
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
