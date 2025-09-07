import express from "express";
import validate from "../middlewares/validator.middleware.js";
import { loginUser, logoutUser } from "../controllers/auth.controller.js";
import Joi from "joi";
import { createAdmin, createEducator, createStudent } from "../controllers/user.controller.js";
const router = express.Router();

router.post(
  "/register-student",
  validate({
    body: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string(),
      email: Joi.string().required().email(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).max(16),
      role: Joi.string().valid("student", "educator").default("student"),
    }),
  }),
  createStudent
);

router.post(
  "/register-educator",
  validate({
    body: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string(),
      email: Joi.string().required().email(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).max(16),
      role: Joi.string().valid("student", "educator").default("educator"),
      contact: Joi.string(),
      address: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
    }),
  }),
  createEducator
);

router.post(
  "/register-admin",
  validate({
    body: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string(),
      email: Joi.string().required().email(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).max(16),
      role: Joi.string().valid("student", "educator").default("student"),
    }),
  }),
  createAdmin
);

router.post(
  "/login",
  validate({
    body: Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).max(16),
    }),
  }),
  loginUser
);

router.post(
  "/register-educator",
  validate({
    body: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string(),
      email: Joi.string().required().email(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).max(16),
      role: Joi.string().valid("student", "educator").default("educator"),
      contact: Joi.string(),
      address: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
    }),
  }),
  createEducator
);

router.get("/logout", logoutUser);

export default router;
