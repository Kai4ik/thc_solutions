const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Mordecai:thcsolutionsdb@thcsolutions.d6l0b.mongodb.net/THC-Solutions?retryWrites=true&w=majority";

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
