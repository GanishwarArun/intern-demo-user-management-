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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Hash a password
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(Number(process.env.SALT));
        console.log(salt);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        return hashedPassword;
    }
    catch (error) {
        throw error;
    }
});
// Compare a password with its hash
const hashCompare = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.compare(password, hashedPassword);
    }
    catch (error) {
        throw error;
    }
});
// Create a JWT token
const createToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }
        return yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "30m",
        });
    }
    catch (error) {
        throw error;
    }
});
// Decode a JWT token
const decodeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    hashPassword,
    hashCompare,
    createToken,
    decodeToken,
};
