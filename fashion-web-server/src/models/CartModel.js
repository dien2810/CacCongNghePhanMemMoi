import mongoose from "mongoose";
import { Schema } from "mongoose";
const cartSchema = new Schema(
  {
    itemId: {
      type: String,
      require: true,
      // validate: {
      //   validator: function (value) {
      //     return Number.isInteger(value) || value == undefined;
      //   },
      //   message: (props) => `${props.value} is not a valid Person ID!`,
      // },
    },
    productName: {
      type: String,
    },
    username: {
      type: String,
      require: true,
    },
    itemRev: {
      type: String,
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },
    price: {
      type: Number,
    },
    size: {
      type: String,
      default: "XL",
    },
    color: {
      type: String,
      default: "Đen",
    },
    status: {
      type: String,
      require: true,
      default: "in_cart",
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    productName: {
      type: String,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("CartModel", cartSchema, "cart");
