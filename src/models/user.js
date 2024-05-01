import mongoose, { model, models, Schema } from "mongoose";
const SocialSchema = require("./social");
const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: { type: String },
  chat_account_id: { type: String },
  email: { type: String },
  user_avatar: String,
  user_banner: String,
  is_verified: { type: Boolean, default: false },
  address: { type: String, required: true, unique: true },
  join_date: { type: Date, default: Date.now },
  about: String,
  socials: SocialSchema,
});

module.exports = models?.User || model("User", UserSchema);
