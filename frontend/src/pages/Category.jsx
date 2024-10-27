import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import all_products from "../assets/all_products";
import Item from "../components/Item";

const Category = ({ category, banner }) => {
  return (
    <>
      <section className="mx-auto px-6 lg:px-20 py-12 xl:py-28 dark:bg-[#1E201E]">
        <div>
          <div>
            <img src={banner} alt="" className="block my-7 mx-auto" />
          </div>
          <div>
            <h5 className="dark:text-white">
              <span className="font-bold dark:text-white">Showing 1-12</span> out of 36 products
            </h5>
            <div className="flexBetween max-sm:p-4 gap-x-4 px-8 py-3 mt-5 mb-10 rounded-5xl ring-1 ring-slate-900/15 dark:ring-slate-300/15 dark:text-white">
              Sort by <MdOutlineKeyboardArrowDown />{" "}
            </div>
          </div>
          {/* container  */}
          <div className="grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {all_products.map((item) => {
              if (category === item.category) {
                return (
                  <Item
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    new_price={item.new_price}
                    old_price={item.old_price}
                  />
                );
              }
            })}
          </div>
          <div className="mt-16 text-center">
            <button className="btn_dark_rounded">Load more</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
