import React, { use } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router";
import { motion } from "framer-motion";

const LatestProducts = ({ latestProductsPromise }) => {
  const latestProducts = use(latestProductsPromise);
  console.log(latestProducts);
  return (
    <div className="container mb-10 mx-auto">
      <h3 className=" text-center my-6 font-bold text-5xl">
        Recent <span className="text-primary">Products</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/allProducts"
          className="
            btn-primary
            text-white 
            px-10 py-4 
            rounded-2xl 
            font-semibold 
            text-lg 
            shadow-lg 
            transition 
            duration-300 
          "
        >
          See All Apps
        </Link>
      </div>
    </div>
  );
};

export default LatestProducts;
