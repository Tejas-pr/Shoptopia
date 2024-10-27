import React from "react";

const ProductDescription = () => {
  return (
    <>
      <div className="mt-20">
        <div className="flex gap-3 mb-4">
          <button className="btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36 dark:hover:bg-slate-200 dark:hover:text-black">
            Description
          </button>
          <button className="btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36 dark:hover:bg-slate-200 dark:hover:text-black">
            Care Guide
          </button>
          <button className="btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36 dark:hover:bg-slate-200 dark:hover:text-black">
            Size Guide
          </button>
        </div>
        <div className="flex flex-col pb-16">
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repudiandae vitae omnis culpa consequuntur harum modi, tempora odio
            sit fugit. Reprehenderit id amet explicabo sequi? Nulla ad debitis
            reprehenderit, aliquid commodi adipisci, consequatur ipsam ab sit
            sunt dolor repellendus odio laboriosam reiciendis explicabo dolorum
            ullam labore. Molestias architecto corrupti deleniti exercitationem
            temporibus voluptatem ratione eum. Vel expedita assumenda quidem
            nihil voluptatem a culpa debitis, nisi ipsa! Soluta eveniet sequi
            tempore magnam!
          </p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            repudiandae voluptatum nemo fugiat voluptatibus, labore magni esse
            commodi omnis reiciendis maxime voluptate unde dolorem dolorum
            excepturi dolores. Modi aperiam a in saepe cumque quae perspiciatis
            necessitatibus soluta vero. Iste amet velit optio iusto ut fugit
            labore eum provident, reiciendis quam molestias quis. Suscipit
            delectus sapiente voluptate pariatur voluptas commodi eveniet.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
