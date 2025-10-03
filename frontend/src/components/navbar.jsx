import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="shadow-md h-[68px] bg-gray-100 flex items-center justify-between">
        <img
          src="/olx_logo_2025.svg"
          className="size-[48px] ml-[15px]"
          alt=""
        />
        <div className="flex justify-center bg-white items-center text-[16px] border-[2px] rounded-[3px] border-black h-[44px] flex-1 max-w-[700px]">
          <div className="flex-1">
            <input
              type="text"
              placeholder="search"
              className="w-[100%] focus:outline-none ml-[10px] "
            />
          </div>

          <div className="bg-black size-[44px] flex justify-center items-center">
            <img src="/search.png" className="size-[28px] bg-white" alt="" />
          </div>
        </div>
        <div className="flex mr-5 text-xl justify-center items-center">
<div
          className="font-bold mr-5 underline hover:no-underline"
          onClick={() => {}}
        >
          Login
        </div>
        <Link to="/create">
        <div className="hover:shadow-lg transition h-[48px] w-[104px] font-bold  border-sky-600 border-4 rounded-3xl justify-center items-center flex ">
          <span className="font-bold text-2xl">+</span> SELL
        </div>
        </Link>
        </div>
        
        
      </div>
    </>
  );
};
export default Navbar;
