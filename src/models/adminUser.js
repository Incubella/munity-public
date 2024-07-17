const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["main-admin", "admin"], default: "admin" },
});

module.exports =
  mongoose.models?.AdminUser || mongoose.model("AdminUser", adminUserSchema);
