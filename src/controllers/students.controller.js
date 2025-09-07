import UserModel from "../models/users.model.js";
import { sendResponse } from "../utils/responses.js";

export const getNewStudents = async (req, res) => {
  try {
    const students = await UserModel.findAll({
      where: { role: "student" },
      include: [
        {
          model: (await import("../models/student.model.js")).default,
          as: "student",
        },
      ],
      order: [["id", "DESC"]],
      limit: 20,
    });

    return sendResponse(res, 200, "success", students);
  } catch (error) {
    console.log(`Err in getNewStudents:`, error);
    return sendResponse(res, 500, "Failed to fetch new students data");
  }
};
