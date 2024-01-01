const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findOne({ _id: decoded.Id });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid token. User not found or does not have the required role.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};
module.exports = verifyToken;