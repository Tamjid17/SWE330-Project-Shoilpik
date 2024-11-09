import { pool } from "./db.js";
export async function addToCarts({
  cart_id,
  buyer_id,
  product_id,
  product_name,
  price,
  quantity,
}) {
  const result = await pool.query(
    "INSERT INTO cart(cart_id, buyer_id, product_id, product_name, price, quantity) VALUES(?, ?, ?, ?, ?, ?)",
    [cart_id, buyer_id, product_id, product_name, price, quantity]
  );
  return {
    cart_id,
    buyer_id,
    product_id,
    product_name,
    price,
    quantity,
  };
}

export async function deleteFromCart(cart_id) {
  const result = await pool.query("DELETE FROM cart WHERE cart_id = ?", [
    cart_id,
  ]);
  return result;
}

export async function updateQuantity(cart_id, quantity) {
  const result = await pool.query(
    "UPDATE cart SET quantity = ? WHERE cart_id = ?",
    [quantity, cart_id]
  );
  return result;
}

export async function itemsFromCart(buyer_id) {
  const result = await pool.query(
    "SELECT cart_id, buyer_id, product_id, product_name, price, quantity FROM cart WHERE buyer_id = ?",
    [buyer_id]
  );
  return result;
}
