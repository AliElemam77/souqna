// Products.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/slice/productssSlice";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductCard from "../product";

function ProductCardWrapper({ product, loading }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="w-full"
    >
      <ProductCard product={product} loading={loading} />
    </motion.div>
  );
}

export default function Products({ showAll = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch]);

  const skeletonCards = Array.from({ length: showAll ? 8 : 4 });
  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <section className="p-4">
      <Header
        title="Products"
        subTitle={
          showAll ? "Browse all our products" : "Check out our latest products"
        }
      />

      {loading && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {skeletonCards.map((_, index) => (
              <ProductCardWrapper key={index} loading={true} />
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {displayedProducts.map((p) => (
              <ProductCardWrapper key={p.id} product={p} loading={false} />
            ))}
          </div>

          {!showAll && (
            <div className="text-center mt-6">
              <button
                onClick={() => navigate("/products")}
                className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition duration-300 font-semibold text-lg shadow-lg"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
