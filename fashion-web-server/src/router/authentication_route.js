import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByQueryId,
  deleteUserByQueryId,
} from "../controllers/userController.js";
import {
  login,
  logout,
  refreshToken,
  createUser,
} from "../controllers/authenticationController.js";
import { authenToken } from "../../authen.js";

const AuthenticationRouter = express.Router();

// Endpoint cho User
AuthenticationRouter.get("/", async (req, res) => {
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
// /users
AuthenticationRouter.post("/login", login);
AuthenticationRouter.post("/logout", logout);
AuthenticationRouter.post("/signup", createUser);
AuthenticationRouter.post("/refreshToken", refreshToken);
//router.post("/updateLocation", authenToken, userController.updateLocation);

export default AuthenticationRouter;
