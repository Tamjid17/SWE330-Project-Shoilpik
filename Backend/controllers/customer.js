import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createToken from "../Auth/createJWT.js";
import { sendVerificationEmail } from "../Auth/customerVerification.js";
import {
  createTemporaryCustomer,
  getCustomers,
  getCustomerbyEmail,
  createPermanentCustomer,
  deleteTemporaryCustomer,
  getSpecificCustomer,
} from "../models/customer.js";
import { pool } from "../models/db.js";

export const customerRegister = async (req, res) => {
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
    const users = await getCustomers();
    const userbyEmail = users.find((user) => user.email === email);
    const userbyPhone = users.find((user) => user.phone === phone);
    if (userbyEmail || userbyPhone) {
      return res.status(409).json({ message: "User already exists" });
    } else {
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
      res.status(200).json({
        message:
          "Verification email sent. Please check your email to complete registration.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyCustomerEmail = async (req, res) => {
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const users = await getSpecificCustomer(email);
    const user = users[0];
    if (!user) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const [nameResult] = await pool.query('SELECT name FROM buyer WHERE email = ?', [email]);
      const [roleResult] = await pool.query('SELECT role FROM buyer WHERE email = ?', [email]);
      const [idResult] = await pool.query('SELECT buyer_id FROM buyer WHERE email = ?', [email]);
      const [phoneResult] = await pool.query('SELECT phone FROM buyer WHERE email = ?', [email]);
      const [addressResult] = await pool.query('SELECT address FROM buyer WHERE email = ?', [email]);
      
      const name = nameResult[0].name;
      const role = roleResult[0].role;
      const id = idResult[0].buyer_id;
      const phone = phoneResult[0].phone;
      const address = addressResult[0].address;
      
      const payload = { id, name, email, role, phone, address};
      const token = createToken(payload, "1d");
      return res.status(200).json({ token }); 
  }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const customerProfile = async (req, res) => {
  const { email } = req.user;

  try {
    const user = await getSpecificCustomer(email);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};