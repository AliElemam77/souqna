import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex gap-x-2">
        <div className="w-5 h-5 rounded-full bg-amber-200 animate-bounce" />
        <div className="w-5 h-5 rounded-full bg-amber-400 animate-bounce" />
        <div className="w-5 h-5 rounded-full bg-amber-600 animate-bounce" />
      </div>
    </div>
  );
};

export default Loader;
