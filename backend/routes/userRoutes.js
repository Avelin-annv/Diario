const express = require("express");
const {
  registerUser,
  authenticateUser,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
router.route("/").post(registerUser);
router.route("/login").post(authenticateUser);
router.route("/:id").put(protect, updateUser);
module.exports = router;
