import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { isOnState } from "../state";
import search from "../assets/search_white.svg"

const Item = ({ id, name, image, old_price, new_price }) => {
  const [isOn] = useRecoilState(isOnState);
  return (
    <>
      <div className="rounded-xl overflow-hidden shadow-lg dark:shadow-slate-800 bg-[#F6F5F2] dark:bg-[#181C14]" >
        <div className="relative flexCenter group overflow-hidden transition-all duration-100">
          <Link
            to={`/product/${id}`}
            className="h-12 w-12 bg-white rounded-full flexCenter absolute top-1/2 bottom-1/2 !py-2 z-20 scale-0 group-hover:scale-100 transition-all duration-700"
          >
            {/* change icon for dark mode  */}
            {isOn ? <img src={search} alt=""  /> : <FaSearch className="hover:rotate-90 hover:scale-125 transition-all duration-200 dark:bg-slate-400"/>}
          </Link>
          <img onClick={window.scrollTo(0, 0)} src={image} alt="productImage" className="w-full block object-cover group-hover:scale-110 transition-all duration-1000"/>
        </div>
        <div className="p-4 overflow-hidden">
          <h4 className="my-[6px] meduim-16 line-clamp-2 text-gray-30">{name}</h4>
          <div className="flex gap-5">
            <div className="bold-16 dark:text-white">{new_price}.00</div>
            <div className="text-secondary bold-16 line-through">{old_price}.00</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
