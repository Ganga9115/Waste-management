// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define("User", {
fullName: {
type: DataTypes.STRING,
allowNull: false
 },
 email: {
type: DataTypes.STRING,
allowNull: false,
unique: true
 },
mobile: {
 type: DataTypes.STRING,
 allowNull: false
},
address: {
type: DataTypes.STRING,
allowNull: false
},
 pincode: {
type: DataTypes.STRING,
allowNull: false
},
password: {
type: DataTypes.STRING,
allowNull: false
},
ecoPoints: {
type: DataTypes.INTEGER,
allowNull: false,
defaultValue: 0
},
currentLevel: {
type: DataTypes.STRING,
allowNull: false,
defaultValue: 'Beginner'
},
binsAdopted: {
 type: DataTypes.INTEGER,
 allowNull: false,
defaultValue: 0
 },
 role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user" // or "guest"
    }
}
);

User.associate = (models) => {
User.hasMany(models.ReportedBin, {
 foreignKey: 'userId',
as: 'reportedBins'
});
   
};

module.exports = User;