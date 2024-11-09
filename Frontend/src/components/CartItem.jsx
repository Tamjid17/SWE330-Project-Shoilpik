import { deleteCartItem } from "@/features/cartSlice";
import { useDispatch } from "react-redux";

function CartItem({ item }) {

    const { product_name, price, quantity, cart_id } = item;
    const dispatch = useDispatch();
  function handleRemove() {
    dispatch(deleteCartItem(cart_id));
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{product_name}</h3>
        <p className="text-gray-500">Price: {price}৳</p>
        <p className="text-gray-500">Quantity: {quantity}</p>
      </div>
      <button
        onClick={handleRemove}
        className="text-red-500 text-xl hover:text-red-700 transition-colors"
      >
        &times;
      </button>
    </div>
  );
}

export default CartItem;
