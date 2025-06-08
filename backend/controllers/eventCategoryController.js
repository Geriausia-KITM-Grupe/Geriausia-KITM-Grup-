import EventCategory from "../models/EventCategory.js";

/**
 * Get all event categories
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await EventCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get a single event category by ID
 */
const getCategoryById = async (req, res) => {
  try {
    const category = await EventCategory.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Create a new event category (admin only)
 */
const createCategory = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const category = new EventCategory({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Update an event category (admin only)
 */
const updateCategory = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const category = await EventCategory.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (req.body.name !== undefined) category.name = req.body.name;
    if (req.body.description !== undefined)
      category.description = req.body.description;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Delete an event category (admin only)
 */
const deleteCategory = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const category = await EventCategory.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.remove();
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
