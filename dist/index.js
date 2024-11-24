"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
// import Routes from "./src/routes/index"; 
const cors_1 = __importDefault(require("cors"));
// Load environment variables from .env file
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(index_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
    console.log(`Visit http://localhost:${PORT}`); // Base URL
});
