import { pool } from "./db.js";
import bcrypt from "bcrypt";

export async function getCustomers() {
  const [customers] = await pool.query("SELECT * FROM admins");
  return customers;
}

export const adminRegister = async (name, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query('INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role]);
  return result.insertId;
}