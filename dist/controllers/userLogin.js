"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../modals/user"));
const auth_1 = __importDefault(require("../common/auth"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (!user) {
            req.body.password = yield auth_1.default.hashPassword(req.body.password);
            yield user_1.default.create(req.body);
            res.status(201).send({
                message: "User Created Successfully!!",
            });
        }
        else {
            res.status(400).send({
                message: `User with email ${req.body.email} already exists`,
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.status(200).send({
            message: "User Details Fetched Successfully!!",
            data: users,
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (user) {
            if (yield auth_1.default.hashCompare(req.body.password, user.password)) {
                const payload = {
                    name: user.name,
                    email: user.email,
                };
                const token = yield auth_1.default.createToken(payload);
                res.status(200).send({
                    message: "Login Successful",
                    token,
                });
            }
            else {
                res.status(400).send({
                    message: "Incorrect Password",
                });
            }
        }
        else {
            res.status(400).send({
                message: "User does not exist",
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });
    }
});
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (user) {
            const payload = {
                name: user.name,
                email: user.email,
            };
            const token = yield auth_1.default.createToken(payload);
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
            const main = () => __awaiter(void 0, void 0, void 0, function* () {
                const info = yield transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: "Password Reset",
                    text: `You requested for a password reset. Click here: https://passwd-reset7.netlify.app/user/reset-password/${token}`,
                });
                console.log("Message sent: %s", info.messageId);
            });
            yield main();
            res.status(200).send({
                message: "Sent Mail with Reset Link",
                token,
            });
        }
        else {
            res.status(400).send({
                message: "User does not exist",
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });
    }
});
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { password } = req.body;
        let payload;
        if (token) {
            payload = yield auth_1.default.decodeToken(token);
            if (payload.exp <= Math.floor(Date.now() / 1000)) {
                res.status(401).send({
                    message: "Token Expired",
                });
                return;
            }
        }
        const user = yield user_1.default.findOne({ email: payload.email });
        if (!user) {
            res.status(400).send({
                message: "User does not exist",
            });
            return;
        }
        const hashedPassword = yield auth_1.default.hashPassword(password);
        user.password = hashedPassword;
        yield user.save();
        res.status(200).send({
            message: "Password Reset Successful",
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });
    }
});
exports.default = {
    createUser,
    getAllUsers,
    login,
    forgotPassword,
    resetPassword,
};
