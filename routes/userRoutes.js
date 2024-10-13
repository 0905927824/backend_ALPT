const express = require("express");
const {
  getUserProgress,
  completeLevel,
  registerUser,
  login,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
// Lấy tiến trình người chơi
router.get("/:userId/progress", getUserProgress);

// Cập nhật tiến trình sau khi hoàn thành level
router.post("/:userId/complete-level", completeLevel);

module.exports = router;
