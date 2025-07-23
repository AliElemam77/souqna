import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../components/loader";
import NotFound from "../pages/NotFound";
const Layout = React.lazy(() => import("../components/layout"));
const Home = React.lazy(() => import("../pages/Home"));
const Cart = React.lazy(() => import("../pages/Cart"));
const Products = React.lazy(() => import("../pages/Products"));
const ProductDetails = React.lazy(() => import("../pages/ProductDetails"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default router;
