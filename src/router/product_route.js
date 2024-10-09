import express from "express";
import {
  deleteProductByParamId,
  deleteProductByQueryId,
  getAllProduct,
  getProduct,
  getProductByParamID,
  getProductByQueryID,
  insertProduct,
  updateProduct,
} from "../controllers/productController.js";
const ProductRouter = express.Router();
//Product
ProductRouter.get("/:id", getProductByParamID);
ProductRouter.get("/", getProduct);
ProductRouter.post("/", insertProduct);
ProductRouter.put("/", updateProduct);
ProductRouter.delete("/:id", deleteProductByParamId);
ProductRouter.delete("/", deleteProductByQueryId);

export default ProductRouter;
