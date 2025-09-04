import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

const UserModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("student", "educator", "admin"),
      allowNull: false,
    },
    auth_type: {
      type: DataTypes.ENUM("email-password", "google"),
      allowNull: false,
      defaultValue: "email-password",
    },
  },
  {
    tableName: "users",
  }
);

export default UserModel;
