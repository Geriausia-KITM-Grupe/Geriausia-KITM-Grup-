const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Admin dashboard stub
const getAdminDashboard = asyncHandler(async (req, res) => {
  res.json({ message: "Admin logic not implemented yet." });
});

// Admin: delete user
const adminDeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.json({ message: "User deleted by admin" });
});

module.exports = { getAdminDashboard, adminDeleteUser };
