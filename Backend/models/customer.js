import { pool } from './db.js';
export async function createTemporaryCustomer({
    name,
    gender,
    email,
    password,
    phone,
    address,
    dob,
}) {
    const [result] = await pool.query(
    "INSERT INTO temporary_buyer(name, gender, email, password, phone, address, dob) VALUES(?, ?, ?, ?, ?, ?, ?)",
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

export async function getCustomerbyEmail(email) {
    const [result] = await pool.query(
    "SELECT * FROM temporary_buyer WHERE email = ?",
    [email]
    );
    return result;
}

export async function createPermanentCustomer(user) {
    const result = pool.query(
        "INSERT INTO buyer(name, gender, email, password, phone, address, dob) VALUES(?, ?, ?, ?, ?, ?, ?)",
        [user.name, user.gender, user.email, user.password, user.phone, user.address, user.dob]
    );
    return {name: user.name, gender: user.gender, email: user.email, password: user.password, phone: user.phone, address: user.address, dob: user.dob}
}

export async function deleteTemporaryCustomer(email) {
    const result = pool.query(
        "DELETE FROM temporary_buyer WHERE email = ?",
        [email]
    );
    return result;
} 

export async function getCustomers() {
    const [customers] = await pool.query("SELECT * FROM buyer");
    return customers;
}