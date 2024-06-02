import express from "express";
import {
  customerRegister,
  verifyCustomerEmail,
} from "../controllers/customer.js";
const customerRouter = express.Router();

customerRouter.post("/register", customerRegister);
customerRouter.get("/verify-email/:token", verifyCustomerEmail);

export default customerRouter;
