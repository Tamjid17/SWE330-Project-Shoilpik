import express from "express";
import {
  customerRegister,
  verifyCustomerEmail,
  customerLogin,
} from "../controllers/customer.js";
const customerRouter = express.Router();

customerRouter.post("/register", customerRegister);
customerRouter.get("/verify-email/:token", verifyCustomerEmail);
customerRouter.get("/login", customerLogin);

export default customerRouter;
