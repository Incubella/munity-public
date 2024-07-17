// src/models/channel.js
const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  chat_id: {
    type: String,
  },
});

// module.exports = FileSchema; // Note that we are not compiling this schema with mongoose.model
module.exports = ChannelSchema;
