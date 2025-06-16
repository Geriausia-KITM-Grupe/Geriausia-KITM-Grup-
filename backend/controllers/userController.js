const User = require("../models/User");
const { generateToken } = require("../functions/generateToken");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { validateEmail } = require("../functions/emailRegix");

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Please enter a valid email address");
  }

  // Check for existing username or email
  const userNameExists = await User.findOne({ userName });
  if (userNameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
    role: "user",
    status: true,
    lastLogin: null,
  });

  const token = generateToken(user.id);
  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      status: user.status,
      lastLogin: user.lastLogin,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("User registration failed, Invalid user data");
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcryptjs.compare(password, user.password))) {
    if (!user.status) {
      res.status(403);
      throw new Error("Account is inactive. Contact admin.");
    }
    user.lastLogin = new Date();
    await user.save();
    res.json({
      message: "Login successfully",
      _id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      status: user.status,
      lastLogin: user.lastLogin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

// logout user (clear cookie if present)
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

// GET users list (all users)
const getAllUsers = asyncHandler(async (req, res) => {
  const usersList = await User.find().select("-password");
  res.status(200).json(usersList);
});

// Update user info
const updateUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (req.user.id !== user.id && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to update this user");
  }
  if (userName) user.userName = userName;
  if (email) user.email = email;
  if (password) {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
  }
  // Only admin can change role
  if (req.body.role && req.user.role === "admin") {
    user.role = req.body.role;
  }
  // Allow admin to update status (ban/disable user)
  if (typeof req.body.status === "boolean" && req.user.role === "admin") {
    user.status = req.body.status;
  }
  await user.save();
  res.json({
    _id: user.id,
    userName: user.userName,
    email: user.email,
    role: user.role,
    status: user.status,
  });
});

// Delete user (admin only)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.json({ message: "User deleted" });
});

// Password reset (stub)
const resetPassword = asyncHandler(async (req, res) => {
  // Here you would send a reset email or token
  res.json({ message: "Password reset functionality not implemented yet." });
});

// Email verification (stub)
const verifyEmail = asyncHandler(async (req, res) => {
  // Here you would verify the user's email
  res.json({
    message: "Email verification functionality not implemented yet.",
  });
});

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  logoutUser,
  updateUser,
  deleteUser,
  resetPassword,
  verifyEmail,
};
