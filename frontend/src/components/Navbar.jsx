import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ containerStyle }) => {
  return (
    <>
      <nav className={`${containerStyle}`}>
        {/* <NavLink
          className={`${containerStyle} relative inline-block text-gray-800 dark:text-white transition-all duration-500 ease-linear
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-500 hover:after:w-full`}
          to={"/"}
        >
          Home
        </NavLink> */}
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
