import express from "express";
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
  getLocationByQueryId,
  deleteLocationByQueryId,
} from "../controllers/locationController.js"; // Đường dẫn đến controller

const router = express.Router();

// Endpoint cho Location
router.get("/", async (req, res) => {
    try {
      if (req.query.id) {
        // Nếu có query id, gọi hàm getLocationByQueryId
        const location = await getLocationByQueryId(req, res);
        return;
      }
      // Nếu không có query id, gọi hàm getAllLocations
      const locations = await getAllLocations(req, res);
      res.json(locations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
router.get("/:id", getLocationById); // Lấy vị trí theo ID
router.post("/", createLocation); // Tạo vị trí mới
router.put("/:id", updateLocation); // Cập nhật thông tin vị trí
router.delete("/:id", deleteLocation); // Xóa vị trí theo ID
router.delete("/", deleteLocationByQueryId);  // Xóa vị trí theo query id

export default router;
