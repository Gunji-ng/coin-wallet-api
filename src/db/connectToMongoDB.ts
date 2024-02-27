import mongoose from "mongoose";

export default function connectDB(url: string) {
  return mongoose.connect(url)
};