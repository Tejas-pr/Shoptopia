import React from "react";
import { Link } from "react-router-dom";

const Item = ({ id, name, image, old_price, new_price }) => {
  return (
    <>
      <div>
        <div>
          <Link to={`/product/${id}`}></Link>
          <img src={image} alt="productImage" />
        </div>
        <div>
            <h4>{name}</h4>
            <div>
                <div>{old_price}</div>
                <div>{new_price}</div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Item;
