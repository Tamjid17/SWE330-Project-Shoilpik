import express from 'express';
import { verifyToken } from "../Auth/authCheck.js";
import { addCartItem, deleteCartItem, getCartItems, updateCartQuantity } from '../controllers/cart.js';

const cartRouter = express.Router();

cartRouter.post('/add', addCartItem);
cartRouter.delete('/delete/:cart_id', deleteCartItem);
cartRouter.post('/update',  updateCartQuantity);
cartRouter.post('/getItems', getCartItems);

export default cartRouter;