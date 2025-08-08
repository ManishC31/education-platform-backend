import express from "express";
import validate from "../middlewares/validator.middleware.js";
const router = express.Router();

router.post(
  "/create",
  validate({
    body: Joi.object({
      name: string().required(),
    }),
  })
);

export default router;
