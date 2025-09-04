import express from "express";
import validate from "../middlewares/validator.middleware.js";
import { loginStudent } from "../controllers/auth.controller.js";
import Joi from "joi";
const router = express.Router();

// router.post(
//   "/register-student",
//   validate({
//     body: Joi.object({
//       firstname: Joi.string().required(),
//       lastname: Joi.string(),
//       email: Joi.string().required().email(),
//       password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).max(16),
//       role: Joi.string().valid("student", "instructor").default("student"),
//     }),
//   }),
//   registerUser
// );

router.post(
  "/login-student",
  validate({
    body: Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).max(16),
    }),
  }),
  loginStudent
);
export default router;
