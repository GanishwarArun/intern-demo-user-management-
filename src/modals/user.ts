import mongoose from "./index";
import { validateEmail } from "../common/validation";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: validateEmail,
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// Export the User model
const User = mongoose.model("User", userSchema);
export default User;
