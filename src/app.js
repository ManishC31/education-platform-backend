import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index.route.js";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "1gb" }));
app.use(cookieParser());

// routes
app.use("/api/v1", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
