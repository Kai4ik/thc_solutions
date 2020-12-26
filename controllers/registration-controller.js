const User = require("../models/users");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res, next) => {
  try {
    await bcrypt
      .genSalt(15)
      .then((salt) => bcrypt.hash(req.body.password, salt))
      .then((hashedPassword) => (req.body.password = hashedPassword));
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};
