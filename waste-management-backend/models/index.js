// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Import all models here directly
const User = require("./User");
const ReportedBin = require("./ReportedBin");
const AdoptedBin = require("./AdoptedBin");
const SpecializedPickup = require("./SpecializedPickup"); // ✅ NEW: Import the new model

// A ReportedBin belongs to one User
ReportedBin.belongsTo(User, {
    foreignKey: 'userId',
    as: 'reporter',
});

// A User can have many AdoptedBins
User.hasMany(AdoptedBin, {
    foreignKey: 'userId',
    as: 'adoptedBins',
    onDelete: 'CASCADE',
});

// An AdoptedBin belongs to one User
AdoptedBin.belongsTo(User, {
    foreignKey: 'userId',
    as: 'adopter',
});

// ✅ NEW: Add associations for SpecializedPickup
User.hasMany(SpecializedPickup, {
    foreignKey: 'userId',
    as: 'specializedPickups',
});

SpecializedPickup.belongsTo(User, {
    foreignKey: 'userId',
    as: 'requester',
});


// Call the 'associate' method on all models if they have one.
Object.values(sequelize.models).forEach(model => {
    if (model.associate) {
        model.associate(sequelize.models);
    }
});

// ✅ NEW: Add SpecializedPickup to the exports
module.exports = { User, ReportedBin, AdoptedBin, SpecializedPickup, sequelize };