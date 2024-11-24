"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userLogin_1 = __importDefault(require("../controllers/userLogin"));
const routes = express_1.default.Router();
// Route to create a new user
routes.post("/create", (req, res) => userLogin_1.default.createUser(req, res));
// Route to get all users
routes.get("/all", (req, res) => userLogin_1.default.getAllUsers(req, res));
// Route for user login
routes.post("/login", (req, res) => userLogin_1.default.login(req, res));
// Route for forgot password request
routes.post("/forgot-password", (req, res) => userLogin_1.default.forgotPassword(req, res));
// Route to reset password with a token
routes.post("/reset-password/:token", (req, res) => userLogin_1.default.resetPassword(req, res));
exports.default = routes;
