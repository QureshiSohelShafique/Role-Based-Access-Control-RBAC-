const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, age, dob, work, password, mobile, role } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === "admin" ? "admin" : "user";

    const user = new User({ name, email, age, dob, work, password: hashedPassword, mobile, role: userRole });
    await user.save();

    res.status(201).json({ message: "User Registered Successfully", role: userRole });
  } catch (error) {
    res.status(500).json({ message: "Registration Failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User Not Found" });
    if (user.isBlocked) return res.status(403).json({ message: "User is blocked" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login Failed", error: error.message });
  }
};
