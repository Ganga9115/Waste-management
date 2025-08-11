const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.signup = async (req, res) => {
  const { fullName, email, mobile, address, pincode, password, role } = req.body; // ✅ Added role

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      mobile,
      address,
      pincode,
      password: hashedPassword,
      role: role || "user", // ✅ Default to 'user' if not provided
      ecoPoints: 0,
      currentLevel: 'Beginner',
      binsAdopted: 0
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { identifier, password, role } = req.body; // ✅ Added role

  console.log("🟡 Login attempt with:", identifier, "Role:", role);

  try {
    const user = await User.findOne({
      where: {
        role, // ✅ Match role as well
        [Op.or]: [
          { email: identifier },
          { mobile: identifier }
        ]
      }
    });

    if (!user) {
      console.log("🔴 User not found or role mismatch");
      return res.status(404).json({ message: "User not found or role mismatch" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("🔴 Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("🟢 Login successful");
    res.status(200).json({ message: "Login successful", token, user });

  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
