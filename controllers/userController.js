const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Nên dùng biến môi trường

exports.registerUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Kiểm tra xem tất cả trường có được gửi không
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  // Kiểm tra mật khẩu có khớp không
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "Tài khoản đã có người sử dụng. Hãy chọn tên khác nha ~~",
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      password: hashedPassword,
      confirmPassword: hashedPassword, // Mặc dù confirmPassword không cần lưu, nhưng giữ để tương thích
    });

    // Lưu người dùng vào DB
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        completedLevels: user.completedLevels,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Lấy tiến trình của người chơi
exports.getUserProgress = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "completedLevels.level"
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user.completedLevels);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Cập nhật tiến trình khi người chơi hoàn thành level
exports.completeLevel = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { levelId } = req.body;

    // Check xem người dùng đã hoàn thành level này chưa
    const completedLevel = user.completedLevels.find(
      (lvl) => lvl.level.toString() === levelId
    );

    if (completedLevel) {
      return res.status(400).json({ msg: "Level already completed" });
    }

    // Thêm level đã hoàn thành
    user.completedLevels.push({ level: levelId });
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
