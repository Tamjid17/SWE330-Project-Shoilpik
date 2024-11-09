import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/features/productSlice";

function Home() {
  const dispatch = useDispatch();
  const { items } = useSelector(store => store.products)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  console.log(items)
  return (
    <div className="flex">
      <div className="w-1/4 min-h-screen bg-lime-200">
        <div className="w-auto bg-cyan-200 h-8"></div>
        <div className="w-auto bg-green-400 h-12"></div>
        <div className="w-auto bg-cyan-400 h-12"></div>
        <div className="w-auto bg-green-400 h-12"></div>
        <div className="w-auto bg-cyan-400 h-12"></div>
        <div className="w-auto bg-green-400 h-12"></div>
        <div className="w-auto bg-cyan-400 h-12"></div>
        <div className="w-auto bg-green-400 h-12"></div>
      </div>
      <div className="w-3/4 min-h-screen  flex flex-wrap justify-center">
        <div className="relative w-full h-54 md:h-76 lg:h-[28rem]">
          <img
            className="w-full h-full object-cover"
            src=".\src\assets\Black White Handicraft Vlog YouTube Thumbnail in Illustrative Style.png"
            alt="Hero section image"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center w-full max-w-md px-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-3 rounded-l-md border border-gray-300 bg-white bg-opacity-70 text-black shadow-md focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <button className="absolute right-0 h-full px-4 py-2 bg-lime-400 text-black rounded-r-md hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-400">
                Search
              </button>
            </div>
          </div>
        </div>
        <div>{
          items.map((item) => <ProductCard item={item} key={item.product_id} />)
          }</div>
      </div>
    </div>
  );
}

export default Home;
