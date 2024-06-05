import express from "express";
import { SellerLogin, sellerRegister, verifySellerEmail } from "../controllers/seller.js";
const sellerRouter = express.Router();

sellerRouter.post("/register", sellerRegister);
sellerRouter.get("/verify-email/:token", verifySellerEmail);
sellerRouter.get("/login", SellerLogin);

export default sellerRouter;