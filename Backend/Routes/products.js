import express from "express";
import {
    getAllproductsController,
    getProductsByIdController,
    getProductsBySellerIdController,
    createProductController,
    updateProductController,
    deleteProductControler
} from "../controllers/products.js";
import { verifyToken } from "../Auth/authCheck.js";

const productRouter = express.Router();
productRouter.get("/", verifyToken, getAllproductsController);
productRouter.get("/:id", verifyToken, getProductsByIdController);
productRouter.get("/seller/:seller_id", verifyToken, getProductsBySellerIdController);
productRouter.post("/", verifyToken, createProductController);
productRouter.put("/:id", verifyToken, updateProductController);
productRouter.delete("/:id", verifyToken, deleteProductControler);

export default productRouter;
//Sazzad