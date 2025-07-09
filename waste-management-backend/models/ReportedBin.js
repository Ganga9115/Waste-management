// models/ReportedBin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database connection instance

const ReportedBin = sequelize.define('ReportedBin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    imagePaths: {
        type: DataTypes.JSON, // Stores an array of strings like ['uploads/image1.jpg', 'uploads/image2.jpg']
        allowNull: true,
        defaultValue: [],
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8), // For precise latitude (e.g., 10 digits total, 8 after decimal)
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8), // For precise longitude (e.g., 11 digits total, 8 after decimal)
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
    userId: { // Foreign key for associating with the User
        type: DataTypes.INTEGER,
        allowNull: true, // Set to false if a report MUST be from a logged-in user
        references: {
            model: 'Users', // This should match the table name Sequelize creates for your User model (usually pluralized)
            key: 'id',
        },
    },
}, {
    tableName: 'ReportedBins', // Explicitly set table name if you prefer
    timestamps: true, // Enables createdAt and updatedAt fields
});

module.exports = ReportedBin;