import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [cartitems, setCartItems] = useState(getDefaultCart());
  const [all_products, setAll_products] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/v1/all-products`)
      .then((res) => res.json())
      .then((data) => setAll_products(data));

    if (localStorage.getItem("auth_token")) {
      fetch(`${import.meta.env.VITE_BASE_URL}/v1/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          auth_token: `${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth_token")) {
      fetch(`${import.meta.env.VITE_BASE_URL}/v1/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          auth_token: `${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth_token")) {
      fetch(`${import.meta.env.VITE_BASE_URL}/v1/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          auth_token: `${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartitems) {
      if (cartitems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartitems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalCount = 0;
    for (const item in cartitems) {
      totalCount += cartitems[item];
    }
    return totalCount;
  };

  const contextValue = {
    all_products,
    cartitems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
