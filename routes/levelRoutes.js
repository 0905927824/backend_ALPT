const express = require('express');
const { getAllLevels, getLevelById,createLevel } = require('../controllers/levelController');
const router = express.Router();


// Lấy tất cả các level
router.get('/', getAllLevels);

router.post('/', createLevel);
// Lấy level theo ID
router.get('/:levelId', getLevelById);

module.exports = router;
