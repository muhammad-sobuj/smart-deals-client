import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/allProducts", {})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);
  return (
    <div className="container mx-auto">
      <h2>Products: {products.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 hover:scale-105 transition duration-300 shadow-sm">
            <figure className="px-4 pt-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-cover rounded-t-xl"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>
                Price: ${product.price_min}/{product.price_max}
              </p>
              <div className="card-actions">
                <Link
                  to={`/productDetails/${product._id}`}
                  className="btn btn-primary w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
