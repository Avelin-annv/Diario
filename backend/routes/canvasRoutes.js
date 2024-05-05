const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getAllCanvas,
  getCanvasById,
  deleteCanvas,
  createCanvas,
} = require("../controllers/canvasController");
const router = express.Router();
router.route("/").get(protect, getAllCanvas);
router.route("/create").post(protect, createCanvas);
router.route("/:id").get(protect, getCanvasById).delete(protect, deleteCanvas);
module.exports = router;
