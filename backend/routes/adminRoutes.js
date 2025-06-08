const express = require("express");
const router = express.Router();
const { getAdminDashboard, adminDeleteUser } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getAdminDashboard);
router.delete("/user/:id", protect, adminOnly, adminDeleteUser);

module.exports = router;
