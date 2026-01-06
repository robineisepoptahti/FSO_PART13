const { SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const { Session, User } = require("../models/index");

const errorHandler = (error, request, response, next) => {
  console.log("in Error handler");
  console.log(error.name);
  if (error.name === "SequelizeDatabaseError" || error.name === "SyntaxError") {
    return response
      .status(400)
      .send({ error: "malformatted request parameters" });
  }
  if (error.name === "SequelizeValidationError") {
    return response
      .status(400)
      .send(error.errors.map((e) => e.message).join(", "));
  } else if (error.name === "BlogNotFoundError") {
    return response.status(404).send({ error: error.message });
  } else if (error.name === "UsergNotFoundError") {
    return response.status(404).send({ error: error.message });
  } else {
    return response.status(400).send({ error: "Unknown error" });
  }
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      const parsed = authorization.substring(7);
      req.decodedToken = jwt.verify(parsed, SECRET);
      const session = await Session.findOne({
        where: { token: parsed },
        include: {
          model: User,
        },
      });
      if (!session) {
        return res
          .status(401)
          .json({ error: "No active session found for the token" });
      }
      console.log(JSON.stringify(session));
      if (session.dataValues.user.disabled) {
        await session.destroy();
        return res
          .status(401)
          .json({ error: "User disabled. Logging user out" });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
