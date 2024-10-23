import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByQueryId,
  deleteUserByQueryId,
} from "../controllers/userController.js"; 

const router = express.Router();

// Endpoint cho User
router.get("/", async (req, res) => {
    try {
      if (req.query.id) {
        // Nếu có query id, gọi hàm getUserByQueryId
        const user = await getUserByQueryId(req, res);
        return;
      }
      // Nếu không có query id, gọi hàm getAllUsers
      const users = await getAllUsers(req, res);
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
router.get("/:id", getUserById); // Lấy người dùng theo ID
router.post("/", createUser); // Tạo người dùng mới
router.put("/:id", updateUser); // Cập nhật thông tin người dùng
router.delete("/", deleteUserByQueryId); // Xóa người dùng theo query id
router.delete("/:id", deleteUser); // Xóa người dùng theo ID

export default router;
