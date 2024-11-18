import React, { useState } from "react";
import { Button, Select } from "antd";
import { languages } from "../constants/constants";
import Translate from "../components/Common/Translate";
import { useLocalization } from "../context/LocalizationWrapper";
import Login from "../pages/login/Login";
import { Link } from "react-router-dom";

import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  DownOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

export default function Layout({ children }) {
  const { switchLocale } = useLocalization();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const handleChange = (value) => {
    switchLocale(value);
  };

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="m-4 font-cairoRegular">
      <header className="bg-white shadow-md w-full">
        {/* Top Row - Navigation Links */}
        <div className="container mx-auto flex items-center justify-between px-6 py-2 text-sm text-gray-600">
          <div className="flex space-x-4">
            <Link
              to="/aboutus"
              className="hover:text-red-500 relative after:content-[''] after:absolute after:right-[-8px] after:top-0 after:h-full after:w-[0.5px] after:bg-gray-300 last:after:hidden"
            >
              About Us
            </Link>
            <a
              href="#"
              className="hover:text-red-500 relative after:content-[''] after:absolute after:right-[-8px] after:top-0 after:h-full after:w-[0.5px] after:bg-gray-300 last:after:hidden"
            >
              My Account
            </a>
            <a
              href="#"
              className="hover:text-red-500 relative after:content-[''] after:absolute after:right-[-8px] after:top-0 after:h-full after:w-[0.5px] after:bg-gray-300 last:after:hidden"
            >
              Wishlist
            </a>
            <a href="#" className="hover:text-red-500">
              Order Tracking
            </a>
          </div>
        </div>

        <div className="w-full h-[0.5px] bg-gray-300"></div>

        <div className="container mx-auto flex items-center justify-between px-20">
          {/* Left side - Logo and main navigation */}
          <div className="flex items-center ">
            {/* Logo */}
            <img
              className="w-28 h-28"
              src="src/assets/images/logo_b4b.png"
              alt="Logo"
            />
            <h2 className="text-4xl text-black font-bold">BigFour</h2>
          </div>

          {/* Search Bar */}
          <div className="flex items-center border rounded-full px-3 py-3 bg-gray-100 w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-grow outline-none bg-transparent text-gray-700 px-2"
            />
            <SearchOutlined className="text-white cursor-pointer text-1xl bg-red-500 p-2 rounded-full transition-transform duration-300 transform hover:scale-110 hover:shadow-lg" />
          </div>

          {/* Right side - Search bar, icons, and language switch */}
          <div className="flex items-center space-x-4 ">
            {/* Language Selector */}
            <Select
              defaultValue={localStorage.getItem("locale") ?? "en"}
              onChange={handleChange}
              options={languages}
            />
            {/* Icons */}
            <div className="flex items-center space-x-4 text-gray-700 ">
              <Button onClick={toggleLoginPopup}>Login</Button>
              <a href="#" className="">
                <ShoppingCartOutlined className="text-2xl hover:text-red-500" />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-[0.5px] bg-gray-300"></div>

        {/* Secondary navigation row */}
        <div className="container mx-auto flex items-center justify-between px-20 py-2">
          {/* Categories dropdown */}
          <div className="relative">
            <button
              className="bg-red-500 text-white rounded-full px-8 py-2 flex items-center justify-between w-full font-bold text-lg"
              onClick={toggleDropdown}
            >
              <MenuUnfoldOutlined className="text-2xl font-bold mr-3" />
              <span className="text-lg">
                <Translate text="Categories" />
              </span>
              <DownOutlined className="text-2xl font-bold ml-3" />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">📖</span> Action & Adventure
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-red-500 font-bold hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">⭐</span> Americas
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">🎨</span> Arts & Photography
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">📚</span> Biographies
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">👶</span> Children's Books
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">📜</span> Classics
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">📝</span> Contemporary
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">📖</span> Education & Reference
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">📔</span> Genre Fiction
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <span className="mr-2">🏛️</span> Historical
                </a>
              </div>
            )}
          </div>

          {/* Main Navigation */}
          <nav className="flex space-x-6 text-gray-700">
            <a
              href="#"
              className="relative hover:text-red-500 font-bold after:content-['•'] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-[-15px] after:text-red-500 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:translate-y-2 hover:after:translate-y-0"
            >
              <Translate text="Home" />
            </a>
            <a
              href="#"
              className="relative hover:text-red-500 font-bold after:content-['•'] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-[-15px] after:text-red-500 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:translate-y-2 hover:after:translate-y-0"
            >
              <Translate text="Shop" />
            </a>
            <a
              href="#"
              className="relative hover:text-red-500 font-bold after:content-['•'] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-[-15px] after:text-red-500 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:translate-y-2 hover:after:translate-y-0"
            >
              <Translate text="Books" />
            </a>
            <a
              href="#"
              className="relative hover:text-red-500 font-bold after:content-['•'] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-[-15px] after:text-red-500 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:translate-y-2 hover:after:translate-y-0"
            >
              <Translate text="Pages" />
            </a>
            <a
              href="#"
              className="relative hover:text-red-500 font-bold after:content-['•'] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-[-15px] after:text-red-500 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:translate-y-2 hover:after:translate-y-0"
            >
              <Translate text="Blog" />
            </a>
            <a
              href="#"
              className="relative hover:text-red-500 font-bold after:content-['•'] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-[-15px] after:text-red-500 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:translate-y-2 hover:after:translate-y-0"
            >
              <Translate text="Contact" />
            </a>
          </nav>

          {/* Contact Info */}
          <div className="text-gray-600 text-center flex flex-row justify-center items-center space-x-4">
            <a href="#" className="">
              <PhoneOutlined className="text-2xl hover:text-red-500" />
            </a>
            <div className="flex flex-col items-center">
              <span className="text-lg text-red-500 font-bold">
                +84 935 999 999
              </span>
              <Translate className="text-[8px]" text="24/7 Support Center" />
            </div>
          </div>
        </div>
      </header>
      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative transform transition-transform duration-500 scale-95 opacity-0 animate-popup">
            <button
              onClick={toggleLoginPopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
