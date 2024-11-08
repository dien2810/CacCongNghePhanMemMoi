import express from "express";
import morgan from "morgan";
import { connectMongoDB } from "./mongoose.js";
import ProductRouter from "./src/router/product_route.js";
import CartRouter from "./src/router/cart_route.js";
import UserRouter from "./src/router/user_route.js";
import LocationRouter from "./src/router/location_route.js";
import cors from "cors";
//Config
const app = express();
connectMongoDB();
app.use(morgan("combined"));
app.use(cors());
app.use(express.json()); // Dùng để parse dữ liệu JSON từ request body
app.use(express.urlencoded({ extended: true })); // Dùng để parse dữ liệu URL-encoded từ request body
//Router
const productRouter = ProductRouter;
const cartRouter = CartRouter;
const userRouter = UserRouter;
const locationRouter = LocationRouter;
//Address
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);
app.use("/locations", locationRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
