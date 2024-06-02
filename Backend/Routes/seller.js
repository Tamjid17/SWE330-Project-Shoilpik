import express from "express";
import { sellerRegister, verifySellerEmail } from "../controllers/seller.js";
const sellerRouter = express.Router();

sellerRouter.post("/register", sellerRegister);
sellerRouter.get("/verify-email/:token", verifySellerEmail);
export default sellerRouter;