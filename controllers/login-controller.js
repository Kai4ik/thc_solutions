const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.checkUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).json({
        error: "User Not Found",
        success: false,
      });
    }

    await bcrypt
      .compare(req.body.password, user.password)
      .then((existingUser) => {
        if (existingUser) {
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "3h",
            algorithm: "HS256",
          });
          return res.status(200).json({
            user: user,
            success: true,
            token: token,
          });
        } else {
          return res.status(200).json({
            error: "Password is wrong",
            success: false,
          });
        }
      });
  } catch (err) {
    sendError(res);
  }
};

exports.getUser = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });
    try {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        req.user = decoded;
      });
    } catch (error) {
      return res.status(400).json({
        error: "Token is not valid",
      });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(200).json({
        error: "User Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      user: user,
      success: true,
    });
  } catch (err) {
    sendError(res);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });
    try {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        req.user = decoded;
      });
    } catch (error) {
      return res.status(400).json({
        error: "Token is not valid",
      });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        cartProducts: req.body.cartProducts,
        wishlistProducts: req.body.wishlistProducts,
        transactions: req.body.transactions,
      },
      { new: true }
    );

    if (!user) {
      return res.status(200).json({
        error: "User Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      user: user,
      success: true,
    });
  } catch (err) {
    sendError(res);
  }
};

const sendError = (res) => {
  return res.status(500).json({
    error: "Internal Error",
  });
};
