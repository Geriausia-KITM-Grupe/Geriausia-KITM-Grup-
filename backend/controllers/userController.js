const User = require("../models/User");
const { generateToken } = require("../functions/generateToken");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { validateEmail } = require("../functions/emailRegix");

// Register a new user
// @POST /users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  // Validate user input
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  // check if email have @
  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Please enter a valid email address");
  }

  // Check if user already exists
  const userExists = await User.findOne({ userName, email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  // Create a new user
  const user = await User.create({
    userName: userName,
    email: email,
    password: hashedPassword,
    role: "user", // Default role
    status: true, // Default status
  });

  // Generate a token
  const token = generateToken(user.id);
  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      status: user.status,
      token: token, // Send the generated token
    });
  } else {
    res.status(400);
    throw new Error("User registration failed, Invalid user data");
  }
});

module.exports = { registerUser };
