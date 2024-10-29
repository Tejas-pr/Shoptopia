import React from "react";
import Slidebar from "../components/Slidebar";
import { Route, Routes } from "react-router-dom";
import Addproduct from "../components/Addproduct";
import Listproduct from "../components/Listproduct";

const Admin = () => {
  return (
    <>
      <div className="lg:flex">  
        <Slidebar />
        <Routes>
          <Route path="/add-product" element={<Addproduct />} />
          <Route path="/listproduct" element={<Listproduct />} />
        </Routes>
      </div>
    </>
  );
};

export default Admin;
