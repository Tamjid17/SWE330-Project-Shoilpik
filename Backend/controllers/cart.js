import dotenv from 'dotenv';
import { addToCarts, deleteFromCart, itemsFromCart, updateQuantity } from '../models/cart.js';
dotenv.config();

export const addCartItem = async(req, res) => {
    const { cart_id, buyer_id, product_id, product_name, price, quantity } = req.body;
    if (
      !cart_id ||
      !buyer_id ||
      !product_id ||
      !product_name ||
      !price ||
      !quantity
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const cart = await addToCarts({
          cart_id,
          buyer_id,
          product_id,
          product_name,
          price,
          quantity,
        });
        res.status(200).json({
          message:
            "Items added to cart successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCartQuantity = async(req, res) => {
    const {cart_id, quantity} = req.body;
    if (
      !cart_id ||
      !quantity
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const cart = await updateQuantity(cart_id, quantity)
        res.status(200).json({
          message:
            "item quantity updated in cart",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCartItem = async(req, res) => {
    const { cart_id } = req.body;
    if (!cart_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
        await deleteFromCart(cart_id);
        res.status(200).json({
          message: "item deleted from cart",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getCartItems = async(req, res) => {
    const { buyer_id } = req.body;
    if (!buyer_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      const itemsByBuyer = await itemsFromCart(buyer_id);
      return res.status(200).json(itemsByBuyer);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}