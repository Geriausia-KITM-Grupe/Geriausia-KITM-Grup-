const EventCategory = require("../models/EventCategory");
const asyncHandler = require("express-async-handler");
/**
 * Get all event categories
 */
const getAllCategories = asyncHandler(async (_, res) => {
  const categories = await EventCategory.find();
  res.json(categories);
});

/**
 * Get a single event category by ID
 */
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await EventCategory.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
});

/**
 * Create a new event category (admin only)
 */
const createCategory = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const category = new EventCategory({
    name: req.body.name,
    description: req.body.description,
  });
  const newCategory = await category.save();
  res.status(201).json(newCategory);
});

/**
 * Update an event category (admin only)
 */
const updateCategory = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const category = await EventCategory.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });

  if (req.body.name !== undefined) category.name = req.body.name;
  if (req.body.description !== undefined)
    category.description = req.body.description;

  const updatedCategory = await category.save();
  res.json(updatedCategory);
});

/**
 * Delete an event category (admin only)
 */
const deleteCategory = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const category = await EventCategory.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });

  await category.deleteOne();
  res.json({ message: "Category deleted" });
});

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
