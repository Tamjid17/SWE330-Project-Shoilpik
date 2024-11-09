import { useDispatch } from "react-redux";
import { setToggle } from "@/features/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(setToggle(false));
  }

  return (
    <div className="fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg p-6 z-50 overflow-y-auto transition-transform transform">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Cart</h2>
        <button
          onClick={handleClose}
          className="text-gray-500 text-2xl hover:text-red-500 transition-colors"
        >
          &times;
        </button>
      </div>
      <div className="space-y-4">
        {/* Add cart item elements here */}
        <p className="text-gray-700">No items in the cart yet!</p>
      </div>
      <div className="mt-6 border-t pt-4">
        <button className="w-full bg-lime-500 text-white py-2 rounded-lg hover:bg-lime-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
