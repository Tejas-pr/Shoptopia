import React, { useContext } from "react";
import { ShopContext } from "../context/ShapContext";
import ProductHd from "../components/ProductHd";
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay";
import ProductDescription from "../components/ProductDescription";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { all_products } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_products.find((e) => e.id === Number(productId));
  if (!product) {
    return <div>Product Not Found!</div>;
  }
  return (
    <>
      <section className="max_padd_container_No py-28 dark:bg-[#1E201E] dark:text-white">
        <div>
          <ProductHd product={product} />
          <ProductDisplay product={product} />
          <ProductDescription />
          <RelatedProducts />
        </div>
      </section>
    </>
  );
};

export default Product;
