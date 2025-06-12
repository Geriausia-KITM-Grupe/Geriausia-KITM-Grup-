const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  logoutUser,
  updateUser,
  deleteUser,
  resetPassword,
  verifyEmail,
} = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Password reset and email verification (public for now)
router.post("/reset-password", resetPassword);
router.post("/verify-email", verifyEmail);

// Admin-protected route (supports pagination: ?page=1&limit=10)
router.get("/", protect, adminOnly, getAllUsers);

// User update (user or admin)
router.put("/:id", protect, updateUser);

// User delete (admin only)
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;
