import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      //required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    number: {
      type: String,
      //required: true,
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    location: {
      country: { type: String, default: "Vietnam" },
      province: { type: String, default: "Tien Giang" },
      district: { type: String, default: "Cai Lậy District" },
      ward: { type: String, default: "Thạnh Lộc" },
      address: { type: String, default: "G259+X75" },
      location: {
        lat: { type: Number, default: 10.509862 },
        lng: { type: Number, default: 106.0182 },
      },
    },
    items: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        itemId: { type: mongoose.Schema.Types.ObjectId },
        productName: { type: String },
        quantity: { type: Number, min: 0 },
        color: { type: String },
        discount: { type: Number, min: 0 },
        image: { type: String },
        price: { type: Number, min: 0 },
        size: { type: String },
        status: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
