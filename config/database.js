const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load biến môi trường từ file .env
dotenv.config();

// Kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Dừng tiến trình nếu lỗi
  }
};

module.exports = connectDB;
