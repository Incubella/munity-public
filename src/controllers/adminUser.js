const AdminUser = require("@/models/adminUser");
const bcrypt = require("bcryptjs");

const getAllAdminUsers = async (req, res) => {
  try {
    const adminUsers = await AdminUser.find();
    res.status(200).json(adminUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin users" });
  }
};

const addAdminUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdminUser = new AdminUser({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newAdminUser.save();
    res.status(201).json(newAdminUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to add admin user" });
  }
};

const deleteAdminUser = async (req, res) => {
  try {
    const { id } = req.query;
    await AdminUser.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete admin user" });
  }
};

module.exports = { getAllAdminUsers, addAdminUser, deleteAdminUser };
