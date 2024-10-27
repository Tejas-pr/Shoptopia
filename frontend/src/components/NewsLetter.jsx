import React from "react";

const NewsLetter = () => {
  return (
    <>
      <section className="mx-auto px-6 lg:px-20; py-12 xl:py-28 bg-white dark:bg-[#1E201E] dark:text-white">
        <div className="mx-auto xl:w-[80%] flexCenter flex-col gap-y-8 w-full max-w-[666px]">
          <h3 className="h3">Get Exclusive Deals on Your Email</h3>
          <h4 className="uppercase bold-18">Subscribe to our newsletter and stay updated</h4>
          <div className="flexBetween rounded-full ring-1 hover:ring-slate-900/10 bg-primary w-full max-w-[588px]">
            <input type="email" placeholder="Your email address" className="w-full bg-transparent ml-7 border-none outline-none regular-16 dark:text-black" />
            <button className="btn_dark_rounded dark:">Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
