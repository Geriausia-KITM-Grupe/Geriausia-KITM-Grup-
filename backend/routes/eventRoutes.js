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
  getEventById,
  getApprovedEventsPaginated,
  getAllEventsUser,
} = require("../controllers/eventController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Multer config for file upload with type/size validation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
function fileFilter(req, file, cb) {
  // Accept images only
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
}
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Public: get all approved events
router.get("/approved", getApprovedEvents);

router.get("/approved/paginated", getApprovedEventsPaginated);
// User: create event (with picture)
router.post("/", protect, upload.single("picture"), createEvent);

// User or admin: update event (with picture)
router.put("/:id", protect, upload.single("picture"), updateEvent);

router.get("/users", protect, getAllEventsUser);

// Admin: get all events (supports pagination: ?page=1&limit=10)
router.get("/", protect, adminOnly, getAllEvents);

// Admin: approve event
router.patch("/:id/approve", protect, adminOnly, approveEvent);

// Admin or creator: delete event
router.delete("/:id", protect, deleteEvent);

/**
 * Public: get a single approved event by ID
 * This must be after all other /:id routes to avoid conflicts!
 */
router.get("/:id", getEventById);

// Admin or creator: delete event
router.delete("/:id", protect, deleteEvent);

module.exports = router;
