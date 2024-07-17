// src/models/file.js
const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  file_name: {
    type: String,
  },
  file_size: Number,
  file_type: String,
  file: { type: String, required: true }, // URL to the file stored in AWS S3
  // upload_date: {
  //   type: Date,
  //   default: Date.now,
  // },
  file_folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  // community_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Community",
  // },
});

// module.exports = FileSchema; // Note that we are not compiling this schema with mongoose.model
module.exports = FileSchema;
