import express from "express";
import {
    getAllproductsController,
    getProductsByIdController,
    getProductsBySellerIdController,
    createProductImageController,
    updateProductController,
    deleteProductControler,
    getEveryProducts
} from "../controllers/products.js";
import { upload } from "../Auth/multer.js";
import { verifyToken } from "../Auth/authCheck.js";

const productRouter = express.Router();
productRouter.get("/all", getAllproductsController);
productRouter.get("/:id", getProductsByIdController);
productRouter.get("/seller/:seller_id", verifyToken, getProductsBySellerIdController);
productRouter.post("/listing", verifyToken, upload.single("file"), createProductImageController);
productRouter.put("/:id", verifyToken, updateProductController);
productRouter.delete("/:id", verifyToken, deleteProductControler);

export default productRouter;
//Sazzad

