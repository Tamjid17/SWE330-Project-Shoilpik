import express from 'express';
import { verifyToken } from '../Auth/authCheck.js';
import { getAllOrdersController, getOrderByOrder_idController, getOrderByBuyer_idController, createOrderController, updateOrderController, deleteOrderController } from '../controllers/orders.js';

const orderRouter = express.Router();

orderRouter.get('/all_orders', verifyToken, getAllOrdersController );
orderRouter.get('/order_id/:order_id', verifyToken, getOrderByOrder_idController );
orderRouter.get('/buyer_id/:buyer_id', verifyToken, getOrderByBuyer_idController );
orderRouter.post('/create_order', verifyToken, createOrderController );
orderRouter.put('/update_order/:order_id', verifyToken, updateOrderController );
orderRouter.delete('/delete_order/:order_id', verifyToken, deleteOrderController );

export default orderRouter;