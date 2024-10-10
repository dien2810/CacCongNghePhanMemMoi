import express from "express";
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js"; // Đường dẫn đến controller

const router = express.Router();

// Endpoint cho Location
router.get("/", getAllLocations); // Lấy tất cả vị trí
router.get("/:id", getLocationById); // Lấy vị trí theo ID
router.post("/", createLocation); // Tạo vị trí mới
router.put("/:id", updateLocation); // Cập nhật thông tin vị trí
router.delete("/:id", deleteLocation); // Xóa vị trí theo ID

export default router;
