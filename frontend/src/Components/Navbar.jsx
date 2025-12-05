/* ======================
  table of contents
=========================

  1. Imports
  2. logout function
  3. Menu Function
  4. Burger menu
  5. Logo
  6. Desktop menu
  7. Search
  8. Profile
  9. dropdown
  10. Cart
*/

//==============
// 1. Imports
//==============
import { NavLink, Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import LargeSearchBar from "./LargeSearchBar";

function Navbar() {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  //=======================
  // 2. logout function
  //=======================
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const handleSearchClick = () => {
    if (location.pathname !== "/collection") {
      navigate("/collection");
      setTimeout(() => {
        setShowSearch(true);
      }, 600);
    } else {
      setTimeout(() => {
        setShowSearch(true);
      }, 0);
    }
  };

  /*==================
    3. Menu Function
  ====================*/
  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex justify-between items-center py-3 sm:5 font-medium">
      {/*=================
          4. Burger menu 
        ===================*/}
      <button
        className="relative w-6 h-[18px] focus:outline-none z-50 block sm:hidden"
        onClick={toggleMenu}
      >
        <span
          className={`block absolute left-0 w-full h-[2px] bg-black transition-all duration-500 rounded-sm ${
            visible ? "rotate-45 top-1/2 -translate-y-1/2" : "top-0"
          }`}
        ></span>
        <span
          className={`block absolute left-0 w-full h-[2px] bg-black transition-all duration-500 rounded-sm ${
            visible ? "opacity-0" : "top-1/2 -translate-y-1/2"
          }`}
        ></span>
        <span
          className={`block absolute left-0 w-full h-[2px] bg-black transition-all duration-500 rounded-sm ${
            visible ? "-rotate-45 top-1/2 -translate-y-1/2" : "bottom-0"
          }`}
        ></span>
      </button>

      {/*=========
        5. Logo
      ============*/}
      <Link to="/">
        <h1 id="logo" className="text-4xl">
          <span className="text-red-600 font-bold">V</span>esto
        </h1>
      </Link>

      {/*================
        6. Desktop menu
      ==================*/}
      <ul className="hidden sm:flex gap-5 text-sm font-semibold">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[2px] bg-red-600 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[2px] bg-red-600 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[2px] bg-red-600 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[2px] bg-red-600 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4 md:gap-6">
        {/*==========
          7. Search
        =============*/}
        <LargeSearchBar />
        <span
          onClick={handleSearchClick}
          className="text-[27px] cursor-pointer block lg:hidden"
        >
          <img src="icons/search.webp" alt="" className="w-6" />
        </span>

        {/*============
          8. Profile
        ===============*/}
        <div className="group relative hidden sm:block">
          <span
            onClick={() => (token ? null : navigate("/login"))}
            className="cursor-pointer"
          >
            {token ? (
              <img src="icons/user available.webp" alt="user" className="w-7" />
            ) : (
              <img src="icons/user.webp" alt="user" className="w-7" />
            )}
          </span>
          {/*=============
            9. dropdown
          ================*/}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/*========
          10. Cart
        ===========*/}
        <Link to="/cart" className="relative">
          <span className="text-2xl cursor-pointer">
            <FiShoppingBag />
          </span>
          <p className="absolute right-[-5px] top-[13px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
      </div>

      <div
        className={`absolute top-0 left-0 z-40 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? `w-full` : `w-0`
        }`}
      >
        <div className="flex flex-col mt-16">
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>

          {/* ✅ Profile Options للموبايل فقط لما يكون عامل login */}
          {token ? (
            <div className="mt-4 border-t pt-2 flex flex-col text-lg">
              <p
                onClick={() => {
                  setVisible(false);
                  navigate("/orders");
                }}
                className="py-2 pl-6 border cursor-pointer hover:text-black"
              >
                Orders
              </p>
              <p
                onClick={() => {
                  logout();
                  setVisible(false);
                }}
                className="py-2 pl-6 border cursor-pointer hover:text-black"
              >
                Logout
              </p>
            </div>
          ) : (
            <div className="mt-6 border-t pt-2 flex flex-col text-sm mx-20">
              <button
                onClick={() => {
                  setVisible(false);
                  navigate("/login");
                }}
                className="py-3 text-base border cursor-pointer bg-black text-white transition-all"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
