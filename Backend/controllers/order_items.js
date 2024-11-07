import { pool } from "../models/db.js";
import { create_orderItem, getAllOrder_items, getOrderItemByOrder_id, getOrderItemByProduct_id, getOrderItemBySeller_id, getOrderItemByBuyer_id } from "../models/order_item.js";

export const create_orderItemController = async (req, res) => {
    if(req.user.role !== 'customer'){
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const buyer_id = req.user.id;
        console.log(buyer_id);
        const [orderIdResult] = await pool.query('SELECT order_id FROM orders WHERE buyer_id = ?', [buyer_id]);
        if(orderIdResult.length === 0){
            return res.status(404).json({ message: 'No pending order' });
        }

        const { product_id, quantity } = req.body;
        const [seller_id_result] = await pool.query('SELECT seller_id FROM product WHERE product_id = ?', [product_id]);
        const [stockResult] = await pool.query('SELECT stock FROM product WHERE product_id = ?', [product_id]);
        const [priceResult] = await pool.query('SELECT price FROM product WHERE product_id = ?', [product_id]);

        if(seller_id_result.length === 0){
            return res.status(404).json({ message: 'Product not found' });
        }
        if(stockResult[0].stock < quantity){
            return res.status(404).json({ message: 'Not enough stock' });
        }
        let newstock = stockResult[0].stock - quantity;
        await pool.query('UPDATE product SET stock = ? WHERE product_id = ?', [newstock, product_id]);
        const price = priceResult[0].price;
        const seller_id = seller_id_result[0].seller_id;
        const order_id = orderIdResult[0].order_id;

        await create_orderItem(order_id, product_id, seller_id, price, quantity);

        return res.status(201).json({ order_id, product_id, seller_id, price, quantity });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllOrder_itemsController = async (req, res) => {   
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: 'Forbidden'});
    } 
    try {
        const order_items = await getAllOrder_items();
        return res.status(200).json(order_items);
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

export const getOrderItemByOrder_idController = async (req, res) => {   
    if(req.user.role === 'admin'){
        try {
            const order_id = req.params.order_id;
            const order_items = await getOrderItemByOrder_id(order_id);
            if(order_items.length === 0){
                return res.status(404).json({message: 'No product added to order'});
            }
            return res.status(200).json(order_items);
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }else if(req.user.role === 'customer'){
        try {
            const order_id = req.params.order_id;
            const [buyer_id_re] = await pool.query('SELECT buyer_id FROM orders WHERE order_id = ?', [order_id]);
            if(buyer_id_re[0].buyer_id !== req.user.id){
                return res.status(403).json({message: 'Forbidden'});
            }
            const order_items = await getOrderItemByOrder_id(order_id);
            if(order_items.length === 0){
                return res.status(404).json({message: 'No product added to order'});
            }
            return res.status(200).json(order_items);
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }else{
        return res.status(403).json({message: 'Forbidden'});
    }  
}

export const getOrderItemByProduct_idController = async (req, res) => {   
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: 'Forbidden'});
    } 
    try {
        const product_id = req.params.product_id;
        const order_items = await getOrderItemByProduct_id(product_id);
        if(order_items.length === 0){
            return res.status(404).json({message: 'No product added to order'});
        }
        return res.status(200).json(order_items);
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

export const getOrderItemBySeller_idController = async (req, res) => {   
    if(req.user.role === 'admin'){
        try {
            const seller_id = req.params.seller_id;
            const order_items = await getOrderItemBySeller_id(seller_id);
            if(order_items.length === 0){
                return res.status(404).json({message: 'No product added to order'});
            }
            return res.status(200).json(order_items);
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }else if(req.user.role === 'seller'){
        try {
            const seller_id = parseInt(req.params.seller_id, 10);
            const {id: user_id} = req.user;
            if(user_id !== seller_id){
                return res.status(403).json({message: 'Forbidden'});
            }
            const order_items = await getOrderItemBySeller_id(seller_id);
            if(order_items.length === 0){
                return res.status(404).json({message: 'No product added to order'});
            }
            return res.status(200).json(order_items);
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }else{
        return res.status(403).json({message: 'Forbidden'});
    }
}

export const getOrderItemByBuyer_idController = async (req, res) => {
    if (req.user.role === 'admin' || req.user.role === 'customer') {
        try {
            const buyer_id = req.params.buyer_id;
            const order_items = await getOrderItemByBuyer_id(buyer_id);

            if (order_items.length === 0) {
                return res.status(404).json({ message: 'No product added to order' });
            }

            return res.status(200).json(order_items);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }
}
