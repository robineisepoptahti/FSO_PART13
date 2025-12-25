const { sequelize } = require("../util/db");
const { QueryTypes } = require("sequelize");

const printBlogs = async () => {
  const blogs = await sequelize.query("SELECT * FROM blogs", {
    type: QueryTypes.SELECT,
  });
  blogs.map((blog) => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
  });
};

module.exports = {
  printBlogs,
};
