const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

// basically this is my middleware which check the jwt token to access all the routes
const verifyToken = async (req, res, next) => {
  // this is the header called Authorization
  const authHeader = req.header("Authorization");
  // if user has not provide any tokens then we can send this to the user
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  // here we have apply split(" ")[1] mean suppose i have "bearer token" so i only need token not bearer 
  const token = authHeader.split(" ")[1];

  try {
    // here we have to decode our token using token and our secret key
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    // here we have to find that decode token id from our database
    const user = await User.findOne({ _id: decoded.Id });
    // if user is not found then send this response
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid token. User not found or does not have the required role.",
      });
    }
    // we have store all the user detail in our req.user
    req.user = user;
    // go to next operation or say go to next function
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