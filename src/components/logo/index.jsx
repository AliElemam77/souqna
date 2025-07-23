import React from "react";
import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to={"/"} className="logo text-black font-extrabold text-3xl">
      Sou
      <span className="text-yellow-500 font-extrabold text-2xl">ق</span>
      na
    </NavLink>
  );
}
