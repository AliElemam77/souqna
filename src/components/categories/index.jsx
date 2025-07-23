import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/slice/categoriesSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import CategoryCard from "../categoryCard";
import Header from "../header";

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories]);

  const SkeletonCard = () => (
    <div className="min-w-[140px] w-[140px] h-[180px] bg-white shadow-lg rounded-xl p-4 animate-pulse border">
      <div className="w-full h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-3 animate-pulse"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
      <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded w-1/2 mx-auto animate-pulse"></div>
    </div>
  );

  return (
    <div className="Categories px-4 py-8 ">
      <div className="max-w-7xl mx-auto">
        <Header
          title={"Trending Categories"}
          subTitle={
            "Explore the latest categories in our store to find what you love!"
          }
        />
        {loading ? (
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">{error}</div>
            <button
              onClick={() => dispatch(getAllCategories())}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        ) : categories.length > 0 ? (
          <Swiper
            spaceBetween={16}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={categories.length > 3}
            modules={[Autoplay]}
            className="categories-swiper"
            breakpoints={{
              320: {
                slidesPerView: 2.4,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 2.2,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 3.2,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 4.2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 5.5,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 6.5,
                spaceBetween: 18,
              },
              1536: {
                slidesPerView: 7.5,
                spaceBetween: 20,
              },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <CategoryCard category={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              No categories available
            </div>
            <button
              onClick={() => dispatch(getAllCategories())}
              className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
