import express, { Request, Response } from "express";
import userController from "../controllers/userLogin";

const routes = express.Router();

// Route to create a new user
routes.post("/create", (req: Request, res: Response) =>
  userController.createUser(req, res)
);

// Route to get all users
routes.get("/all", (req: Request, res: Response) =>
  userController.getAllUsers(req, res)
);

// Route for user login
routes.post("/login", (req: Request, res: Response) =>
  userController.login(req, res)
);

// Route for forgot password request
routes.post("/forgot-password", (req: Request, res: Response) =>
  userController.forgotPassword(req, res)
);

// Route to reset password with a token
routes.post("/reset-password/:token", (req: Request, res: Response) =>
  userController.resetPassword(req, res)
);

export default routes;
