import React from 'react'
function Products() {
  return (
    <div className=" w-40 md:w-55 lg:w-60 bg-base-100 shadow-xl m-2 mb-2 md:mb-4 lg:mb-6 lg:mx-4">
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

export default Products