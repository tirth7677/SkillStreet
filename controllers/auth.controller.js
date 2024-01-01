const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }
    const hashedPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const data = await newUser.save();
    const { password: pass, ...rest } = data._doc;
    res.status(201).json({
      success: true,
      message: "New User create succesfully",
      data: {
        rest,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(err.statuscode || 500).json({
      success: false,
      statuscode: err.statuscode || 500,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUser = await User.findOne({ email });
    if (!loggedInUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or phone number or password",
      });
    }
    const passwordValid = await bcryptjs.compareSync(
      password,
      loggedInUser.password
    );
    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or phone number or password",
      });
    }
    const token = jwt.sign({ Id: loggedInUser._id }, process.env.SECRETKEY, {
      expiresIn: "1h",
    });
    const { password: pass, ...rest } = loggedInUser._doc;
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: token,
        user: { ...rest},
      },
    });
  } catch (err) {
    console.error(err);
    res.status(err.statuscode || 500).json({
      success: false,
      statuscode: err.statuscode || 500,
      message: err.message,
    });
  }
};

module.exports = { signUp, login };