const express = require("express");
const { checkUser } = require("../controllers/login-controller");

const router = express.Router();

router.route("/").post(checkUser);

module.exports = router;
