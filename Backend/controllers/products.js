import { getAllproducts, getProductsById, getProductsBySellerId, updateProduct, deleteProduct, createProductImage } from "../models/products.js";
import { pool } from "../models/db.js";
import fs from 'fs/promises';
import path from 'path';
import uploadOnCloudinary from '../utility/cloudinary.js';
export const getAllproductsController = async (req, res) => {
    // if (req.user.role !== 'admin') {
    //     return res.status(403).json({ message: 'Forbidden' });
    // }
    try {
        const products = await getAllproducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductsByIdController = async (req, res) => {
    if (req.user.role === 'admin' || req.user.role === 'seller' || req.user.role === 'customer') {
      try {
        const product = await getProductsById(req.params.id);
  
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        if (product.image) {

          try {
            const imagePath = path.resolve(product.image); 
            const imageData = await fs.readFile(imagePath);
            const mimeType =
              path.extname(imagePath).toLowerCase() === ".png"
                ? "image/png"
                : "image/jpg";
            const base64Image = `data:${mimeType};base64,${imageData.toString(
              "base64"
            )}`; 
            product.image = base64Image; 
          } catch (imageError) {
            console.error("Error reading image file:", imageError);
            product.image = null; 
          }
        } else {
          product.image = null; 
        }
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };

  export const getProductsBySellerIdController = async (req, res) => {
    if (req.user.role === 'admin' || req.user.role === 'seller') {
      try {
        const products = await getProductsBySellerId(req.params.seller_id);
        if(!products) {
          return res.status(404).json({ message: 'Products not found' });
        }
        if(products.image) {
          try {
            const imagePath = path.resolve(products.image);
            const imageData = await fs.readFile(imagePath
            );
            const mimeType = path.extname(imagePath).toLowerCase() === '.png' ? 'image/png' : 'image/jpg';
            const base64Image = `data:${mimeType};base64,${imageData.toString('base64')}`;
            products.image = base64Image;
          } catch (imageError) {
            console.error('Error reading image file:', imageError);
            products.image = null;
          }
        } else {
          products.image = null;
        } 
        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
  

export const createProductImageController = async (req, res) => {
  if(req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const localFilePath = req.file.path;
    const cloudinaryResult = await uploadOnCloudinary(localFilePath);
    const image = cloudinaryResult.url;
    const seller_id = req.user.id;
    console.log('Seller ID:', seller_id);
    console.log('Image:', image);
    const productId = await createProductImage(seller_id, image);
    console.log('Product ID:', productId);
    res.status(201).json({ message: 'Product image created', productId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product image' });
  }

};

export const updateProductController = async (req, res) => {
    const { id } = req.params;
    if (req.user.role === 'admin' || req.user.role === 'seller') {
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

export const getEveryProducts = async (req, res) => {
  try {
    const products = await getAllproducts();
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
