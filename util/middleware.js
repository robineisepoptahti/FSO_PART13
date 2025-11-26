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
      .send({ error: "Validation failed, parameters missing" });
  } else if (error.name === "BlogNotFoundError") {
    return response.status(404).send({ error: error.message });
  } else if (error.name === "UsergNotFoundError") {
    return response.status(404).send({ error: error.message });
  } else {
    return response.status(400).send({ error: "Unknown error" });
  }
};

module.exports = {
  errorHandler,
};
