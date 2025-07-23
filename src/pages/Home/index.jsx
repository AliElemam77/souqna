import React, { useEffect } from "react";
import HeroSection from "../../components/hero";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/slice/categoriesSlice";
import Categories from "../../components/categories";
import Products from "../../components/products";
import Timeline from "../../components/Timeline";

export default function Home() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, [dispatch]);
  return (
    <div className="container">
      <HeroSection />
      <Categories />
      <Timeline />
      <Products />
    </div>
  );
}
