const Question = require("../models/Question");
const Level = require("../models/Level");

exports.createQuestion = async (req, res) => {
  try {
    const {
      questionText,
      options,
      correctAnswer,
      explanation,
      levelNumber, // Nhận levelNumber từ request
      orderQuestion,
    } = req.body;

    // Tìm Level dựa trên levelNumber
    const level = await Level.findOne({ levelNumber });
    console.log("Level found:", level);
    if (!level) {
      return res.status(404).json({ message: "Level not found" });
    }

    // Tạo câu hỏi mới
    const newQuestion = new Question({
      questionText,
      options,
      correctAnswer,
      explanation,
      orderQuestion,
      level: level.levelNumber, // Gán levelNumber thay vì _id
    });

    await newQuestion.save(); // Lưu câu hỏi vào cơ sở dữ liệu

    // Cập nhật level tương ứng để thêm ID của câu hỏi vào mảng questions
    await Level.findByIdAndUpdate(
      level._id,
      { $addToSet: { questions: newQuestion._id } }, // Sử dụng _id cho liên kết bảng level
      { new: true }
    );

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Lấy tất cả các câu hỏi
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Lấy câu hỏi theo ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
