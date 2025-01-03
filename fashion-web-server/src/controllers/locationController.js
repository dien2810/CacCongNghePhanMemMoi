import Location from "../models/LocationModel.js";

// Lấy tất cả vị trí
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy vị trí theo ID
export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLocationByQueryId = async (req, res) => {
  try {
    const { id } = req.query; // Lấy id từ query
    const location = await Location.findById(id); // Tìm vị trí theo id
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo vị trí mới
export const createLocation = async (req, res) => {
  const location = new Location(req.body);
  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật thông tin vị trí
export const updateLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });

    Object.assign(location, req.body);
    const updatedLocation = await location.save();
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa vị trí
export const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });

    await location.remove();
    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa vị trí theo query id
export const deleteLocationByQueryId = async (req, res) => {
  try {
    const { id } = req.query; // Lấy id từ query
    const location = await Location.findByIdAndDelete(id); // Tìm và xóa vị trí theo id
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const updateLocation = async (req, res, next) => {
//   if (
//     !checkFieldObject(req.body, "location") ||
//     !checkFieldObject(req.body, "username")
//   ) {
//     res.status(400).send();
//     return;
//   }

//   const username = req.body.username;
//   const location = req.body.location;
//   res.sendStatus(200);
//   Location.updateUser(username, { location: location })
//     .then(() => res.sendStatus(200))
//     .catch((err) => res.send(err));
// };
