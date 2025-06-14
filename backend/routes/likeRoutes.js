const express = require("express");
const router = express.Router();
const {
  toggleLike,
  getEventLikes,
  getLikeStatus,
} = require("../controllers/likeController");
const { protect } = require("../middleware/authMiddleware");

// Like/unlike an event
router.post("/:id/like", protect, toggleLike);

/// Show what is the status of like
router.get("/:id/liked", protect, getLikeStatus);

// Get like count and if current user liked
router.get("/:id/likes", protect, getEventLikes);

module.exports = router;
