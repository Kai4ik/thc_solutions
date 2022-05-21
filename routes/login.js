const express = require("express");
const {
  checkUser,
  getUser,
  updateUser,
} = require("../controllers/login-controller");
const { route } = require("./products");

const router = express.Router();

router.route("/").post(checkUser);
router.route("/").get(getUser);
router.route("/").put(updateUser);

module.exports = router;
