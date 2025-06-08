const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createEvent,
  getApprovedEvents,
  getAllEvents,
  approveEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Multer config for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Public: get all approved events
router.get("/approved", getApprovedEvents);

// User: create event (with picture)
router.post("/", protect, upload.single("picture"), createEvent);

// User or admin: update event (with picture)
router.put("/:id", protect, upload.single("picture"), updateEvent);

// Admin: get all events
router.get("/", protect, adminOnly, getAllEvents);

// Admin: approve event
router.patch("/:id/approve", protect, adminOnly, approveEvent);

// Admin: delete event
router.delete("/:id", protect, adminOnly, deleteEvent);

module.exports = router;
