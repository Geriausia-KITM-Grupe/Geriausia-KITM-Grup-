const asyncHandler = require("express-async-handler");
const Event = require("../models/Event");
const EventCategory = require("../models/EventCategory");
// Create event (user)
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, category, location, time } = req.body;
  let picture = null;
  if (req.file) {
    picture = `/uploads/${req.file.filename}`;
  }
  if (!title || !location || !time || !category || category.length === 0) {
    res.status(400);
    throw new Error(
      "Title, location, time, and at least one category are required"
    );
  }

  // category can be string or array (from formData)
  const categoryArray = Array.isArray(category) ? category : [category];

  // Validate all categories
  const validCategories = await EventCategory.find({
    _id: { $in: categoryArray },
  });
  if (validCategories.length !== categoryArray.length) {
    res.status(400);
    throw new Error("One or more categories are invalid");
  }

  const event = await Event.create({
    title,
    description,
    picture,
    category: categoryArray,
    location,
    time,
    createdBy: req.user._id,
    approved: false,
  });
  res.status(201).json(event);
});

// Get all approved events (public)
const getApprovedEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ approved: true })
    .populate("category", "name")
    .limit(5);
  res.json(events);
});

const getApprovedEventsPaginated = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Filtering
  const filter = { approved: true };
  if (req.query.category) {
    const categoryDoc = await EventCategory.findOne({
      name: req.query.category.toLowerCase(),
    });
    if (categoryDoc) {
      filter.category = categoryDoc._id;
    } else {
      return res.json({ events: [], totalPages: 0, totalEvents: 0 });
    }
  }

  // Sorting
  let sort = {};
  if (req.query.sort) {
    if (req.query.sort === "date-asc") sort.time = 1;
    else if (req.query.sort === "date-desc") sort.time = -1;
    else if (req.query.sort === "title-asc") sort.title = 1;
    else if (req.query.sort === "title-desc") sort.title = -1;
  }

  const [events, total] = await Promise.all([
    Event.find(filter).sort(sort).skip(skip).limit(limit),
    Event.countDocuments(filter),
  ]);

  res.json({
    events,
    totalPages: Math.ceil(total / limit),
    totalEvents: total,
  });
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
  if (
    event.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
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
  if (
    event.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
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
  getApprovedEventsPaginated,
};
