import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  onSearch,
  searchTerm,
  onCategoryChange,
  categories,
  selectedCategory,
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          setUsername(null);
          return;
        }
        const data = await res.json();
        setUsername(data.username);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUsername(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUsername(null);
        navigate("/");
      } else {
        const data = await res.json();
        alert(data.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Something went wrong during logout");
    }
  };

  return (
    <div className="shadow-md bg-gray-100 px-4 py-2 md:py-0 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
      {/* Logo */}
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
        <img src="/olx_logo_2025.svg" className="h-[48px]" alt="Logo" />

        {/* Right buttons on mobile */}
        {/* Right buttons on mobile */}
<div className="flex items-center gap-2 md:hidden">
  {username ? (
    <>
      <button
        onClick={handleLogout}
        className="font-bold underline hover:no-underline cursor-pointer text-sm"
      >
        Logout
      </button>
      <Link to="/create">
        <div className="hover:shadow-lg transition h-[36px] w-[80px] sm:h-[40px] sm:w-[96px] font-bold border-sky-600 border-2 sm:border-4 rounded-2xl sm:rounded-3xl justify-center items-center flex text-sm sm:text-base">
          <span className="text-xl sm:text-2xl mr-1">+</span> SELL
        </div>
      </Link>
    </>
  ) : (
    <>
      <Link to="/login" className="font-bold underline hover:no-underline text-sm">
        Login
      </Link>
      <Link to="/register" className="font-bold underline hover:no-underline text-sm">
        Register
      </Link>
    </>
  )}
</div>

      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-center flex-1 w-full md:max-w-[700px] gap-2">
        <div className="flex justify-between items-center bg-white border-[2px] border-black rounded-[3px] h-[43px] flex-1 pl-2">
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

      {/* Right buttons on desktop */}
      <div className="hidden md:flex items-center gap-4 text-xl ml-4">
        {username ? (
          <>
            <span className="font-bold text-gray-800">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="font-bold underline hover:no-underline cursor-pointer"
            >
              Logout
            </button>

            {/* SELL button only if logged in */}
            <Link to="/create">
              <div className="hover:shadow-lg transition h-[48px] w-[104px] font-bold border-sky-600 border-4 rounded-3xl justify-center items-center flex">
                <span className="text-2xl mr-1">+</span> SELL
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="font-bold underline hover:no-underline">
              Login
            </Link>
            <Link to="/register" className="font-bold underline hover:no-underline">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
