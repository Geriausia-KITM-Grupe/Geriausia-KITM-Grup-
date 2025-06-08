const express = require("express");
const router = express.Router();
const eventCategoryController = require("../controllers/eventCategoryController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/", eventCategoryController.getAllCategories);
router.get("/:id", eventCategoryController.getCategoryById);

// Admin routes (protected)
// Ensure protect and adminOnly middleware are defined and controller methods exist
router.post("/", protect, adminOnly, eventCategoryController.createCategory);
router.put("/:id", protect, adminOnly, eventCategoryController.updateCategory);
router.delete(
  "/:id",
  protect,
  adminOnly,
  eventCategoryController.deleteCategory
);

module.exports = router;
