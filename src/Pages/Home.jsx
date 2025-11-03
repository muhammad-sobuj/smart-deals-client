import React, { Suspense } from "react";
import LatestProducts from "../components/LatestProducts";



const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading...................</p>}>
        <LatestProducts
          latestProductsPromise={latestProductsPromise}
        ></LatestProducts>
      </Suspense>
    </div>
  );
};

export default Home;
