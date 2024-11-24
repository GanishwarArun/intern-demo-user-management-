import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// MongoDB URI
const mongoURI: string = process.env.MONGODB_URI as string;

// Ensure MongoDB URI exists
if (!mongoURI) {
  throw new Error("MongoDB connection URI is not defined in environment variables.");
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
  });

export default mongoose;
