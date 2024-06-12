import { pool } from "./db.js";

export const getAllproducts = async () => {
    const [rows] = await pool.query('SELECT * FROM product');
    return rows;
}

export const getProductsById = async (product_id) => {
    const [rows] = await pool.query('SELECT * FROM product WHERE product_id = ?', [product_id]);
    return rows[0];
}

export const createProduct = async (name, price, seller_id, category_id, stock) => {
    const [result] = await pool.query('INSERT INTO product (product_name, price, seller_id, category_id, stock) VALUES (?, ?, ?, ?, ?)', [name, price, seller_id,
         category_id, stock]);
    return result.insertId;
}

export const updateProduct = async (product_id, name, price, category_id, stock) => {
    const [result] = await pool.query('UPDATE product SET product_name = ?, price = ?, category_id = ?, stock = ? WHERE product_id = ?', [name, price, category_id, stock, product_id]);
    return result.affectedRows > 0;
}

export const deleteProduct = async (product_id) => {
    const [result] = await pool.query('DELETE FROM product WHERE product_id = ?', [product_id]);
    return result.affectedRows > 0;
}
