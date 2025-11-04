import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./Layout/MainLayout.jsx";
import Home from "./Pages/Home.jsx";
import AllProducts from "./components/AllProducts.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import MyProducts from "./components/MyProducts.jsx";
import PrivateRoutes from "./Private/PrivateRoutes.jsx";
import MyBids from "./components/MyBids.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        // hydrateFallbackElement:
      },
      {
        path: "/allProducts",
        loader: ()=>fetch('http://localhost:3000/allProducts'),
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/productDetails/:id",
        loader:({params})=>fetch(`http://localhost:3000/products/${params.id}`),
        Component: ProductDetails,
      },
      {
        path: "/myProducts",
        element: (
          <PrivateRoutes>
            <MyProducts />
          </PrivateRoutes>
        ),
      },
      {
        path: "/myBids",
        element: (
          <PrivateRoutes>
            <MyBids />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
