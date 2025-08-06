import React from "react";
import ProductCard from "../shared/cards/product-card";

const PopularProducts = () => {
  return (
    <div className="container mt-16">
      <div className=" bg-white p-6 rounded-lg">
        <div className=" mb-12 flex items-center justify-between">
          <div className="hidden lg:block"></div>
          <h2 className="text-2xl md:text-4xl font-bold text-center tracking-wide font-cinzel">
            Most popular
          </h2>

          <button className="text-purple-500">See All</button>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-[24px]">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
