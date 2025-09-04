import express from "express";
const router = express.Router();
import authRoutes from "./auth.route.js";
// import categoryRoutes from "./category.route.js";

router.use("/auth", authRoutes);
// router.use("/category", categoryRoutes);

export default router;
