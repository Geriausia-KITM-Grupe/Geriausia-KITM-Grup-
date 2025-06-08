const mongoose = require("mongoose");

const eventCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const EventCategory = mongoose.model("EventCategory", eventCategorySchema);
module.exports = EventCategory;
