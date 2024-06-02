import express from "express";
import { customerList } from "../controllers/admin.js";
const adminRouter = express.Router();
adminRouter.get('./customers', customerList);
export default adminRouter;
