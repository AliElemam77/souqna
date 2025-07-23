import React from "react";

export default function Header({ title, subTitle }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title} </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      <p className="text-gray-600 mt-3">{subTitle}</p>
    </div>
  );
}
