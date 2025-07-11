const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./User");
const User = UserModel(sequelize, DataTypes);

const ReportedBin = require("./ReportedBin");
const AdoptedBin = require("./AdoptedBin"); // <--- ADD THIS LINE: Import the new AdoptedBin model

// Define Associations
// A User can have many ReportedBins (existing)
User.hasMany(ReportedBin, {
    foreignKey: 'userId',
    as: 'reportedBins',
    onDelete: 'SET NULL',
});

// A ReportedBin belongs to one User (existing)
ReportedBin.belongsTo(User, {
    foreignKey: 'userId',
    as: 'reporter',
});

// NEW ASSOCIATION: A User can have many AdoptedBins
User.hasMany(AdoptedBin, {
    foreignKey: 'userId',
    as: 'adoptedBins', // Alias for the association
    onDelete: 'CASCADE', // If a user is deleted, their adopted bins should also be deleted
});

// NEW ASSOCIATION: An AdoptedBin belongs to one User
AdoptedBin.belongsTo(User, {
    foreignKey: 'userId',
    as: 'adopter', // Alias for the association (e.g., bin.getAdopter())
});


// REMOVE THIS BLOCK - sequelize.sync should be in App.js only
/*
sequelize.sync({ alter: true }) // or { force: true } if needed
  .then(() => console.log("Database & tables synced"))
  .catch((err) => console.error(err));
*/

module.exports = { User, ReportedBin, AdoptedBin, sequelize }; // <--- IMPORTANT: Export AdoptedBin as well