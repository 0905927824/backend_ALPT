const express = require('express');
const { getAllQuestions, getQuestionById, createQuestion } = require('../controllers/questionController');
const router = express.Router();

// Lấy tất cả các câu hỏi
router.get('/', getAllQuestions);
router.post('/', createQuestion);
// Lấy câu hỏi theo ID
router.get('/:questionId', getQuestionById);

module.exports = router;
