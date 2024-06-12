import { getAllproducts, getProductsById, createProduct, updateProduct, deleteProduct } from "../models/products.js";
import { pool } from "../models/db.js";

export const getAllproductsController = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const products = await getAllproducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductsByIdController = async (req, res) => {
    if (req.user.role === 'admin' || req.user.role === 'seller_man') {
      try {
        const product = await getProductsById(req.params.id);
  
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
  

  export const createProductController = async (req, res) => {
    if (req.user.role !== 'seller_man') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const { name, price, category_id, stock } = req.body;
        const seller_id = req.user.id; 
        const productId = await createProduct(name, price, seller_id, category_id, stock);
        res.status(201).json({ product_id: productId, seller_id, name, price, category_id, stock });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProductController = async (req, res) => {
    const { id } = req.params;
    if (req.user.role === 'admin' || req.user.role === 'seller_man') {
        try {
            const { name, price, category_id, stock } = req.body;
            const success = await updateProduct(id, name, price, category_id, stock);
            if (success) {
                res.status(200).json({ message: 'Product updated' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }
};

export const deleteProductControler = async (req, res) => {
    console.log('User:', req.user); // Add this line to log req.user
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const { id: product_id } = req.params;
        const success = await deleteProduct(product_id);
        if (success) {
            res.status(200).json({ message: `Product deleted` });
        } else {
            res.status(404).json({ message: `Product not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
