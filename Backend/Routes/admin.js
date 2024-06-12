import express from "express";
import { adminRegisterControllers, customerList } from "../controllers/admin.js";
const adminRouter = express.Router();
adminRouter.get('./customers', customerList);
adminRouter.post('/register', adminRegisterControllers);
export default adminRouter;
