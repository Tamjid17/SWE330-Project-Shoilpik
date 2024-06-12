import { getAllCategories, getCategoryById, createCategory as createCategoryModel, updateCategory, deleteCategory, getProductByCategory } from '../models/category.js';

export const getCategories = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategory = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const category = await getCategoryById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategoryController = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const { name } = req.body;
    const id = await createCategoryModel(name);
    res.status(201).json({ id, name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategoryController = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const { id } = req.params;
    const { name } = req.body;
    const success = await updateCategory(id, name);
    if (success) {
      res.status(200).json({ message: 'Category updated' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategoryController = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
}
  try {
    const { id } = req.params;
    const success = await deleteCategory(id);
    if (success) {
      res.status(200).json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductByCategoryController = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
}
  try {
    const products = await getProductByCategory(req.params.id);
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No products found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



//Sazzad