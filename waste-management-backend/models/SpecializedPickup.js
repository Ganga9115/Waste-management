// models/SpecializedPickup.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SpecializedPickup = sequelize.define('SpecializedPickup', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    wasteType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pickupDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    pickupTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    additionalNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Scheduled', 'Completed', 'Cancelled'),
        defaultValue: 'Pending',
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming a pickup request must be from a logged-in user
        references: {
            model: 'Users',
            key: 'id',
        },
    },
}, {
    tableName: 'SpecializedPickups',
    timestamps: true,
});

module.exports = SpecializedPickup;