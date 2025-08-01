const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./User");
const User = UserModel(sequelize, DataTypes); // Initialize User model

const ReportedBin = require("./ReportedBin"); // Import already initialized model
const AdoptedBin = require("./AdoptedBin"); // Import already initialized model

// ⭐ REMOVE THE DUPLICATE ReportedBin ASSOCIATION FROM HERE ⭐
// User.hasMany(ReportedBin, {
//     foreignKey: 'userId',
//     as: 'reportedBins',
//     onDelete: 'SET NULL',
// });

// A ReportedBin belongs to one User (existing)
ReportedBin.belongsTo(User, {
    foreignKey: 'userId',
    as: 'reporter', // This alias is used when including the User from a ReportedBin
});

// NEW ASSOCIATION: A User can have many AdoptedBins
User.hasMany(AdoptedBin, {
    foreignKey: 'userId',
    as: 'adoptedBins', // Alias for the association
    onDelete: 'CASCADE',
});

// NEW ASSOCIATION: An AdoptedBin belongs to one User
AdoptedBin.belongsTo(User, {
    foreignKey: 'userId',
    as: 'adopter', // Alias for the association (e.g., bin.getAdopter())
});


// IMPORTANT: Call the 'associate' method on all models if they have one.
// This loop will now correctly call User.associate, which has the User-ReportedBin definition.
Object.values(sequelize.models).forEach(model => {
    if (model.associate) {
        model.associate(sequelize.models);
    }
});


module.exports = { User, ReportedBin, AdoptedBin, sequelize };