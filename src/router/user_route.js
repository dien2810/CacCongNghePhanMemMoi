import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js"; 

const router = express.Router();

// Endpoint cho User
router.get("/", getAllUsers); // Lấy tất cả người dùng
router.get("/:id", getUserById); // Lấy người dùng theo ID
router.post("/", createUser); // Tạo người dùng mới
router.put("/:id", updateUser); // Cập nhật thông tin người dùng
router.delete("/:id", deleteUser); // Xóa người dùng theo ID

export default router;
