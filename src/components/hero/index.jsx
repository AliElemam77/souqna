import React, { useState, useEffect } from "react";

export default function HeroSection() {
  const products = [
    {
      src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      alt: "Wireless Headphones",
    },
    {
      src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      alt: "Smart Watch",
    },
    {
      src: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1000&auto=format&fit=crop",
      alt: "Wireless Earbuds",
    },
    {
      src: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1000&auto=format&fit=crop",
      alt: "Gaming Laptop",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <div className="container  py-6 sm:py-8">
      <div className="relative bg-red-500 rounded-2xl sm:rounded-3xl overflow-hidden min-h-[500px] lg:min-h-[600px] xl:min-h-[500px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1609562234645-1b03f81c7653?q=80&w=687&auto=format&fit=crop"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl sm:rounded-3xl"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-6 sm:py-8 gap-10">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start flex-1 max-w-2xl">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight break-words">
              Welcome to Sou
              <span className="text-yellow-500">ق</span>
              na
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-md">
              Your one-stop destination for all your shopping needs!
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-lg shadow-lg transition-all">
              Shop Now
            </button>
          </div>

          <div className="w-[200px] xs:w-[220px] sm:w-[260px] md:w-[300px] lg:w-[350px] xl:w-[400px] aspect-square relative flex-shrink-0">
            {products.map((product, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={product.src}
                  alt={product.alt}
                  className="w-full h-full object-contain rounded-xl border border-white/20 shadow-lg bg-white/10 backdrop-blur-md"
                />
              </div>
            ))}

            <div className="absolute bottom-[-28px] left-1/2 transform -translate-x-1/2 flex space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentIndex
                      ? "bg-yellow-500 scale-110"
                      : "bg-white/50 hover:bg-white"
                  } transition-all`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl"></div>

        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              className="fill-white/10"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
