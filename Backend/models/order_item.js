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

export const getOrderItemByBuyer_id = async (buyer_id) => {
    try {
        // Get all order IDs for the given buyer
        const [orders] = await pool.query('SELECT order_id FROM orders WHERE buyer_id = ?', [buyer_id]);
        if (orders.length === 0) {
            throw new Error('No orders found for this buyer');
        }

        // Initialize an array to store all detailed order items
        let detailedOrderItems = [];

        // Iterate over each order to get the order items and product details
        for (let order of orders) {
            const [order_items] = await pool.query('SELECT * FROM orders_item WHERE order_id = ?', [order.order_id]);
            for (let item of order_items) {
                const [product] = await pool.query('SELECT product_name, image FROM product WHERE product_id = ?', [item.product_id]);
                if (product.length > 0) {
                    detailedOrderItems.push({
                        ...item,
                        product_name: product[0].product_name,
                        image: product[0].image
                    });
                }
            }
        }

        return detailedOrderItems;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
