import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl =
  process.env.DATABASE_URL ||
  `postgres://${process.env.DB_USER || "postgres"}:${process.env.DB_PASSWORD || ""}@${process.env.DB_HOST || "localhost"}:${
    process.env.DB_PORT || 5432
  }/${process.env.DB_DATABASE || "education_platform"}`;

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
  },
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    // this will create and alter table in database.
    await sequelize.sync({ force: false, alter: true });
    console.log("✅ Database & tables created");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    throw error;
  }
}
