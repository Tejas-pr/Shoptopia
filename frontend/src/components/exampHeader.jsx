import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoNav from "../assets/LOGO.png";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { CgDarkMode } from "react-icons/cg";
import { MdMenu, MdClose } from "react-icons/md";

const Header = ({ isOn, setIsOn }) => {
  const toggleSwitch = () => setIsOn(!isOn);
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 m-auto max_padd_container w-full shadow-sm bg-white ring-1 ring-slate-900/5 z-10 dark:bg-slate-900 dark:shadow-sm shadow-white">
        <div className="px-4 flexBetween py-3 max-xs:px-2 dark:text-white">
          {/* logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Link to="/" className="flex">
              <img src={LogoNav} alt="Logo" width={50} />
              <span className="mt-2 font-bold">Shoptopia</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Navbar
              containerStyle={"hidden md:flex gap-x-5 x':gap-x-10 medium-15"}
            />
            {/* navbar mobile */}
            <Navbar
              containerStyle={`${
                menuOpened
                  ? "flex item-start flex-col gap-y-12 fixed top-20 right-8 p-12 rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 text-black"
                  : "flex item-start flex-col gap-y-12 fixed top-20 p-12 rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 text-black -right-[100%]"
              }`}
            />
            <div>{!menuOpened ? <MdMenu /> : <MdClose />}</div>
          </motion.div>
          <div>
            <div className="flex flexCenter flex-col md:flex-row md:gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Sign In
                  </span>
                </motion.button>
              </motion.div>

              <div className="">
                <label
                  htmlFor="check"
                  className={`flex bg-gray-100 w-14 h-8 rounded-full cursor-pointer fixed top-4 right-4 ${
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
