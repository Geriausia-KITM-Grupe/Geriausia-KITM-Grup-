const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    picture: { type: String }, // URL or filename
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventCategory",
        required: true,
      },
    ],
    location: { type: String, required: true },
    time: { type: Date, required: true },
    approved: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
