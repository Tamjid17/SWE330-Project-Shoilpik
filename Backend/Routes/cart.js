import express from 'express';
import { verifyToken } from '../Auth/authCheck';
import { addCartItem, deleteCartItem, getCartItems, updateCartQuantity } from '../controllers/cart';

const cartRouter = express.Router();

cartRouter.post('/add', verifyToken, addCartItem);
cartRouter.delete('/delete', verifyToken, deleteCartItem);
cartRouter.post('/update', verifyToken, updateCartQuantity);
cartRouter.get('/getItems', verifyToken, getCartItems);

export default cartRouter;