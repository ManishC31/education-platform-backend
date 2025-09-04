import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./src/routes/index.route.js";
import { initDatabase } from "./src/config/sequelize.config.js";
import "./src/models/index.js";

const app = express();

// middlewares
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "1gb" }));
app.use(cookieParser());

// routes
app.use("/api/v1", routes);

await initDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
