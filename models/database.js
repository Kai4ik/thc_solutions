const mongoose = require("mongoose");
const dotenv = require("dotenv").config({
  path: "../configuration/config.env",
});

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connection to MongoDB Database was successfully established");
  } catch (err) {
    console.log(`${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
