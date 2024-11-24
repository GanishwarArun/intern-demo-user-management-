import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface JwtPayload {
  [key: string]: any; 
}

// Hash a password
const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt: string = await bcrypt.genSalt(Number(process.env.SALT));
    console.log(salt);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Compare a password with its hash
const hashCompare = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
};

// Create a JWT token
const createToken = async (payload: JwtPayload): Promise<string> => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is not defined in the environment variables."
      );
    }
    return await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
  } catch (error) {
    throw error;
  }
};

// Decode a JWT token
const decodeToken = async (token: string): Promise<JwtPayload | null> => {
  try {
    return jwt.decode(token) as JwtPayload | null;
  } catch (error) {
    throw error;
  }
};

export default {
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
};
