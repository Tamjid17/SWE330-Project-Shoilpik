import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { useNavigate } from "react-router-dom";

function ProductCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [visibleProducts, setVisibleProducts] = useState(8); 

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleCardClick = (product_id) => {
    navigate(`/products/${product_id}`);
    console.log(product_id);
  };

  

  const handleSeeMore = () => {
    setVisibleProducts(products.length); // Show all products when 'See More' is clicked
  };

  // Show loading message while fetching
  if (productStatus === 'loading') {
    return <p>Loading products...</p>;
  }

  // Show error message if there's an error fetching data
  if (productStatus === 'failed') {
    return <p>Error: {error}</p>;
  }

  console.log('Products:', products);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.slice(0, visibleProducts).map((product, index) => (
            <div 
              key={product.id || index} 
              className="group cursor-pointer" 
              onClick={() => handleCardClick(product.product_id)}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img 
                  src={product.image || 'placeholder-image.jpg'} 
                  alt={product.description || product.product_name} 
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.product_name || 'Unnamed Product'}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price != null ? `${product.price} Tk` : 'Price not available'}
              </p>
            </div>
          ))}
        </div>

        {visibleProducts < products.length && (
          <button 
            onClick={handleSeeMore} 
            className="mt-6 text-blue-600 hover:underline"
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
