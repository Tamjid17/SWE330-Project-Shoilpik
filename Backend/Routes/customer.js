import express from "express";
import {
  customerRegister,
  verifyCustomerEmail,
  customerLogin,
  customerProfile
} from "../controllers/customer.js";
import { verifyToken} from "../Auth/authCheck.js"
const customerRouter = express.Router();

customerRouter.post("/register", customerRegister);
customerRouter.get("/verify-email/:token", verifyCustomerEmail);
customerRouter.get("/login", customerLogin);
customerRouter.get("/profile", verifyToken, customerProfile);

export default customerRouter;
