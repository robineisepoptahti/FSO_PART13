const { sequelize } = require("../util/db");
const { Model, DataTypes } = require("sequelize");

class Author extend Model { }
Author.init{ 
    totalLikes: { 
        type: DataTypes.INTEGER
    }
}