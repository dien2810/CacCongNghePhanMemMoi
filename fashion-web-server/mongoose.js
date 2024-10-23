import mongoose from "mongoose";
export const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/FashionWeb");
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Error: " + error);
  }
};
