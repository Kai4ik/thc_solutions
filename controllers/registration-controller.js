const User = require("../models/users");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      await bcrypt
        .genSalt(15)
        .then((salt) => bcrypt.hash(req.body.password, salt))
        .then((hashedPassword) => (req.body.password = hashedPassword));
      const user = await User.create(req.body);
      return res.status(201).json({
        user: user,
        success: true,
      });
    }

    return res.status(200).json({
      error: "User with such email exists",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};
