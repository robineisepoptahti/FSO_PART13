const router = require("express").Router();
const { Session } = require("../models/session");
const { tokenExtractor } = require("../util/middleware");

const jwt = require("jsonwebtoken");

router.delete("/", tokenExtractor, async (request, response, next) => {
  console.log(request.decodedToken.id);
  const session = await Session.findOne({
    where: {
      user_id: request.decodedToken.id,
    },
  });
  if (session) {
    await session.destroy();
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

module.exports = router;
