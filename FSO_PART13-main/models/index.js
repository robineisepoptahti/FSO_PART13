const { Blog } = require("./blog");
const { User } = require("./user");
const { Session } = require("./session");
const { Readlist } = require("./readlist");

User.hasMany(Blog);
Blog.belongsTo(User);
Session.belongsTo(User);

User.belongsToMany(Blog, { through: Readlist, as: "readings" });
Blog.belongsToMany(User, { through: Readlist, as: "usersMarked" });

module.exports = {
  Blog,
  User,
  Readlist,
  Session,
};
