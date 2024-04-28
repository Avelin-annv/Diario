const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getAllNotes,
  createNote,
  getNoteById,
  deleteNoteById,
  updateNote,
} = require("../controllers/notesController");
const router = express.Router();
router.route("/").get(protect, getAllNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(protect, getNoteById)
  .delete(protect, deleteNoteById)
  .put(protect, updateNote);

module.exports = router;
