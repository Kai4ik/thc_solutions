const express = require("express");
const { addUser } = require("../controllers/registration-controller");

const router = express.Router();

router.route("/").post(addUser);

module.exports = router;
