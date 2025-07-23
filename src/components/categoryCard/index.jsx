import React from "react";

const CategoryCard = ({ category }) => (
  <div className="group cursor-pointer">
    <div className="w-[140px] h-[170px] bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl p-4 border hover:border-blue-200 transform hover:-translate-y-2">
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <h3 className="text-sm text-center font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
        {category.nameEn}
      </h3>
      <div className="mt-2 flex justify-center">
        <div className="w-8 h-0.5 bg-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </div>
    </div>
  </div>
);

export default CategoryCard;
