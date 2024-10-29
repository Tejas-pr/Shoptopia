import React from "react";
import { Link } from "react-router-dom";
import Addproduct from "../assets/addproduct.svg";
import listproduct from "../assets/productlist.svg";

const Slidebar = () => {
  return (
    <>
      <div className="py-7 flex justify-center gap-x-1 gap-y-5 w-full bg-white sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6">
        <Link to={"/add-product"}>
          <button className="flexCenter gap-2 rounded-md bg-primary h-14 w-44 medium-16 xs:w-44">
            <img src={Addproduct} alt="add product" width={55} height={55} />
            <span>Add Product</span>
          </button>
        </Link>
        <Link to={"/listproduct"}>
          <button className="flexCenter gap-2 rounded-md bg-primary h-14 w-44 medium-16 xs:w-44">
            <img src={listproduct} alt="add product" width={45} height={45} />
            <span>Product List</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Slidebar;
