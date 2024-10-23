import mongoose from "mongoose";
import { Schema } from "mongoose";
const productSchema = new Schema(
  {
    id: {
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
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: 0,
    },
    quantity: {
      type: Number,
      require: true,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },
    stockQuantity: {
      //so luong ton
      type: Number,
      min: 0,
    },
    image: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("ProductModel", productSchema, "product");
