import express from 'express';
import { create_orderItemController, getAllOrder_itemsController, getOrderItemByBuyer_idController, getOrderItemByOrder_idController, getOrderItemByProduct_idController, getOrderItemBySeller_idController } from '../controllers/order_items.js';
import { verifyToken } from '../Auth/authCheck.js';

const orders_itemRouter = express.Router();

orders_itemRouter.get('/all_orders_item', verifyToken, getAllOrder_itemsController);
orders_itemRouter.get('/order_id/:order_id', verifyToken, getOrderItemByOrder_idController);
orders_itemRouter.get('/buyer_id/:buyer_id', verifyToken, getOrderItemByBuyer_idController);
orders_itemRouter.get('/product_id/:product_id', verifyToken, getOrderItemByProduct_idController);
orders_itemRouter.get('/seller_id/:seller_id', verifyToken, getOrderItemBySeller_idController);
orders_itemRouter.post('/create_order_item', verifyToken, create_orderItemController);

export default orders_itemRouter;