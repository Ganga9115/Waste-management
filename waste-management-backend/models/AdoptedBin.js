// waste-management-backend/models/AdoptedBin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AdoptedBin = sequelize.define('AdoptedBin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    adoptionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'AdoptedBins', 
    timestamps: true 
});

module.exports = AdoptedBin;