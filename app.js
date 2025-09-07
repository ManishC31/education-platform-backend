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
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "1gb" }));
app.use(cookieParser());

// routes
app.use("/api/v1", routes);

// database connection
await initDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
