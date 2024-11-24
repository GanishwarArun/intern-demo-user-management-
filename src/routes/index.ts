import express, { Request, Response } from "express";
import userRoutes from "../routes/userLogin";

const routes = express.Router();

// Define the root route with a message
routes.get("/", (req: Request, res: Response): void => {
  res.status(200).send({
    message: "Hi, Welcome to password Reset Demo",
  });
});

// Use the /user route for user-related actions
routes.use("/user", userRoutes);

export default routes;
