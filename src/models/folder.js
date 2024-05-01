// src/models/folder.js
const mongoose = require("mongoose");
const FileSchema = require("./file"); // Assuming you have a separate File model

const FolderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    community_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
    files: [FileSchema], // Embedding the File schema directly into the Folder schema
  },
  { timestamps: true }
);

module.exports = FolderSchema;
