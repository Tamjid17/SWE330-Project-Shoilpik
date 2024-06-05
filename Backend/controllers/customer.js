import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createToken from "../Auth/createJWT.js";
import { sendVerificationEmail } from "../Auth/emailsend.js";
import { createTemporaryCustomer, getCustomers } from "../models/customer.js";

export const customerRegister = async (req, res) => {

    var hashedPassword = await bcrypt.hashSync(req.body.password, 10);
    const { name, gender, email, phone, address, dob } = req.body;

    if(!name || !gender || !email || !hashedPassword || !phone || !address || !dob){
    return res.status(400).json({message: "All fields are required"});
    }

    try {
    const users = await getCustomers();
    const userbyEmail = users.find(user => user.email === email);
    const userbyPhone = users.find(user => user.phone === phone);
    if (userbyEmail || userbyPhone) {
        return res.status(409).json({message: "User already exists"});
    }
    else {
        const tempCustomer = await createTemporaryCustomer({
            name,
            gender,
            email,
            password: hashedPassword,
            phone,
            address,
            dob,
    });
        const token = createToken({ email }, "1d");
        await sendVerificationEmail(tempCustomer.email, token);
        res
            .status(200)
            .json({
                message:
                "Verification email sent. Please check your email to complete registration.",
            });
    }
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
};
