import express from "express";
import {
  deleteCartItemByParamId,
  deleteCartItemByQueryId,
  getCart,
  getCartItemByParamID,
  insertCartItem,
  updateCartItem,
} from "../controllers/cartController.js";

const CartRouter = express.Router();
//Cart
CartRouter.get("/:id", getCartItemByParamID);
CartRouter.get("/", getCart);
CartRouter.post("/", insertCartItem);
CartRouter.put("/", updateCartItem);
CartRouter.delete("/:itemId", deleteCartItemByParamId);
CartRouter.delete("/", deleteCartItemByQueryId);

export default CartRouter;
