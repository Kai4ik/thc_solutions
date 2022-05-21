const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    cartProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        qty: Number,
        price: Number,
        option: String,
      },
    ],
    wishlistProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    transactions: [
      {
        date: Date,
        amount: Number,
        products: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
            qty: Number,
            option: String,
            price: Number,
          },
        ],
      },
    ],
  },
  { versionKey: "" }
);

module.exports = mongoose.model("User", userSchema);
