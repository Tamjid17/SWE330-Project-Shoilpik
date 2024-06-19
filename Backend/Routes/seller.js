import express from "express";
import { SellerLogin, sellerRegister, verifySellerEmail, sellerProfile } from "../controllers/seller.js";
import { verifyToken } from "../Auth/authCheck.js";
const sellerRouter = express.Router();

sellerRouter.post("/register", sellerRegister);
sellerRouter.get("/verify-email/:token", verifySellerEmail);
sellerRouter.post("/login", SellerLogin);
sellerRouter.get("/profile", verifyToken, sellerProfile);

export default sellerRouter;