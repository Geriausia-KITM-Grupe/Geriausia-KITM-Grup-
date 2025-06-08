const express = require("express");
const router = express.Router();
const eventCategoryController = require("../controllers/eventCategoryController");
const { protect } = require("../middleware/authMiddleware"); // if you want to protect admin routes

// Public routes
router.get("/", eventCategoryController.getAllCategories);
router.get("/:id", eventCategoryController.getCategoryById);

// Admin routes (protected)
router.post("/", protect, eventCategoryController.createCategory);
router.put("/:id", protect, eventCategoryController.updateCategory);
router.delete("/:id", protect, eventCategoryController.deleteCategory);

module.exports = router;
