import React from "react";
import { POPULAR } from "../assets/data";
import Item from "./Item";

const Popular = () => {
  return (
    <>
      <section>
        <div>
          <h3>Popular Products</h3>
          <hr />
          {/* container */}
          <div>
            {POPULAR.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                new_price={item.new_price}
                old_price={item.old_price} 
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Popular;
