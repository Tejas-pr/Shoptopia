import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Toppage from "./pages/Toppage";
import NotFound from "./components/NotFound";

function App() {
  const [isOn, setIsOn] = useState(true);
  const [showToppage, setToppage] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if(hasVisited){
      setToppage(false);
    }else{
      setToppage(true);
    }
  }, []);
  return (
    <>
      {showToppage && <Toppage setToppage={setToppage}/>}
      {/* {!showToppage && <main className={`${isOn ? "dark" : "bg-white"}`}> */}
      {<main className={`${isOn ? "dark" : "bg-white"}`}>
        <BrowserRouter>
          <Header isOn={isOn} setIsOn={setIsOn}/>
          <Routes >
            <Route path="/" element={<Home/>} />
            <Route path="/mens" element={<Category/>} />
            <Route path="/womens" element={<Category/>} />
            <Route path="/kids" element={<Category/>} />
            <Route path="/product" element={<Product/>} > 
              <Route path=":productId" element={<Product/>}/>
            </Route>
            <Route path="/cart-page" element={<Cart/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/*" element={<NotFound/>} /> 
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>}
    </>
  );
}

export default App;
