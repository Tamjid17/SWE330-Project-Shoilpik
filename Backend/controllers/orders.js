import { pool } from "../models/db.js";
import { getAllOrders, getOrderByBuyer_id, getOrderByOrder_id, updateOrder, createOrder, deleteOrder } from "../models/orders.js";

export const getAllOrdersController = async (req,res) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: 'Forbidden'});
    }
    try {
        const orders = await getAllOrders();
        return res.status(200).json(orders);
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

export const getOrderByOrder_idController = async (req, res) => {
    if(req.user.role === 'admin'){
        try {
            const order_id = req.params.order_id;
            const order = await getOrderByOrder_id(order_id);
            if(order.length === 0){ 
                return res.status(404).json({message: 'Order not found'}); 
            }
            return res.status(200).json(order);
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }else if (req.user.role === 'customer'){
        try {
            const order_id = req.params.order_id;
            const [buyerResult] = await pool.query('SELECT buyer_id FROM orders WHERE order_id = ?', [order_id]);
            if(buyerResult[0].buyer_id !== req.user.id){
                return res.status(403).json({message: 'Forbidden'});
            }
            const order = await getOrderByOrder_id(order_id);
            return res.status(200).json(order);
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }else{
        return res.status(403).json({message: 'Forbidden'});
    }
}

export const getOrderByBuyer_idController = async (req, res) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: 'Forbidden'});
    }
    try {
        const buyer_id = req.params.buyer_id;
        const orders = await getOrderByBuyer_id(buyer_id);
        if(orders.length === 0){
            return res.status(404).json({message: 'No orders'});
        }
        return res.status(200).json(orders);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const createOrderController = async (req, res) => {
    if(req.user.role !== 'customer'){
        return res.status(403).json({message: 'Forbidden'});
    }
    try {
        const buyer_id = req.user.id;
        const status = req.body.status;
        const order_id = await createOrder(buyer_id, status);
        return res.status(201).json({order_id: order_id, buyer_id: buyer_id, status: status});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const updateOrderController = async (req, res) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: 'Forbidden'});
    }
    try {
        const order_id = req.params.order_id;
        const status = req.body.status;
        await updateOrder(order_id, status);
        return res.status(200).json({message: 'Order updated'});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteOrderController = async (req, res) => {
    if(req.user.role === 'admin'){
        try {
            const order_id = req.params.order_id;
            await deleteOrder(order_id);
            await pool.query('DELETE FROM order_items WHERE order_id = ?', [order_id]);
            return res.status(200).json({message: 'Order deleted'});
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }else if(req.user.role === 'customer'){
        try {
            const order_id = req.params.order_id;
            const [buyerResult] = await pool.query('SELECT buyer_id FROM orders WHERE order_id = ?', [order_id]);
            if(buyerResult[0].buyer_id !== req.user.id){
                return res.status(403).json({message: 'Forbidden'});
            }
            await deleteOrder(order_id);
            await pool.query('DELETE FROM order_items WHERE order_id = ?', [order_id]);
            return res.status(200).json({message: 'Order deleted'});
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }else{  
        return res.status(403).json({message: 'Forbidden'});
    }
    
}