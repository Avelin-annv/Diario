const asyncHandler = require("express-async-handler");
const Canvas = require("../models/canvasModel");

const getAllCanvas = asyncHandler(async (req, res) => {
  const docs = await Canvas.find({ user: req.user._id }).sort("-updatedAt");
  res.json(docs);
});
const createCanvas = asyncHandler(async (req, res) => {
  const { title, canvasJson } = req.body;
  if (title || canvasJson) {
    const canvas = await new Canvas({
      user: req.user._id,
      title,
      canvasJson,
    });
    const newCanvas = await canvas.save();
    res.status(201).json(newCanvas);
  } else {
    res.status(400);
    throw new Error("Canvas cannot be empty!");
  }
});
const deleteCanvas = asyncHandler(async (req, res) => {
  const canvas = await Canvas.findById(req.params.id);
  if (canvas.createdBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You don't have permission for this action");
  }
  if (canvas) {
    await canvas.deleteOne();
    res.json({ message: "Deleted successfully" });
  } else {
    res.status(404);
    throw new Error("The resource you've requested is not found.");
  }
});

const getCanvasById = asyncHandler(async (req, res) => {
  const canvas = await Canvas.findById(req.params.id);
  if (canvas) res.json(canvas);
  else {
    res.status(404).json({ message: "Note not found !" });
  }
});

module.exports = {
  getAllCanvas,
  createCanvas,
  deleteCanvas,
  getCanvasById,
};
