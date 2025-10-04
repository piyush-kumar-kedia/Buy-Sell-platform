import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({
  onSearch,
  searchTerm,
  onCategoryChange,
  categories,
  selectedCategory,
}) => {
  return (
    <div className="shadow-md h-[68px] bg-gray-100 flex items-center justify-between px-4">
      {/* Logo */}
      <img src="/olx_logo_2025.svg" className="h-[48px]" alt="Logo" />

      {/* Search + Filter container */}
      <div className="flex items-center flex-1 max-w-[700px] gap-2">
        {/* Search Input */}
        <div className="flex justify-center items-center bg-white border-[2px] border-black rounded-[3px] h-[43px] flex-1 pl-2">
          <input
            type="text"
            placeholder="Search products by title..."
            className="w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
          <div className="bg-black h-[40px] w-[40px] flex justify-center items-center cursor-pointer">
            <img src="/search.png" className="h-[24px] bg-white" alt="search" />
          </div>
        </div>

        {/* Category Filter (separate) */}
          <select
    value={selectedCategory}
    onChange={(e) => onCategoryChange(e.target.value)}
    className="border border-gray-300 rounded-full px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
  >
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
      </div>

      {/* Right Buttons */}
      <div className="flex mr-5 text-xl justify-center items-center gap-4">
        <div className="font-bold underline hover:no-underline cursor-pointer">Login</div>
        <Link to="/create">
          <div className="hover:shadow-lg transition h-[48px] w-[104px] font-bold border-sky-600 border-4 rounded-3xl justify-center items-center flex">
            <span className="text-2xl mr-1">+</span> SELL
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
