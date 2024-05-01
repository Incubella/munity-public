const mongoose = require("mongoose");

// const socialSchema = new mongoose.Schema({
//   name: String,
//   url: { type: String, required: true },
//   icon: String,
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });
const SocialSchema = new mongoose.Schema(
  {
    youtube: { type: String, default: "" },
    instagram: { type: String, default: "" },
    discord: { type: String, default: "" },
    // Add any other social platforms as needed
  },
  { _id: false }
); // _id is not necessary for subdocuments in this case

// If socials are a separate model
module.exports = SocialSchema;
