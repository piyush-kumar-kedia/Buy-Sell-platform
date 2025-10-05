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
          credentials: "include", // send cookies
        });

        if (!res.ok) {
          setUsername(null); // Not authenticated
          return;
        }

        const data = await res.json();
        setUsername(data.username); // set from backend
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
        credentials: "include", // important to send the cookie
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
    <div className="shadow-md h-[68px] bg-gray-100 flex items-center justify-between px-4">
      {/* Logo */}
      <img src="/olx_logo_2025.svg" className="h-[48px]" alt="Logo" />

      {/* Search + Filter container */}
      <div className="flex items-center flex-1 max-w-[700px] gap-2">
        {/* Search Input */}
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

        {/* Category Filter */}
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
      {/* Right Buttons */}
      <div className="flex mr-5 text-xl justify-center items-center gap-4">
        {username ? (
          <>
            <span className="font-bold text-gray-800">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="font-bold underline hover:no-underline cursor-pointer"
            >
              Logout
            </button>

            {/* SELL button shown only if logged in */}
            <Link to="/create">
              <div className="hover:shadow-lg transition h-[48px] w-[104px] font-bold border-sky-600 border-4 rounded-3xl justify-center items-center flex">
                <span className="text-2xl mr-1">+</span> SELL
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <div className="font-bold underline hover:no-underline cursor-pointer">
                Login
              </div>
            </Link>
            <Link to="/register">
              <div className="font-bold underline hover:no-underline cursor-pointer">
                Register
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
