import React from 'react'
import { useNavigate } from "react-router-dom";

function ProductCard() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products`);
  };
  //add to cart logic
  return (
    <div className=" w-40 md:w-55 lg:w-60 bg-base-100 shadow-xl m-2 mb-2 md:mb-4 lg:mb-6 lg:mx-4 cursor-pointer transition-transform transform hover:scale-105"
    onClick={handleCardClick}>
      <figure className="px-10 pt-10">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Shoes!</h2>
        <p>400 Tk</p>
        <div className="card-actions">
          <button className="btn btn-primary bg-lime-400 p-1 rounded-sm">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard