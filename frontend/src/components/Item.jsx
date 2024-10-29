import React from "react";
import { Link } from "react-router-dom";
import itemSearch from "../assets/itemSearch.svg";
import { motion } from "framer-motion";

const Item = ({ id, name, image, old_price, new_price }) => {
  return (
    <>
      <motion.div
        whileHover={{ scale: [null, 1.1, 1.0] }}
        transition={{ duration: 0.9 }}
      className="rounded-xl overflow-hidden shadow-lg dark:shadow-slate-800 bg-[#F6F5F2] dark:bg-[#181C14]">
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 0 },
            visibility: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visibility"
          transition={{ duration: 0.7, delay: 0.2 }}
        className="relative flexCenter group overflow-hidden transition-all duration-100">
          <Link
            to={`/product/${id}`}
            className="h-12 w-12 bg-white rounded-full flexCenter absolute top-1/2 bottom-1/2 !py-2 z-20 scale-0 group-hover:scale-100 transition-all duration-700"
          >
            <img
              src={itemSearch}
              alt="Search Item"
              className=" hover:scale-125 transition-all duration-200"
            />
          </Link>
          <Link to={`/product/${id}`}>
            <img
              onClick={window.scrollTo(0, 0)}
              src={image}
              alt="productImage"
              className="w-full block object-cover group-hover:scale-110 transition-all duration-1000"
            />
          </Link>
        </motion.div>
        <div className="p-4 overflow-hidden">
          <Link to={`/product/${id}`}>
            <h4 className="my-[6px] meduim-16 line-clamp-2 text-gray-30">
              {name}
            </h4>
          </Link>
          <div className="flex gap-5">
            <div className="bold-16 dark:text-white">{new_price}.00</div>
            <div className="text-secondary bold-16 line-through">
              {old_price}.00
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Item;
