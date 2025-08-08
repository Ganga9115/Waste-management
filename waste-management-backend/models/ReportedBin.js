// models/ReportedBin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const ReportedBin = sequelize.define('ReportedBin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    // ✅ MODIFIED: Removed the `defaultValue` line
    imagesData: {
        type: DataTypes.TEXT('long'), 
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Medium',
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed', 'Rejected'),
        allowNull: false,
        defaultValue: 'Pending',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
}, {
    tableName: 'ReportedBins',
    timestamps: true,
});

module.exports = ReportedBin;