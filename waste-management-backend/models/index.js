const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./User");
const User = UserModel(sequelize, DataTypes);

const ReportedBin = require("./ReportedBin"); // <--- ADD THIS LINE

// Define Associations
// A User can have many ReportedBins
User.hasMany(ReportedBin, {
    foreignKey: 'userId',
    as: 'reportedBins', // Alias for the association
    onDelete: 'SET NULL', // When a user is deleted, their reports' userId becomes NULL
});

// A ReportedBin belongs to one User
ReportedBin.belongsTo(User, {
    foreignKey: 'userId',
    as: 'reporter', // Alias for the association
});

// REMOVE THIS BLOCK - sequelize.sync should be in App.js only
/*
sequelize.sync({ alter: true }) // or { force: true } if needed
  .then(() => console.log("Database & tables synced"))
  .catch((err) => console.error(err));
*/

module.exports = { User, ReportedBin, sequelize }; // <--- Export ReportedBin as well