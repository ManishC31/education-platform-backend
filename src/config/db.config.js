import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const poolDB = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

export default poolDB;
