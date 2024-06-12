import express from "express";
import {
  getCategories,
  getCategory,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getProductByCategoryController,
} from "../controllers/category.js";
import { getProductByCategory } from "../models/category.js";
import { verifyToken } from "../Auth/authCheck.js";

const Categoryrouter = express.Router();

Categoryrouter.get("/", verifyToken, getCategories);
Categoryrouter.get("/:id", verifyToken, getCategory);
Categoryrouter.get("/products/:id", verifyToken, getProductByCategoryController);
Categoryrouter.post("/",verifyToken, createCategoryController);
Categoryrouter.put("/:id",verifyToken, updateCategoryController);
Categoryrouter.delete("/:id",verifyToken, deleteCategoryController);

export default Categoryrouter;
//Sazzad