const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Admin Only!" });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user details", error: error.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);

    if (!user) return res.status(404).json({ message: "User Not Found" });
    if (user.role === "admin") return res.status(403).json({ message: "Admins cannot be blocked!" });

    user.isBlocked = true;
    await user.save();
    res.status(200).json({ message: "User Blocked Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Blocking User", error });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = false;
    await user.save();
    res.json({ message: "User Unblocked Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unblock user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};
