const express = require("express");
const { sendMessage } = require("../controllers/sendMessage");

const router = express.Router();
router.route("/").post(sendMessage);
module.exports = router;
