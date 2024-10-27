import { useContext } from "react";
import Product_rt_1 from "../assets/product_rt_1.png";
import Product_rt_2 from "../assets/product_rt_2.png";
import Product_rt_3 from "../assets/product_rt_3.png";
import Product_rt_4 from "../assets/product_rt_4.png";
import { MdStar } from "react-icons/md";
import { ShopContext } from "../context/ShapContext";
const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  return (
    <>
      <section className="">
        <div className="flex flex-col gap-14 xl:flex-row">
          {/* left side  */}
          <div className="flex gap-x-2 xl:flex-1">
            <div className="flex flex-col gap-[7px] flex-wrap">
              <img
                src={Product_rt_1}
                alt="productImg"
                className="max-h-[99px]"
              />
              <img
                src={Product_rt_2}
                alt="productImg"
                className="max-h-[99px]"
              />
              <img
                src={Product_rt_3}
                alt="productImg"
                className="max-h-[99px]"
              />
              <img
                src={Product_rt_4}
                alt="productImg"
                className="max-h-[99px]"
              />
            </div>
            <div>
              <img src={product.image} alt="" />
            </div>
          </div>
          {/* right side  */}
          <div className="flex flex-col xl:flex-[1.8]">
            <h3 className="h3">{product.name}</h3>
            <div className="flex gap-x-2 text-secondary meduim-22">
              <MdStar />
              <MdStar />
              <MdStar />
              <MdStar />
              <p>(111)</p>
            </div>
            <div className="flex gap-x-6 medium-20 my-4">
              <div className="line-through">{product.old_price}</div>
              <div className="text-secondary">{product.new_price}</div>
            </div>
            <div>
              <h4 className="bold-16">Select Size: </h4>
              <div className="flex gap-3 my-3">
                <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer dark:ring-slate-200">
                  S
                </div>
                <div className="ring-2 ring-slate-900/15 h-10 w-10 flexCenter cursor-pointer dark:ring-slate-200/15">
                  M
                </div>
                <div className="ring-2 ring-slate-900/15 h-10 w-10 flexCenter cursor-pointer dark:ring-slate-200/15">
                  L
                </div>
                <div className="ring-2 ring-slate-900/15 h-10 w-10 flexCenter cursor-pointer dark:ring-slate-200/15">
                  XL
                </div>
              </div>
              <div className="flex flex-col gap-y-3 mb-4 max-w-[555px]">
                <button 
                    onClick={() => addToCart(product.id)}
                className="btn_dark_outline !rounded-none uppercase regular-14 tracking-widest dark:text-white dark:hover:bg-white dark:hover:text-black">
                  Add to card
                </button>
                <button className="btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest dark:bg-white dark:text-black">
                  Buy it now
                </button>
              </div>
              <p>
                <span className="medium-16 text-tertiary dark:text-white">
                  Category :
                </span>{" "}
                Women | Jacket | Winter
              </p>
              <p>
                <span className="medium-16 text-tertiary dark:text-white">
                  Tags :
                </span>{" "}
                Modern | Latest
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDisplay;
