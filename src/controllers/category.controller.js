import { Category } from "../services/category.service.js";
import { sendResponse } from "../utils/responses.js";

export const getCategoryById = async (req, res) => {
  try {
    const response = await Category.getCategoryById(req.params.id);
    sendResponse(res, 200, "Category retrieved successfully", { response });
  } catch (error) {
    console.log("Err in createCategory:", error);
    sendResponse(res, 500, error.message || "Failed to create category");
  }
};

export const getCategoryByName = async (req, res) => {
  try {
    const response = await Category.getCategoryByName(req.body.name);
    sendResponse(res, 200, "Category retrieved successfully", { response });
  } catch (error) {
    console.log("Err in createCategory:", error);
    sendResponse(res, 500, error.message || "Failed to create category");
  }
};

export const createCategory = async (req, res) => {
  try {
    const response = await Category.createCategory(req.body.name);
    sendResponse(res, 201, "Category created successfully", { response });
  } catch (error) {
    console.log("Err in createCategory:", error);
    sendResponse(res, 500, error.message || "Failed to create category");
  }
};
