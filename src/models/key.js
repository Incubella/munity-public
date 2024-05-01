const mongoose = require("mongoose");

const KeySchema = new mongoose.Schema({
  image: String,
  name: { type: String },
  chain: String,
  description: String,
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
  uri: { type: String },
  community_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    // required: true,
  },
});

module.exports = KeySchema;
