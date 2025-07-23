import React from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";
import Footer from "../footer";
import ScrollToTop from "../../utils/scrollToTop"; 

export default function Layout() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}
