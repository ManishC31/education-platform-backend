import { User } from "../services/user.service.js";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/responses.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const data = { ...req.body, role: "student" };
    const user = await User.createUser(data);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    sendResponse(res, 201, "User registered successfully", { token, user });
  } catch (error) {
    console.log("Err in registerUser:", error);
    sendResponse(res, 500, error.message || "Failed to register user");
  }
};

export const loginUser = async (req, res) => {
  try {
    const existingUser = await User.getUserByEmail(req.body.email);

    if (!existingUser) {
      sendResponse(res, 400, "No user found with email");
    }

    // check password
    const isValidPassword = await bcrypt.compare(req.body.password, existingUser.password);

    if (!isValidPassword) {
      sendResponse(res, 400, "Email & password are not matching");
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    delete existingUser.password;
    sendResponse(res, 200, "User logged in successfully", { token, user: existingUser });
  } catch (error) {
    console.log("Err in loginUser:", error);
    sendResponse(res, 500, error.message || "Failed to login user");
  }
};
