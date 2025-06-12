const asyncHandler = require("express-async-handler");
const Event = require("../models/Event");

// Create event (user)
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, category, location, time } = req.body;
  let picture = null;
  if (req.file) {
    picture = `/uploads/${req.file.filename}`;
  }
  if (!title || !location || !time) {
    res.status(400);
    throw new Error("Title, location, and time are required");
  }
  const event = await Event.create({
    title,
    description,
    picture,
    category,
    location,
    time,
    createdBy: req.user._id,
    approved: false,
  });
  res.status(201).json(event);
});

// Get all approved events (public)
const getApprovedEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ approved: true });
  res.json(events);
});

// Get all events (admin)
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Approve event (admin)
const approveEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  event.approved = true;
  await event.save();
  res.json({ message: "Event approved", event });
});

// Update event (user or admin)
const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, category, location, time } = req.body;
  let picture = null;
  if (req.file) {
    picture = `/uploads/${req.file.filename}`;
  }
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  // Only creator or admin can update
  if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to update this event");
  }
  if (title) event.title = title;
  if (description) event.description = description;
  if (category) event.category = category;
  if (location) event.location = location;
  if (time) event.time = time;
  if (picture) event.picture = picture;
  // If user updates, event must be re-approved
  if (req.user.role !== "admin") event.approved = false;
  await event.save();
  res.json({ message: "Event updated", event });
});

// Delete event (admin or creator)
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  // Only creator or admin can delete
  if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to delete this event");
  }
  await event.deleteOne();
  res.json({ message: "Event deleted" });
});

module.exports = {
  createEvent,
  getApprovedEvents,
  getAllEvents,
  approveEvent,
  updateEvent,
  deleteEvent,
};
