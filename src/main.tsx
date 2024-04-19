import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import App from "./App";
// import ProductList from "./Pages/ProductList";
// import Cart from "./Pages/Cart";
// import AboutUs from "./Pages/AboutUs";

const Cart = React.lazy(() => import("./Pages/Cart"));
const AboutUs = React.lazy(() => import("./Pages/AboutUs"));
const ProductList = React.lazy(() => import("./Pages/ProductList"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
