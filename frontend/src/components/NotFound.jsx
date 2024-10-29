import React from "react";
import Error from "../assets/404error.svg";

const NotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black overflow-hidden">
        <img
          src={Error}
          alt="Not found"
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
};

export default NotFound;
