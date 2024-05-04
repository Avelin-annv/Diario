const mongoose = require("mongoose");

const canvasSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    canvasJson: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Canvas = mongoose.model("Canvas", canvasSchema);
module.exports = Canvas;
