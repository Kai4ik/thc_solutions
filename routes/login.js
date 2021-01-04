const express = require("express");
const { checkUser } = require("../controllers/login-controller");
const { getUser } = require("../controllers/login-controller");
const { route } = require("./products");

const router = express.Router();

router.route("/").post(checkUser);
router.route("/:email").get(getUser);

module.exports = router;
