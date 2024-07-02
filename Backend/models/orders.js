import { pool } from "./db.js";

export const getAllOrders = async () => {
    const [orders] = await pool.query('SELECT * FROM orders');
    return orders;
}

export const getOrderByOrder_id = async (order_id) => {
    const [orders] = await pool.query('SELECT * FROM orders WHERE order_id = ?', [order_id]);
    return orders;
}

export const getOrderByBuyer_id = async (buyer_id) => {
    const [orders] = await pool.query('SELECT * FROM orders WHERE buyer_id = ?', [buyer_id]);
    return orders;
}

export const createOrder = async (buyer_id ,status) => {
    const [result] = await pool.query('INSERT INTO orders (buyer_id, status) VALUES (?, ?)', [buyer_id, status]);
    return result.insertId;
}       

export const updateOrder = async (order_id, status) => {
    await pool.query('UPDATE orders SET status = ? WHERE order_id = ?', [status, order_id]);
}

export const deleteOrder = async (order_id) => {
    await pool.query('DELETE FROM orders WHERE order_id = ?', [order_id]);
}