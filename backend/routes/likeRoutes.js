const express = require("express");
const router = express.Router();
const {
  toggleLike,
  getEventLikes,
  getLikeStatus,
  getUserLiked,
  removeLike,
} = require("../controllers/likeController");
const { protect } = require("../middleware/authMiddleware");

// Like/unlike an event
router.post("/:id/like", protect, toggleLike);

/// Show what is the status of like
router.get("/:id/liked", protect, getLikeStatus);

/// Remove Like - need For my Favorties list
router.delete("/:id/removelike", protect, removeLike);

/// Show users liked events
router.get("/:id/favorites", protect, getUserLiked);

// Get like count and if current user liked
router.get("/:id/likes", protect, getEventLikes);

module.exports = router;
