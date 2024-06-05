import { pool } from './db.js';

export const getAllCategories = async () => {
  const [rows] = await pool.query('SELECT * FROM category');
  return rows;
};

export const getCategoryById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM category WHERE id = ?', [id]);
  return rows[0];
};

export const createCategory = async (name) => {
  const [result] = await pool.query('INSERT INTO category (name) VALUES (?)', [name]);
  return result.insertId;
};

export const updateCategory = async (id, name) => {
  const [result] = await pool.query('UPDATE category SET name = ? WHERE id = ?', [name, id]);
  return result.affectedRows > 0;
};

export const deleteCategory = async (id) => {
  const [result] = await pool.query('DELETE FROM category WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
//Sazzad