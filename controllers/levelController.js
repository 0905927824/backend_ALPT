const Level = require("../models/Level");

exports.createLevel = async (req, res) => {
  try {
    const { levelNumber, topic, images, questions } = req.body;

    const newLevel = new Level({
      levelNumber,
      topic,
      images,
      questions, // Mảng ID của các câu hỏi
    });

    await newLevel.save();
    res.status(201).json(newLevel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Lấy tất cả các level
exports.getAllLevels = async (req, res) => {
  try {
    const levels = await Level.find().select("levelNumber topic images");
    res.json(levels);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Lấy level theo ID
exports.getLevelById = async (req, res) => {
  try {
    const level = await Level.findById(req.params.levelId).populate(
      "questions"
    );
    if (!level) {
      return res.status(404).json({ msg: "Level not found" });
    }
    res.json(level);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
