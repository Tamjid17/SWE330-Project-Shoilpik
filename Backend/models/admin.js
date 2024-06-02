import { pool } from "./db.js";

export async function getCustomers() {
  const [customers] = await pool.query("SELECT * FROM temporary_buyer");
  return customers;
}