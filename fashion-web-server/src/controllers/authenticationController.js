//[POST] /login
// Check login. If username and password receive from client is correct
// -> Send user information to client
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../constants.js";
import User from "../models/UserModel.js";
import { findUserByUsernameAndPassword } from "./userController.js";
import { checkFieldObject } from "../utils/CheckFieldObject.js";
import jwt from "jsonwebtoken";

const defaultLocation = {
  country: " Vietnam",
  province: " Tien Giang",
  district: " Cai Lậy District",
  ward: " Thạnh Lộc",
  address: "G259+X75",
  location: {
    lat: 10.509862,
    lng: 106.0182,
  },
};

export const login = async (req, res, next) => {
  if (
    !checkFieldObject(req.body, "username") ||
    !checkFieldObject(req.body, "password")
  ) {
    res.status(400).send("");
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  //Authentication
  findUserByUsernameAndPassword(username, password)
    .then((data) => {
      console.log(data);
      if (data == null) {
        res.status(400).send("Tên đăng nhập hoặc mật khẩu không đúng !");
        return;
      }
      const user = data;
      const accessToken = jwt.sign(
        { username: user.username },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { username: user.username },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "604800s" }
      ); // 7 days
      // Update refreshToken of that user
      user.refreshToken = refreshToken;
      //Store reresh token to database and send data to client
      User.updateOne(
        { username: username },
        {
          user,
        }
      ).then(() =>
        res.json({
          accessToken,
          refreshToken,
          user: {
            _id: user._id,
            fullName: user.fullName,
            image: user.image,
            number: user.number,
            username: user.username,
          },
        })
      );
    })
    .catch((err) => res.send(err));
};

//POST /logout
// Delete refresh token in database
export const logout = (req, res, next) => {
  if (!checkFieldObject(req.body, "username")) {
    res.sendStatus(403);
    return;
  }
  const username = req.body.username;
  User.findOneAndUpdate({ username }, { refreshToken: "" })
    .then(() => res.sendStatus(200))
    .catch((err) => res.send(err));
};

//[POST] /refreshToken
export const refreshToken = (req, res, next) => {
  if (!checkFieldObject(req.body, "token")) {
    res.sendStatus(401);
    return;
  }

  const refreshToken = req.body.token;
  const username = jwt.decode(refreshToken).username;

  // Get refresh token array of user
  UserModel.getRefreshTokenByUsername(username).then((refreshTokenArray) => {
    if (!refreshTokenArray.includes(refreshToken)) {
      res.status(403).send(""); //Forbidden
      return;
    }

    //Create a new accessToken and send to user
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(403); // Forbidden
        return;
      }
      const accessToken = jwt.sign(
        { username: username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1200s" }
      );
      res.json({ accessToken });
    });
  });
};

// [POST] /signup
// Signup function
export const createUser = async (req, res, next) => {
  if (
    !checkFieldObject(req.body, "username") ||
    !checkFieldObject(req.body, "password") ||
    !checkFieldObject(req.body, "repassword")
  ) {
    res.status(400).send("");
    return;
  }

  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;

  if (password !== repassword) {
    res.status(400).send("Mật khẩu nhập lại không đúng");
    return;
  }

  // Check if username is existed
  const data = await User.findOne({ username: username });
  const isUsernameExisted = data ? true : false;
  if (isUsernameExisted) {
    res.status(400).send("Tên đăng nhập đã tồn tại!");
    return;
  }
  console.log("Dang ky");
  await User.create({
    username: username,
    password: password,
    fullname: username,
    image:
      "https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg",
    number: "",
    refreshToken: "",
    items: [],
    location: defaultLocation,
  })
    .then(() => res.sendStatus(200))
    .catch((err) => res.send(err));
};

export const updateLocation = async (req, res, next) => {
  if (
    !checkFieldObject(req.body, "location") ||
    !checkFieldObject(req.body, "username")
  ) {
    res.status(400).send();
    return;
  }

  const username = req.body.username;
  const location = req.body.location;
  UserModel.updateUser(username, { location: location })
    .then(() => res.sendStatus(200))
    .catch((err) => res.send(err));
};
