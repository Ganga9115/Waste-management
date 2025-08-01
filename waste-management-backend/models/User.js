module.exports = (sequelize, DataTypes) => {
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
    // New fields for Dashboard
    ecoPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0 // Initialize new users with 0 eco points
    },
    currentLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Beginner' // Initialize new users with 'Beginner' level
    },
    binsAdopted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0 // Initialize new users with 0 bins adopted
    }
  });

  User.associate = (models) => {
    // A User can have many ReportedBins
    User.hasMany(models.ReportedBin, {
      foreignKey: 'userId',
      as: 'reportedBins' // Alias for when we include it
    });
    // If you also have an AdoptedBin model, you'd define association here:
    // User.hasMany(models.AdoptedBin, {
    //   foreignKey: 'userId',
    //   as: 'adoptedBins'
    // });
  };

  return User;
};