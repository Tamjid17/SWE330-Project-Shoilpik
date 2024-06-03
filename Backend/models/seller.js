import { pool } from "./db.js";

export async function createTemporarySeller({
    name,
    gender,
    email,
    password,
    phone,
    address,
    dob,
}) {
    const [result] = await pool.query(
    "INSERT INTO temporary_seller(name, gender, email, password, phone, address, dob) VALUES(?, ?, ?, ?, ?, ?, ?)",
    [name, gender, email, password, phone, address, dob]
    );
    return {
    id: result.insertId,
    name,
    gender,
    email,
    password,
    phone,
    address,
    dob,
    };
}

export async function getSellerbyEmail(email) {
    const [result] = await pool.query(
    "SELECT * FROM temporary_seller WHERE email = ?",
    [email]
    );
    return result;
}

export async function createPermanentSeller(user) {
    const result = pool.query(
    "INSERT INTO seller(name, gender, email, password, phone, address, dob) VALUES(?, ?, ?, ?, ?, ?, ?)",
    [
        user.name,
        user.gender,
        user.email,
        user.password,
        user.phone,
        user.address,
        user.dob,
    ]
    );
    return {
    name: user.name,
    gender: user.gender,
    email: user.email,
    password: user.password,
    phone: user.phone,
    address: user.address,
    dob: user.dob,
    };
}

export async function deleteTemporarySeller(email) {
    const result = pool.query("DELETE FROM temporary_seller WHERE email = ?", [
    email,
    ]);
    return result;
}

export async function getSellers() {
  const [sellers] = await pool.query("SELECT * FROM seller");
    return sellers;
}

export async function getSpecificSeller(email) {
    try {
    const seller = await pool.query("SELECT * FROM seller WHERE email = ?", [
        email,
    ]);
    return seller[0];
    } catch (error) {
    console.error(`Error fetching seller by email: ${email}`, error);
    throw error;
    }
}