const asyncHandler = require("express-async-handler");
const Like = require("../models/Like");
const Event = require("../models/Event");

// Toggle like for an event
const toggleLike = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const eventId = req.params.id;

  // Check if event exists
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // Check if like exists
  const existingLike = await Like.findOne({ user: userId, event: eventId });
  if (existingLike) {
    // Remove like (unlike)
    await existingLike.deleteOne();
    return res.json({ liked: false, message: "Like removed" });
  } else {
    // Add like
    await Like.create({ user: userId, event: eventId });
    return res.json({ liked: true, message: "Event liked" });
  }
});

// Get like count and if current user liked
const getEventLikes = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user?._id;
  const likeCount = await Like.countDocuments({ event: eventId });
  let liked = false;
  if (userId) {
    liked = !!(await Like.findOne({ user: userId, event: eventId }));
  }
  res.json({ likeCount, liked });
});

module.exports = { toggleLike, getEventLikes };
