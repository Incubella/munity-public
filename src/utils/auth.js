const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/adminUser"); // Ensure you have the correct path to your model

const authenticateUser = async (username, password) => {
  try {
    const user = await AdminUser.findOne({ username });
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { token, role: user.role };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
};

module.exports = { authenticateUser };
