import { getCustomerbyEmail } from "../models/customer.js";
import { createPermanentCustomer, deleteTemporaryCustomer } from "../models/customer.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyEmail = async (req, res) => {
    const { token } = req.params;
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        const { email } = decoded;
        const user = await getCustomerbyEmail(email);

        if (user.length === 0) {
        return res.status(400).json({ message: "Invalid or expired token" });
        }
        const newUser = await createPermanentCustomer(user[0]);
        await deleteTemporaryCustomer(email);
        res.status(200).json(user);
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
}