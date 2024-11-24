"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const validation_1 = require("../common/validation");
// Define the schema for the User model
const userSchema = new index_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: validation_1.validateEmail,
            message: (props) => `${props.value} is not a valid email address`,
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});
// Export the User model
const User = index_1.default.model("User", userSchema);
exports.default = User;
