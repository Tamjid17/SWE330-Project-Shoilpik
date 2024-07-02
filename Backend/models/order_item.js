import { pool } from "./db.js";

export const create_orderItem = async (order_id, product_id, seller_id, price, quantity) => {
    const [result] = await pool.query(
        'INSERT INTO orders_item (order_id, product_id, seller_id, price, quantity) VALUES (?, ?, ?, ?, ?)', 
        [order_id, product_id, seller_id, price, quantity]
    );
    return result;
};

export const getAllOrder_items = async () => {
    const [order_items] = await pool.query('SELECT * FROM orders_item');
    return order_items;
}

export const getOrderItemByOrder_id = async (order_id) => {
    const [order_items] = await pool.query('SELECT * FROM orders_item WHERE order_id = ?', [order_id]);
    return order_items;
}

export const getOrderItemByProduct_id = async (product_id) => {
    const [order_items] = await pool.query('SELECT * FROM orders_item WHERE product_id = ?', [product_id]);
    return order_items;
}

export const getOrderItemBySeller_id = async (seller_id) => {       
    const [order_items] = await pool.query('SELECT * FROM orders_item WHERE seller_id = ?', [seller_id]);
    return order_items;
}
//Sazzad