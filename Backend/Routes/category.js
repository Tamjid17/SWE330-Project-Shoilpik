import express from "express";
import {
  getCategories,
  getCategory,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.js";

const Categoryrouter = express.Router();

Categoryrouter.get("/", getCategories);
Categoryrouter.get("/:id", getCategory);
Categoryrouter.post("/", createCategoryController);
Categoryrouter.put("/:id", updateCategoryController);
Categoryrouter.delete("/:id", deleteCategoryController);

export default Categoryrouter;
//Sazzad