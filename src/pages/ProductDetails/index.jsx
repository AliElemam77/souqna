import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/slice/productDetailsSlice";
import { addToCart } from "../../redux/slice/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="container mx-auto my-10 p-5 bg-slate-100 rounded-md shadow-md animate-pulse">
        <div className="flex flex-col md:flex-row md:space-x-10">
          {/* قسم الصور */}
          <div className="md:flex-1 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 overflow-x-auto md:overflow-x-visible max-w-full">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 bg-gray-300 rounded-md"></div>
              ))}
            </div>
            <div className="flex-1 bg-gray-300 rounded-md max-h-[400px] h-64"></div>
          </div>

          {/* تفاصيل المنتج */}
          <div className="md:flex-1 mt-6 md:mt-0 space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-10 bg-gray-300 rounded w-40"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto my-10 p-5 bg-slate-100 rounded-md shadow-md">
      <div className="flex flex-col md:flex-row md:space-x-10">
        {/* Section الصور */}
        <div className="md:flex-1 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          {/* الصور المصغرة */}
          <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 overflow-x-auto md:overflow-x-visible max-w-full">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} thumbnail ${idx + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`cursor-pointer rounded-md border-2 ${
                  selectedImage === img
                    ? "border-blue-600"
                    : "border-transparent hover:border-gray-400"
                } w-20 h-20 object-cover flex-shrink-0`}
              />
            ))}
          </div>

          {/* الصورة الكبيرة */}
          <div className="flex-1 flex justify-center md:justify-start">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="rounded-md shadow-lg max-w-full max-h-[400px] object-contain"
            />
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="md:flex-1 mt-6 md:mt-0">
          <h1 className="text-3xl font-extrabold mb-4">
            {product.nameEn} - {product.name}
          </h1>
          <p className="text-lg mb-4">{product.description}</p>

          <div className="mb-3">
            <span className="text-2xl font-bold text-green-700">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-gray-500 line-through ml-3">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="mb-3 text-md font-medium">
            Category:{" "}
            <span className="text-gray-700">
              {product.category?.name || "-"}
            </span>
          </div>

          <div className="mb-3 text-sm text-gray-600">
            {product.tags?.length > 0 ? (
              <>Tags: {product.tags.join(", ")}</>
            ) : (
              <>No tags available</>
            )}
          </div>

          <div className="mb-6">
            <span className="text-yellow-500 font-semibold">
              Rating: {product.rating} / 5
            </span>
          </div>

          <button
            className="bg-yellow-400 text-white px-6 py-3 rounded-md hover:bg-yellow-700 transition duration-300"
            onClick={() => handleAddToCart()}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
