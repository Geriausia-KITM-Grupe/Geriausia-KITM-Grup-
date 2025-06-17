const asyncHandler = require("express-async-handler");
const Like = require("../models/Like");
const Event = require("../models/Event");

/**
 * Check if the current user has liked a specific event.
 * Responds with true or false.
 */
const getLikeStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const eventId = req.params.id;

  const liked = !!(await Like.findOne({ user: userId, event: eventId }));
  res.json(liked);
});
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

/**
 * Remove like for an event by the current user.
 * Responds with a success message or error if not found.
 */
const removeLike = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const eventId = req.params.id;

  const like = await Like.findOne({ user: userId, event: eventId });
  if (!like) {
    res.status(404);
    throw new Error("Like not found");
  }

  // Ensure only the owner can remove their like
  if (like.user.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Not authorized to remove this like");
  }

  await like.deleteOne();
  res.json({ message: "Like removed successfully" });
});

/**
 * Get all event IDs liked by the current user.
 * Responds with an array of event IDs.
 */
const getUserLiked = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // Find likes and populate event data
  const likes = await Like.find({ user: userId }).populate({
    path: "event",
    select: "-__v", // exclude __v, include all other event fields
  });
  // Extract populated event objects
  const likedEvents = likes
    .filter((like) => like.event) // filter out deleted events
    .map((like) => like.event);
  res.json(likedEvents);
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

module.exports = {
  toggleLike,
  getEventLikes,
  getLikeStatus,
  getUserLiked,
  removeLike,
};
