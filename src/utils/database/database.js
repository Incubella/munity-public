const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to Mongo!");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error("Cannot connect to the database!", err);
    process.exit(1);
  }
};

module.exports = connectDB;
