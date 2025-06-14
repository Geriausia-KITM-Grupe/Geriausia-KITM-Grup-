const mongoose = require("mongoose");

const eventCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    set: (v) => v.toLowerCase(), // always store as lowercase
  },
  description: { type: String },
});

const EventCategory = mongoose.model("EventCategory", eventCategorySchema);
module.exports = EventCategory;
