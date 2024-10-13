const mongoose = require("mongoose");

// Schema cho từng level
const levelSchema = new mongoose.Schema({
  levelNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  topic: {
    type: String,
    required: true,
  },
  images: [
    {
      image: {
        type: String, // URL hoặc đường dẫn đến hình ảnh
        required: true,
      },
      nameImage: {
        type: String, // Tên của hình ảnh
        required: true,
      },
    },
  ],
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

module.exports = mongoose.model("Level", levelSchema);
