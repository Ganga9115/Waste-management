// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User");
const ReportedBin = require("./ReportedBin");
const AdoptedBin = require("./AdoptedBin");
const SpecializedPickup = require("./SpecializedPickup"); 

ReportedBin.belongsTo(User, {
    foreignKey: 'userId',
    as: 'reporter',
});

User.hasMany(AdoptedBin, {
    foreignKey: 'userId',
    as: 'adoptedBins',
    onDelete: 'CASCADE',
});

AdoptedBin.belongsTo(User, {
    foreignKey: 'userId',
    as: 'adopter',
});

User.hasMany(SpecializedPickup, {
    foreignKey: 'userId',
    as: 'specializedPickups',
});

SpecializedPickup.belongsTo(User, {
    foreignKey: 'userId',
    as: 'requester',
});

Object.values(sequelize.models).forEach(model => {
    if (model.associate) {
        model.associate(sequelize.models);
    }
});

module.exports = { User, ReportedBin, AdoptedBin, SpecializedPickup, sequelize };