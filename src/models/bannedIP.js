// src/models/bannedIP.js

import mongoose, { model, models, Schema } from "mongoose";

const BannedIPSchema = new Schema({
  ip: { type: String, required: true, unique: true },
});

module.exports = models?.BannedIP || model("BannedIP", BannedIPSchema);
