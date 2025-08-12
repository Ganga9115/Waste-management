const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vehicle = sequelize.define('Vehicle', {
    licensePlate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    make: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    capacity: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Available', 'Assigned', 'In Maintenance'),
        allowNull: false,
        defaultValue: 'Available'
    },
    lastKnownLocationLat: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    lastKnownLocationLng: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true
    }
}, {
    tableName: 'Vehicles',
    timestamps: true
});

module.exports = Vehicle;