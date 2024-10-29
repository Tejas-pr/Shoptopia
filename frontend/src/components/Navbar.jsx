import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ containerStyle }) => {
  return (
    <>
      <nav className={`${containerStyle}`}>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active_link" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to={"/mens"}
          className={({ isActive }) => (isActive ? "active_link" : "")}
        >
          Mens
        </NavLink>
        <NavLink
          to={"/womens"}
          className={({ isActive }) => (isActive ? "active_link" : "")}
        >
          Womens
        </NavLink>
        <NavLink
          to={"/kids"}
          className={({ isActive }) => (isActive ? "active_link" : "")}
        >
          Kids
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;
