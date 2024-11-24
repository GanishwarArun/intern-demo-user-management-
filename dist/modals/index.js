"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// MongoDB URI
const mongoURI = process.env.MONGODB_URI;
// Ensure MongoDB URI exists
if (!mongoURI) {
    throw new Error("MongoDB connection URI is not defined in environment variables.");
}
// Connect to MongoDB
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log("MongoDB connected...");
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
});
exports.default = mongoose_1.default;
