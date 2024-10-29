import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      <section className="relative bg-hero bg-cover bg-center bg-no-repeat h-screen w-full">
        <div className="max_padd_container relative top-32 xs:top-52">
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 75 },
              visibility: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visibility"
            transition={{ duration: 0.5, delay: 0.5 }}
          className="h1 capitalize max-w-[40rem]">
            Discover Your Style at Shoptopia
          </motion.h1>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 75 },
              visibility: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visibility"
            transition={{ duration: 0.5, delay: 0.8 }}
          className="text-slate-600 regular-16 mt-6 max-w-[33rem]">
            Step into a world of fashion tailored just for you. From timeless
            essentials to the latest trends, explore a curated collection that
            celebrates every style and occasion. Elevate your wardrobe
            effortlessly at Shoptopia, your ultimate clothing destination.
          </motion.p>
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 75 },
              visibility: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visibility"
            transition={{ duration: 0.5, delay: 1 }}
          className="flexStart !items-center gap-x-4 my-10">
            <div 
            className="!regular-24 flexCenter gap-x-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="bold-16 sm:bold-20">
              176k{" "}
              <span className="regular-16 sm:regular-20">
                Excellent Reviews
              </span>
            </div>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 0 },
              visibility: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visibility"
            transition={{ duration: 1, delay: 1 }}
          className="max-xs:flex-col flex gap-2">
            <NavLink to={""} className={"btn_dark_rounded flexCenter"}>
              Shop now
            </NavLink>
            <NavLink to={""} className={"btn_dark_rounded flexCenter gap-x-2"}>
              {" "}
              <MdOutlineLocalOffer className="text-2xl" /> Offers
            </NavLink>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
