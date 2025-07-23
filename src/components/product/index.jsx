import React from "react";
import { Star } from "lucide-react";
import { addToCart } from "../../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ProductCard({ product, loading }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.nameEn} added to cart!`);
  };
  if (loading) {
    return (
      <div className="w-full max-w-xs h-[450px] animate-pulse rounded-2xl bg-white shadow p-4 space-y-4">
        <div className="h-40 bg-gray-200 rounded-xl" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-full" />
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.id}`);
      }}
      className="group relative block cursor-pointer overflow-hidden w-full max-w-xs h-[550px] rounded-xl shadow hover:shadow-lg transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
      />

      <div className="relative border border-gray-100 bg-white p-4 sm:p-6 h-[calc(100%-256px)] flex flex-col justify-between">
        <div>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {product.description || "No description available."}
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-lg font-semibold text-gray-900">
            ${product.price}
          </p>

          <div className="flex space-x-1 justify-start sm:justify-end">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(product.rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
          </div>
        </div>

        <button
          onClick={() => handleAddToCart()}
          className="mt-4 block w-full rounded bg-yellow-400 text-white p-3 text-sm font-medium transition hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
