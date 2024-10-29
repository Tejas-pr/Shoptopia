import React, { useContext } from "react";
import { ShopContext } from "../context/ShapContext";
import { TbTrash } from "react-icons/tb";

const CartItems = () => {
  const { all_products, cartitems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  return (
    <>
      <section className="max_padd_container_No p-28 dark:bg-[#1E201E] dark:text-white">
        <table className="w-full mx-auto ">
          <thead>
            <tr className="bg-slate-900/10 regular-18 sm:regular-22 text-start py-12 dark:bg-slate-100/10">
              <th className="p-1 py-2">Products</th>
              <th className="p-1 py-2">Title</th>
              <th className="p-1 py-2">Price</th>
              <th className="p-1 py-2">Quantity</th>
              <th className="p-1 py-2">Total</th>
              <th className="p-1 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {all_products.map((e) => {
              if (cartitems[e.id] > 0) {
                return (
                  <tr
                    key={e.id}
                    className="border-b border-slate-900/20 p-6 medium-14 text-center dark:border-slate-100/20"
                  >
                    <td className="flexCenter">
                      <img
                        src={e.image}
                        alt="productImg"
                        height={43}
                        width={43}
                        className="rounded-lg ring-1 ring-slate-900/5 my-1"
                      />
                    </td>
                    <td>
                      <div className="line-clamp-3">{e.name}</div>
                    </td>
                    <td>${e.new_price}</td>
                    <td className="w-16 h-16 bg-white dark:bg-[#1E201E] dark:text-white">
                      {cartitems[e.id]}
                    </td>
                    <td>${e.new_price * cartitems[e.id]}</td>
                    <td>
                      <div className="bold-22 pl-14 hover:cursor-pointer">
                        <TbTrash onClick={() => removeFromCart(e.id)} />
                      </div>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
        {/* cart details  */}
        <div className="flex flex-col gap-20 my-16 p-8 md:flex-row rounded-md bg-white w-full max-w-[666px] dark:bg-[#343634] dark:text-white">
          <div className="flex flex-col gap-10">
            <h4 className="bold-20">Summary</h4>
            <div>
              <div className="flexBetwween py-4">
                <h4 className="medium-16">Subtotal :</h4>
                <h4 className="text-gray-30 font-semibold">${getTotalCartAmount()}</h4>
              </div>
              <hr className="dark:bg-white"/>
              <div className="flexBetween py-4">
                <h4 className="medium-16 ">Shipping Fee :</h4>
                <h4 className="text-gray-30 font-semibold">Free</h4>
              </div>
              <hr />
              <div className="flexBetwween py-4">
                <h4 className="bold-18">Total :</h4>
                <h4 className="bold-18">${getTotalCartAmount()}</h4>
              </div>
            </div>
            <button className="btn_dark_rounded w-44">Checkout</button>
            <div className="flex flex-col gap-10">
              <h4 className="bold-20 capitalize">
                Your coupon code enter here:
              </h4>
              <div className="flexBetween pl-5 h-12 bg-primary rounded-full ring-1 ring-slate-900/10">
                <input
                  className="bg-transparent border-none outline-none dark:text-black"
                  type="text"
                  placeholder="Coupon code"
                />
                <button className="btn_dark_rounded">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartItems;
