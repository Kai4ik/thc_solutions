const mongoose = require("mongoose");
//const mongoURI = "mongodb+srv://Kai4ik:mongoisreallycool@thc-solutions.za8nk.mongodb.net/THC-Solutions?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
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
