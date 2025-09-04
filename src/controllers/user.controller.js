import UserModel from "../models/users.model";
import { sendResponse } from "../utils/responses";

export const createStudent = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  if (!role) {
    role = "student";
  }

  try {
    const existingUser = await UserModel.findOne({ where: { email: email } });

    if (existingUser) {
      return sendResponse();
    }
  } catch (error) {}
};
