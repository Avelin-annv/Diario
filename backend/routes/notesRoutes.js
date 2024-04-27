const express = require("express");
const {
  getAllNotes,
  createNote,
  getNoteById,
  deleteNoteById,
  updateNote,
} = require("../controllers/notesController");
const router = express.Router();
router.route("/").get(getAllNotes);
router.route("/create").post(createNote);
router.route("/:id").get(getNoteById).delete(deleteNoteById).put(updateNote);

module.exports = router;
