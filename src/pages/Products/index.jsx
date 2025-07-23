import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Filter, SortAsc } from "lucide-react";
import ProductCard from "../../components/product";
import { getAllProducts } from "../../redux/slice/productssSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch]);

  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter((category) => category && typeof category === "string")
      ),
    ];
    return uniqueCategories;
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    let filtered = products.filter((product) => {
      const matchesSearch =
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesPrice =
        (priceRange.min === "" ||
          product.price >= parseFloat(priceRange.min)) &&
        (priceRange.max === "" || product.price <= parseFloat(priceRange.max));

      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "name":
          aValue = a.title?.toLowerCase() || "";
          bValue = b.title?.toLowerCase() || "";
          break;
        case "price":
          aValue = a.price || 0;
          bValue = b.price || 0;
          break;
        case "rating":
          aValue = a.rating?.rate || 0;
          bValue = b.rating?.rate || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy, sortOrder]);

  const renderSkeleton = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse border rounded-lg p-4 shadow-sm h-[350px] flex flex-col"
      >
        <div className="bg-gray-300 h-48 w-full mb-4 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded mt-auto"></div>
      </div>
    ));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange({ min: "", max: "" });
    setSortBy("name");
    setSortOrder("asc");
  };

  return (
    <div className="container mx-auto p-4">
      {error && (
        <p className="text-red-500 text-center mb-4">
          Something went wrong. Please try again.
        </p>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category
                    ? category.charAt(0).toUpperCase() + category.slice(1)
                    : "Unknown Category"}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min price"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, min: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max price"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, max: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        {/* Clear Filters & Results Count */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={clearFilters}
            className="text-yellow-600 hover:text-yellow-800 font-medium"
          >
            Clear All Filters
          </button>
          <span className="text-gray-600">
            {loading
              ? "Loading..."
              : `${filteredAndSortedProducts.length} products found`}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? renderSkeleton()
          : filteredAndSortedProducts.length > 0
          ? filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : !loading && (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  No products found
                </div>
                <p className="text-gray-400">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
      </div>
    </div>
  );
}
