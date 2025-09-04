// import express from "express";
// import validate from "../middlewares/validator.middleware.js";
// import { createCategory, getCategoryById, getCategoryByName } from "../controllers/category.controller.js";
// import Joi from "joi";
// const router = express.Router();

// router.get(
//   "/:id",
//   validate({
//     params: Joi.object({
//       id: Joi.string().required(),
//     }),
//   }),
//   getCategoryById
// );

// router.post(
//   "/",
//   validate({
//     body: Joi.object({
//       name: Joi.string().required(),
//     }),
//   }),
//   createCategory
// );

// router.post(
//   "/name",
//   validate({
//     body: Joi.object({
//       name: Joi.string().required(),
//     }),
//   }),
//   getCategoryByName
// );

// export default router;
