"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userLogin_1 = __importDefault(require("../routes/userLogin"));
const routes = express_1.default.Router();
// Define the root route with a message
routes.get("/", (req, res) => {
    res.status(200).send({
        message: "Hi, Welcome to password Reset Demo",
    });
});
// Use the /user route for user-related actions
routes.use("/user", userLogin_1.default);
exports.default = routes;
