import express from "express";
import morgan from "morgan";
import { connectMongoDB } from "./mongoose.js";
import ProductRouter from "./src/router/product_route.js";
//Config
const app = express();
connectMongoDB();
app.use(morgan("combined"));
app.use(express.json()); // Dùng để parse dữ liệu JSON từ request body
app.use(express.urlencoded({ extended: true })); // Dùng để parse dữ liệu URL-encoded từ request body
//Router
const productRouter = ProductRouter;
//Address
app.use("/products", productRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
