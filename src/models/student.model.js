import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

const studentModel = sequelize.define(
  "students",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    contact_number: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    is_mail_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_contact_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    city: {
      type: DataTypes.STRING(50),
    },
    state: {
      type: DataTypes.STRING(50),
    },
    country: {
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: "students",
  }
);

export default studentModel;
