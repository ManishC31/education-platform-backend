import UserModel from "../models/users.model.js";
import { sendResponse } from "../utils/responses.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return sendResponse(res, 400, "User not found with email");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return sendResponse(res, 400, "Email & password do not match");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // set token in cookie
    res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 });

    // remove unwanted fields
    delete user.password;
    delete user.created_at;
    delete user.updated_at;
    return sendResponse(res, 200, "Login successful", { user, token });
  } catch (error) {
    console.log("Err in loginUser:", error);
    return sendResponse(res, 500, "Failed to login student");
  }
};

export const logoutUser = async (req, res) => {
  // clear cookie
  res.clearCookie("token");
  return sendResponse(res, 200, "Logout successful");
};
