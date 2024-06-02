import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createToken from "../Auth/createJWT.js";
import { sendVerificationEmail } from "../Auth/sellerVerification.js";
import { createTemporarySeller, getSellers, getSellerbyEmail, createPermanentSeller, deleteTemporarySeller } from "../Models/seller.js";

dotenv.config();

export const sellerRegister = async (req, res) => {
  var hashedPassword = await bcrypt.hashSync(req.body.password, 10);
  const { name, gender, email, phone, address, dob } = req.body;

  if (
    !name ||
    !gender ||
    !email ||
    !hashedPassword ||
    !phone ||
    !address ||
    !dob
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const users = await getSellers();
    const userbyEmail = users.find((user) => user.email === email);
    const userbyPhone = users.find((user) => user.phone === phone);
    if (userbyEmail || userbyPhone) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      const tempCustomer = await createTemporarySeller({
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
      res.status(200).json({
        message:
          "Verification email sent. Please check your email to complete registration.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifySellerEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const { email } = decoded;
    const user = await getSellerbyEmail(email);

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const newUser = await createPermanentSeller(user[0]);
    await deleteTemporarySeller(email);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};