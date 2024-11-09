import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOneProduct } from '@/features/oneProductSlice';
import { useEffect } from 'react';

function ProductOverview() {
  const { product_id } = useParams();
  const dispatch = useDispatch();

  // Get the product, status, and error from the Redux store
  const product = useSelector((state) => state.oneProducts.product);
  const productStatus = useSelector((state) => state.oneProducts.status);
  const error = useSelector((state) => state.oneProducts.error);

  // Fetch the product data when the component mounts
  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchOneProduct(product_id));
    }
  }, [dispatch, product_id, productStatus]);

  // Show loading while the product is being fetched
  if (productStatus === 'loading') {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  // Handle any errors
  if (productStatus === 'failed') {
    return <div className="text-center text-xl text-red-600">Error: {error}</div>;
  }

  // If product is not found, show a message
  if (!product) {
    return <div className="text-center text-xl text-red-600">Product not found.</div>;
  }

  return (
    <div className="flex justify-center py-10 bg-gray-100">
      <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-8">
        {/* Product Image */}
        <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
          <img
            src={product.image}
            alt={product.product_name}
            className="rounded-lg shadow-lg max-h-[400px] object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-2/3 ml-0 md:ml-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{product.product_name}</h1>
            <p className="text-xl font-semibold text-red-600 mb-6">Price: {product.price} Tk</p>
            <p className="text-gray-600 text-lg mb-6">{product.description} Lorem ipsum dolor sit, 
              amet consectetur adipisicing elit. Odio, molestiae? Dicta deleniti facilis libero, 
              laboriosam suscipit quasi sint autem architecto minus tenetur tempore dolores quos! 
              Rerum modi accusantium adipisci explicabo!</p>
          </div>

          <div className="mt-auto flex gap-6 ml-auto">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Add to Cart
            </button>
            <button className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ProductOverview;
