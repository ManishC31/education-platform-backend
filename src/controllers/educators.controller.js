import UserModel from "../models/users.model.js";
import { sendResponse } from "../utils/responses.js";

export const getNewEducators = async (req, res) => {
  try {
    const educators = await UserModel.findAll({
      where: { role: "educator" },
      include: [
        {
          model: (await import("../models/educator.model.js")).default,
          as: "educator",
        },
      ],
      order: [["id", "DESC"]],
      limit: 20,
    });

    return sendResponse(res, 200, "success", educators);
  } catch (error) {
    console.log(`Err in getNewStudents:`, error);
    return sendResponse(res, 500, "Failed to fetch new students data");
  }
};
