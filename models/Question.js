const mongoose = require("mongoose");

// Schema cho từng câu hỏi
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  orderQuestion: {
    type: Number,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    default: "", // Giải thích, có thể không bắt buộc
  },
  level: {
    type: Number, // Liên kết bằng levelNumber thay vì ObjectId
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
