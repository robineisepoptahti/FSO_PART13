const { sequelize } = require("../util/db");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,

      autoIncrement: true,
    },

    name: {
      type: DataTypes.TEXT,

      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "user",
  }
);

module.exports = { User };
