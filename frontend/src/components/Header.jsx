import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoNav from "../assets/LOGO.png";
import logout from "../assets/logout.svg";
import user from "../assets/user.svg";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { CgDarkMode } from "react-icons/cg";
import { MdMenu, MdClose } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { isOnState } from "../state";
import { ShopContext } from "../context/ShapContext";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const [isOn, setIsOn] = useRecoilState(isOnState);
  const toggleSwitch = () => setIsOn(!isOn);
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <>
      <motion.header
        variants={{
          hidden: { opacity: 0 },
          visibility: { opacity: 1 },
        }}
        initial="hidden"
        animate="visibility"
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-[98%] sm:w-[95%] md:w-[79%] lg:w-[60%] xl:w-[50%] rounded-xl sm:rounded-xl bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(12,12,12,0.5)] shadow-lg z-10 dark:text-white"
      >
        <div className="px-4 flex justify-between items-center py-3 max-xs:px-2">
          <div className="md:mr-12">
            <Link to={"/"} className="flex items-center font-bold mr-2">
              <img
                src={LogoNav}
                alt=""
                width={55}
                className="hidden sm:block"
              />
              <h3 className="">Shoptopia</h3>
            </Link>
          </div>
          <Navbar
            containerStyle={
              "hidden md:flex gap-x-5 xl:gap-x-10 medium-15 ml-2 mr-10"
            }
          />
          {/* navbar mobile */}
          <Navbar
            containerStyle={`${
              menuOpened
                ? "flex item-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 dark:bg-[#1E201E] dark:text-white"
                : "flex item-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"
            }`}
          />
          <div className="flex justify-between items-center sm:gap-x-3 bold-16">
            {!menuOpened ? (
              <MdMenu
                className="md:hidden cursor-pointer hover:text-secondary ml-2 mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full"
                onClick={toggleMenu}
              />
            ) : (
              <MdClose
                className="md:hidden cursor-pointer hover:text-secondary ml-2 mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full"
                onClick={toggleMenu}
              />
            )}
            <div className="flex items-center sm:gap-x-6">
              <div className="flex items-center gap-x-3">
                <NavLink to={"cart-page"} className={"flex"}>
                  <FaOpencart className="p-1 h-8 w-8 rounded-full" />
                  <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-2">
                    {getTotalCartItems()}
                  </span>
                </NavLink>
                <NavLink
                  to={"login"}
                  className={
                    "px-5 py-2 bg-secondary rounded-full text-center flex items-center gap-x-0 md:btn_secondary_rounded"
                  }
                >
                  <img src={user} alt="userIcon" height={15} width={15} />
                  Login
                </NavLink>
                {/* Dark mode beside login */}
                <label
                  htmlFor="check"
                  className={`relative flex w-14 h-8 rounded-full cursor-pointer transition-colors ${
                    isOn ? "bg-[#DFF2EB]" : "bg-[#1A1A19]"
                  }`}
                >
                  <input
                    id="check"
                    type="checkbox"
                    className="sr-only peer"
                    checked={isOn}
                    onChange={toggleSwitch}
                  />
                  <motion.span
                    className="absolute inset-y-0 left-0 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md"
                    layout
                    transition={spring}
                    animate={{ x: isOn ? 22 : 0 }}
                  >
                    <CgDarkMode className="text-gray-600 text-lg" />
                  </motion.span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default Header;
