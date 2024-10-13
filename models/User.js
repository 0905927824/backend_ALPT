const mongoose = require("mongoose");

// Schema cho người dùng
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  completedLevels: [
    {
      level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level",
      },
      completedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
