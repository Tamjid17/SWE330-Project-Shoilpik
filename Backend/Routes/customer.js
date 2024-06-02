import express from "express";
import { customerRegister } from "../controllers/customer.js";
import { verifyEmail } from "../controllers/verifyEmail.js";
const customerRouter = express.Router();

customerRouter.post("/register", customerRegister);
customerRouter.get("/verify-email/:token", verifyEmail);

export default customerRouter;
