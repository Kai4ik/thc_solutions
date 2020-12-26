const Product = require("../models/products");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({
      error: "Error",
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product Not Found!",
      });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({
      error: "Error",
    });
  }
};
