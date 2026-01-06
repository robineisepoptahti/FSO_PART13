const router = require("express").Router();
const { User, Session } = require("../models/index");
const { SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });
  const passwordCorrect = body.password === "salainen";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }
  if (user.disabled) {
    return response.status(401).json({
      error: "Account disabled.",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);
  if (token) {
    const session = await Session.create({ token: token, userId: user.id });
  }
  response.status(200).send({
    token,
    username: user.username,
    name: user.name,
    user_id: user.id,
  });
});

module.exports = router;
