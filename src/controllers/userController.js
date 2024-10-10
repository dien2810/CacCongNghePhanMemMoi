import User from "../models/UserModel.js"; 

// Lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("location"); // Giả sử có trường location
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy người dùng theo ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("location");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserByQueryId = async (req, res) => {
    try {
      const { id } = req.query; // Lấy id từ query
      const user = await User.findById(id).populate("location"); // Tìm người dùng theo id
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Tạo người dùng mới
export const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa người dùng theo query id
export const deleteUserByQueryId = async (req, res) => {
    try {
      const { id } = req.query; // Lấy id từ query
      const user = await User.findByIdAndDelete(id); // Tìm và xóa người dùng theo id
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  