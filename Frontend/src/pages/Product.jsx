import { addItem, setError, setLoading } from "@/features/cartSlice";
import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios"
const ProductPage = () => {
  const dispatch = useDispatch();
  const uid = useId();
  const {items} = useSelector(store => store.cart)
  const { state } = useLocation();
  const { item } = state;
  const [amount, setAmount] = useState(1);
  const { product_id, price, product_name, seller_id, category_id, quantity } = item;
  console.log(items);
  const handleDecrease = () => {
    if (amount > 1) setAmount(amount - 1);
  };

  const handleIncrease = () => {
    setAmount(amount + 1);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "api/cart/add",
        {
          uid,
          seller_id,
          product_id,
          product_name,
          price,
          quantity,
        },
        dispatch(addItem(response))
    )
    } catch (err) {
      dispatch(setError(err))
    } finally {
      dispatch(setLoading(false))
    }
    if(quantity < amount) return;
    const cart_item = { product_id, price, amount, product_name, seller_id, category_id };
    dispatch(addItem(cart_item))
  }

  return (
    <div className="flex flex-col md:flex-col items-center justify-center md:justify-between p-6 max-w-4xl mx-auto space-y-6 md:space-y-0">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center m-6 mb-8">
        <img
          src="https://via.placeholder.com/400x300"
          alt="Product"
          className="w-full max-w-md h-auto rounded-md shadow-lg"
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 flex flex-col space-y-4 px-4 md:px-0">
        {/* Product Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          {item.product_name}
        </h1>

        {/* Product Description */}
        <p className="text-gray-600 text-2xl">
          This is a detailed description of the product. It gives information
          about the product`s features, benefits, and usage.
        </p>

        {/* Amount Setter */}
        <div className="flex items-center justify-center space-x-4">
          <p className="font-semibold text-lg">{item.price}৳</p>
          <button
            onClick={handleDecrease}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            -
          </button>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-16 text-center p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
            min="1"
          />
          <button
            onClick={handleIncrease}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            +
          </button>
          <button
            onClick={handleSubmit}
            className="bg-lime-400 text-md md:text-xl lg:text-2xl p-2 rounded-xl">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
