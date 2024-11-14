import React, { useState } from "react";
import { Select } from "antd";
import { languages } from "../constants/constants";
import Translate from "../components/Common/Translate";
import { useLocalization } from "../context/LocalizationWrapper";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";

export default function Header() {
  const { switchLocale } = useLocalization();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (value) => {
    switchLocale(value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-md w-full">
        {/* Top Row - Navigation Links */}
        <div className="container mx-auto flex items-center justify-between px-6 py-2 text-sm text-gray-600">
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-red-500">About Us</a>
                    <a href="#" className="hover:text-red-500">My Account</a>
                    <a href="#" className="hover:text-red-500">Wishlist</a>
                    <a href="#" className="hover:text-red-500">Order Tracking</a>
                </div>
                
            </div>

      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Left side - Logo and main navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <img
            className="w-28 h-28"
            src="src/assets/images/logo_b4b.png"
            alt="Logo"
          />
        </div>

        {/* Search Bar */}
        <div className="flex items-center border rounded-full px-3 py-1 bg-gray-100 w-1/3">
          <Select
            defaultValue="Animals"
            className="border-none bg-transparent text-gray-700"
            options={[
              { label: "Animals", value: "animals" },
              { label: "Books", value: "books" },
              { label: "Authors", value: "authors" },
            ]}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-grow outline-none bg-transparent text-gray-700 px-2"
          />
          <SearchOutlined className="text-red-500 cursor-pointer" />
        </div>

        {/* Right side - Search bar, icons, and language switch */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <Select
            defaultValue={localStorage.getItem("locale") ?? "en"}
            onChange={handleChange}
            options={languages}
          />
          {/* Icons */}
          <div className="flex items-center space-x-4 text-gray-700 ">
            <a href="#" className="relative">
              <HeartOutlined className="text-2xl" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"></span>
            </a>
            <a href="#" className="">
              <ShoppingCartOutlined className="text-2xl" />
            </a>
            <a href="#">
              <UserOutlined className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Secondary navigation row */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Categories dropdown */}
          <div className="relative">
            <button
              className="bg-red-500 text-white rounded-full px-4 py-1 flex items-center"
              onClick={toggleDropdown}
            >
                
              <Translate text="Categories"/>
              <DownOutlined className="ml-2"/>
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
            <a href="#" className="hover:text-red-500 font-bold">
              <Translate text="Home" />
            </a>
            <a href="#" className="hover:text-red-500 font-bold">
              <Translate text="Shop" />
            </a>
            <a href="#" className="hover:text-red-500 font-bold">
              <Translate text="Vendor" />
            </a>
            <a href="#" className="hover:text-red-500 font-bold">
              <Translate text="Pages" />
            </a>
            <a href="#" className="hover:text-red-500 font-bold">
              <Translate text="Blog" />
            </a>
            <a href="#" className="hover:text-red-500 font-bold">
              <Translate text="Contact" />
            </a>
          </nav>

          {/* Contact Info */}
          <div className="text-gray-600 text-center ">
            <span className="text-lg text-red-500 flex">
              +1 840 - 841 25 69
            </span>
            <Translate className="text-xs" text="24/7 Support Center" />
          </div>
        </div>
      </div>
    </header>
  );
}
