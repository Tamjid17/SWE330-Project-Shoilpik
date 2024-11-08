import { useNavigate } from "react-router-dom";


function ProductCard({ item }) {
  const navigate = useNavigate();
  const { product_name, price } = item;

  const handleCardClick = () => {
    navigate(`/products`, { state: { item } });
  };
  //add to cart logic
  return (
    <div className=" w-40 md:w-55 lg:w-60 bg-base-100 shadow-xl m-2 mb-2 md:mb-4 lg:mb-6 lg:mx-4 cursor-pointer transition-transform transform hover:scale-105"
    onClick={handleCardClick}>
      <figure className="px-10 pt-10">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt=""
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{product_name}</h2>
        <p>{price}</p>
        <div className="card-actions">
          <button className="btn btn-primary bg-lime-400 p-1 rounded-sm">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard