import { useState, useEffect, useRef } from 'react';
import {
  DownOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Footer from "../components/footer/Footer";
import GalleryImage from "../components/footer/GalleryImage";
import LogoGallery from "../components/footer/LogoGallery";
import LogoShopBook from "../components/footer/LogoShopbook";
import Banner from "../components/footer/Banner";
import { Button, Select, Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Translate from '../components/Common/Translate';
import { languages } from '../constants/constants';
import { useLocalization } from '../context/LocalizationWrapper';
import Login from '../pages/login/Login';

export default function Layout({ children }) {
  const { switchLocale } = useLocalization();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleChange = (value) => {
    switchLocale(value);
  };

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsLoginPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='font-cairoRegular'>
      <header className='bg-white shadow-md w-full'>
        {/* Top Row - Navigation Links */}
        <div className='container mx-auto flex items-center justify-between px-6 py-2 text-sm text-gray-600'>
          <div className='flex space-x-4'>
            <Link
              to='/aboutus'
              className="hover:text-red-500 relative after:content-[''] after:absolute after:right-[-8px] after:top-0 after:h-full after:w-[0.5px] after:bg-gray-300 last:after:hidden"
            >
              About Us
            </Link>
            <a
              href='#'
              className="hover:text-red-500 relative after:content-[''] after:absolute after:right-[-8px] after:top-0 after:h-full after:w-[0.5px] after:bg-gray-300 last:after:hidden"
            >
              My Account
            </a>
            <a
              href='#'
              className="hover:text-red-500 relative after:content-[''] after:absolute after:right-[-8px] after:top-0 after:h-full after:w-[0.5px] after:bg-gray-300 last:after:hidden"
            >
              Wishlist
            </a>
            <a href='#' className='hover:text-red-500'>
              Order Tracking
            </a>
          </div>
        </div>

        <div className='w-full h-[0.5px] bg-gray-300'></div>

        <div className='container mx-auto flex items-center justify-between px-20'>
          {/* Left side - Logo and main navigation */}
          <div
            className='flex items-center'
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          >
            {/* Logo */}
            <img className='w-28 h-28' src='src/assets/images/logo_b4b.png' alt='Logo' />
            <h2 className='text-4xl text-black font-bold'>BigFour</h2>
          </div>

          {/* Search Bar */}
          <div className='flex items-center border rounded-full px-3 py-3 bg-gray-100 w-1/3'>
            <input
              type='text'
              placeholder='Search products...'
              className='flex-grow outline-none bg-transparent text-gray-700 px-2'
            />
            <SearchOutlined className='text-white cursor-pointer text-1xl bg-red-500 p-2 rounded-full transition-transform duration-300 transform hover:scale-110 hover:shadow-lg' />
          </div>

          {/* Right side - Search bar, icons, and language switch */}
          <div className='flex items-center space-x-4 '>
            {/* Language Selector */}
            <Select
              defaultValue={localStorage.getItem('locale') ?? 'en'}
              onChange={handleChange}
              options={languages}
            />
            {/* Icons */}
            <div className='flex items-center space-x-4 text-gray-700 '>
              <Button onClick={toggleLoginPopup} ref={dropdownRef}>
                Login
              </Button>
              <a href='#' className=''>
                <ShoppingCartOutlined className='text-2xl hover:text-red-500' />
              </a>
            </div>
          </div>
        </div>

        <div className='w-full h-[0.5px] bg-gray-300'></div>

        {/* Secondary navigation row */}
        <div className='w-screen flex items-center justify-between px-10 py-4 bg-gray-50 shadow-md rounded-lg border border-gray-200'>
          {/* Categories Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button
              ref={buttonRef} // Gán ref cho button
              className='flex items-center bg-red-500 text-white font-semibold text-lg px-6 py-2 rounded-full shadow hover:bg-red-600 transition duration-300'
              onClick={toggleDropdown}
            >
              <MenuUnfoldOutlined className='text-2xl mr-2' />
              <span>
                <Translate text='Categories' />
              </span>
              <DownOutlined className='text-xl ml-2' />
            </button>

            {isDropdownOpen && (
              <div className='absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50'>
                {[
                  { icon: '📖', text: 'Action & Adventure' },
                  { icon: '⭐', text: 'Americas', active: true },
                  { icon: '🎨', text: 'Arts & Photography' },
                  { icon: '📚', text: 'Biographies' },
                  { icon: '👶', text: "Children's Books" },
                  { icon: '📜', text: 'Classics' },
                  { icon: '📝', text: 'Contemporary' },
                  { icon: '📖', text: 'Education & Reference' },
                  { icon: '📔', text: 'Genre Fiction' },
                  { icon: '🏛️', text: 'Historical' },
                ].map((category, index) => (
                  <a
                    key={index}
                    href='#'
                    className={`flex items-center px-4 py-2 text-sm ${
                      category.active
                        ? 'text-red-500 font-semibold bg-gray-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    } transition duration-300`}
                  >
                    <span className='mr-2'>{category.icon}</span>
                    {category.text}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Main Navigation */}
          <nav className='flex space-x-8 text-base font-medium'>
            {['Home', 'Shop', 'Books', 'Pages', 'Blog', 'Contact'].map((item, index) => (
              <a
                key={index}
                href='products'
                className="relative text-gray-700 font-bold hover:text-red-500 transition duration-300 after:content-[''] after:block after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                <Translate text={item} />
              </a>
            ))}
          </nav>

          {/* Contact Info */}
          <div className='flex items-center space-x-4'>
            <Tooltip title='Call Us' placement='bottom'>
              <a href='#' className='text-gray-600 hover:text-red-500 transition duration-300'>
                <PhoneOutlined className='text-2xl' />
              </a>
            </Tooltip>
            <div className='flex flex-col items-start'>
              <span className='text-lg font-semibold text-black'>Contact Us</span>
              <span className='text-sm text-gray-500'>Call: 123-456-789</span>
            </div>
          </div>
        </div>
      </header>
      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative transform transition-transform duration-500 scale-95 opacity-0 animate-popup'>
            <button
              onClick={toggleLoginPopup}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'
            >
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}
      {children}
      <LogoShopBook />
      <Banner/>
      <GalleryImage />
      <LogoGallery />
      <Footer />
    </div>
  );
}
