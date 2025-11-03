import React, { use } from "react";
import ProductCard from "./ProductCard";

const LatestProducts = ({ latestProductsPromise }) => {
  const latestProducts = use(latestProductsPromise);
  console.log(latestProducts);
  return (
    <div className="container mb-10 mx-auto">
      <h3 className=" text-center my-6 font-bold text-5xl">Recent <span className="text-primary">Products</span></h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
