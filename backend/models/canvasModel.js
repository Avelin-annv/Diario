const mongoose = require("mongoose");

const canvasSchema =
  ({
    title: {
      type: String,
      required: true,
    },
    canvasJson: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  });
const Canvas = mongoose.model(canvasSchema, "Canvas");
module.exports = Canvas;
