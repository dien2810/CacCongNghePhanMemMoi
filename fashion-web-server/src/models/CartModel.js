import mongoose from "mongoose";
import { Schema } from "mongoose";
const cartSchema = new Schema(
  {
    itemId: {
      type: String,
      unique: true,
      require: true,
      // validate: {
      //   validator: function (value) {
      //     return Number.isInteger(value) || value == undefined;
      //   },
      //   message: (props) => `${props.value} is not a valid Person ID!`,
      // },
    },
    orderId: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      min: 1,
    },
    status: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: 0,
    },
    image: {
      type: String,
      require: true,
    },
    discount: {
      type: Number,
      min: 0,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("CartModel", cartSchema, "cart");
