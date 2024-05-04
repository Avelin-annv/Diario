const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getAllCanvas,
  getCanvasById,
  deleteCanvas,
} = require("../controllers/canvasController");
const router = express.Router();
router.route("/").post(getAllCanvas);
router.route("/:id").get(protect, getCanvasById).delete(protect, deleteCanvas);
module.exports = router;
