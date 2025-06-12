const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  },
  { timestamps: true }
);

likeSchema.index({ user: 1, event: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
