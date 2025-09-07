import EducatorModel from "../models/educator.model.js";
import UserModel from "../models/users.model.js";
import { sendResponse } from "../utils/responses.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createStudent = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  if (!role) {
    role = "student";
  }

  try {
    const existingUser = await UserModel.findOne({ where: { email: email } });

    if (existingUser) {
      return sendResponse(res, 400, "User already present with email");
    }

    const encPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password: encPassword,
      role,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // set token in cookie
    res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 });

    delete user.password;
    delete user.created_at;
    delete user.updated_at;
    return sendResponse(res, 201, "Registeration successful", { user, token });
  } catch (error) {
    console.log("Err in createStudent:", error);
    return sendResponse(res, 500, "Failed to create a student");
  }
};

export const createEducator = async (req, res) => {
  const { firstname, lastname, email, contact, address, city, state, country, password, role } = req.body;

  if (!role) {
    role = "educator";
  }

  try {
    const existingUser = await UserModel.findOne({ where: { email: email } });

    if (existingUser) {
      return sendResponse(res, 400, "User is already present with email");
    }

    const encPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password: encPassword,
      role,
    });

    const educatorDetails = await EducatorModel.create({
      user_id: user.id,
      contact_number: contact,
      address,
      city,
      state,
      country,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // set token in cookie
    res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 });

    delete user.password;
    delete user.created_at;
    delete user.updated_at;
    return sendResponse(res, 201, "Registeration successful", { user, token });
  } catch (error) {
    console.log("Error in createEducator:", error);
    return sendResponse(res, 500, "Failed to register an educator");
  }
};

export const createAdmin = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  if (!role) {
    role = "admin";
  }

  try {
    const existingUser = await UserModel.findOne({ where: { email: email } });

    if (existingUser) {
      return sendResponse(res, 400, "User with email already exists");
    }

    const encPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password: encPassword,
      role,
    });

    user.password = undefined;
    return sendResponse(res, 201, "Admin created successfully", user);
  } catch (error) {}
};
