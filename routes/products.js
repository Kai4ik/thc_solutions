const express = require("express");
const { getAllProducts } = require("../controllers/products-controller");
const { getProduct } = require("../controllers/products-controller");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct);

module.exports = router;
