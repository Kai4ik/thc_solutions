const mongoose = require("mongoose");
const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Kai4ik:mongoisreallycool@thc-solutions.za8nk.mongodb.net/THC-Solutions?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connection to MongoDB Database was successfully established");
  } catch (err) {
    console.log(`${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
