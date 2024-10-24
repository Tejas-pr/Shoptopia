import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoNav from "../assets/LOGO.png";
import logout from "../assets/logout.svg";
import user from "../assets/user.svg";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { CgDarkMode } from "react-icons/cg";
import { MdMenu, MdClose } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";

const Header = ({ isOn, setIsOn }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const toggleSwitch = () => setIsOn(!isOn);
  return (
    <>
      <header className="fixed top-0 left-0 m-auto w-full bg-white ring-1 ring-slate-900 z-10 dark:bg-slate-900 dark:shadow-sm shadow-white dark:text-white">
        <div className="px-4 flexBetween py-3 max-xs:px-2">
          <div>
            <Link>
              <img src={LogoNav} alt="" width={55} />
            </Link>
          </div>
          <Navbar
            containerStyle={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"}
          />
          {/* navbar mobile */}
          <Navbar
            containerStyle={`${
              menuOpened
                ? "flex item-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
                : "flex item-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"
            }`}
          />
          <div className="flexBetween sm:gap-x-3 bold-16">
            {!menuOpened ? (
              <MdMenu
                className="md:hidden cursor-pointer hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full"
                onClick={toggleMenu}
              />
            ) : (
              <MdClose
                className="md:hidden cursor-pointer hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full"
                onClick={toggleMenu}
              />
            )}
            <div className="flex flexBetween sm:gap-x-6">
              <div className="flex flexCenter gap-x-3">
                <NavLink to={"cart-page"} className={"flex"}>
                  <FaOpencart className="p-1 h-8 w-8 ring-slate-900/30 ring-1 rounded-full" />
                  <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-2">
                    0
                  </span>
                </NavLink>
                {/* <NavLink to={'logout'} className={"btn_secondary_rounded flexCenter gap-x-2 medium-16"}>
                <img src={logout} alt="Logout" height={19} width={19}/>Logout
              </NavLink> */}
                <NavLink
                  to={"login"}
                  className={
                    "btn_secondary_rounded flexCenter gap-x-2 medium-16"
                  }
                >
                  <img src={user} alt="userIcon" height={19} width={19} />
                  Login
                </NavLink>
              </div>

              <div className="ml-20">
                <label
                  htmlFor="check"
                  className={`flex w-14 h-8 mt-1 rounded-full cursor-pointer fixed top-4 right-4 bg-slate-500 ${
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
      </header>
    </>
  );
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default Header;
