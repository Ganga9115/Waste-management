const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./User");  // This returns a function
const User = UserModel(sequelize, DataTypes); // Now you're initializing the model properly

sequelize.sync({ alter: true }) // or { force: true } if needed
  .then(() => console.log("Database & tables synced"))
  .catch((err) => console.error(err));

module.exports = { User, sequelize };  // Export both properly
