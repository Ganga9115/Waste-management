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
    // ✅ MODIFIED: Change to TEXT to store the full Base64 string
    imageData: { 
        type: DataTypes.TEXT('long'), // 'long' allows for larger strings
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
        allowNull: false,
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