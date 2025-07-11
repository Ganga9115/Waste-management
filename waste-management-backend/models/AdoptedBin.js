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
            model: 'Users', // This should match the table name for your User model
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    // We'll use a string for location. In a real app, you might use
    // separate lat/lng or a geospatial data type if complex mapping is needed.
    // For simplicity, a descriptive string like "Anna Nagar West, Bin Code BIN2684"
    // or "Latitude: 13.0827, Longitude: 80.2707" will work for this page.
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // A bin location can only be adopted once
    },
    adoptionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    // You could add a 'status' like 'active', 'inactive' for the adoption
    // status if a user decides to unadopt a bin later.
}, {
    tableName: 'AdoptedBins', // Explicitly define table name
    timestamps: true // Adds createdAt and updatedAt
});

module.exports = AdoptedBin;