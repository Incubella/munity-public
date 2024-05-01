// src/models/file.js
const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  points: [
    {
      point: String,
    },
  ],
  achieved: { type: Boolean, default: false },
});

module.exports = RoadmapSchema;
