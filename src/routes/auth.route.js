import express from "express";
import validate from "../middlewares/validator.middleware.js";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import Joi from "joi";
const router = express.Router();

router.post(
  "/register-user",
  validate({
    body: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string(),
      email: Joi.string().required().email(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).max(16),
    }),
  }),
  registerUser
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
export default router;
