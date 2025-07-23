import React from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";
import Footer from "../footer";
import ScrollToTop from "../../utils/scrollToTop";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
