const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});
const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (title || content || category) {
    const note = await new Note({
      user: req.user._id,
      title,
      category,
      content,
    });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } else {
    res.status(400);
    throw new Error("Note cannot be empty");
  }
});
const deleteNoteById = asyncHandler(async (req, res) => {});
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You don't have permission for this action");
  }
  if (note) {
    note = { title, category, content };
    const updatedNote = await note.save();
    res.json(updateNote);
  } else {
    res.status(404);
    throw new Error("The resource you've requested is not found.");
  }
});
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) res.json(note);
  else {
    res.status(404).json({ message: "Note not found !" });
  }
});

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNoteById,
  getNoteById,
};
