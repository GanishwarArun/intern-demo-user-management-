import express, { Request, Response } from "express";
import dotenv from "dotenv"; 
import Routes from "./routes/index"
// import Routes from "./src/routes/index"; 
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000; 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(Routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`); // Base URL
});
