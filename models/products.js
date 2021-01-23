const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  subcategory: String,
  new: Boolean,
  sale: Boolean,
  price: Number,
  description: String,
  image: [String],
});

module.exports = mongoose.model("Product", productSchema);
