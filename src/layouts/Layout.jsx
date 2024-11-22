import { useState, useEffect, useRef } from 'react';
import {
  DownOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import Footer from '../components/footer/Footer';
import GalleryImage from '../components/footer/GalleryImage';
import LogoGallery from '../components/footer/LogoGallery';
import LogoShopBook from '../components/footer/LogoShopbook';
import Banner from '../components/footer/Banner';
import { Button, Select, Tooltip } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import Translate from '../components/Common/Translate';
import { languages } from '../constants/constants';
import { useLocalization } from '../context/LocalizationWrapper';
import LoginPage from '../components/modallogin/Login';
export default function Layout({ children }) {
  const { switchLocale } = useLocalization();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path
  const handleChange = (value) => {
    switchLocale(value);
  };
  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Books', path: '/books' },
    { name: 'Pages', path: '/pages' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];
  return (
    <div className='font-cairoRegular'>
      <header className='bg-white shadow-md w-full'>
        {/* Top Row - Navigation Links */}
        <div className='text-base sm:text-lg md:text-xl lg:text-2xl'>
          <div className='container mx-auto flex flex-wrap justify-between px-4 sm:px-6 py-2 text-sm text-gray-600'>
            <div className='flex flex-wrap space-x-4'>
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
        </div>
        <div className='w-full h-[0.5px] bg-gray-300'></div>
        {/* Main Navigation Bar */}
        <div className='container mx-auto flex sm:flex-wrap flex-col sm:flex-row items-center justify-between px-4'>
          {/* Left side - Logo and main navigation */}
          <div className='flex items-center space-x-2 cursor-pointer' onClick={() => navigate('/')}>
            {/* Logo */}
            <img
              className='sm:w-28 sm:h-28 w-20 h-20'
              src='https://res.cloudinary.com/dmyfiyug9/image/upload/v1732094490/logo_b4b_pvldap.png'
              alt='Logo'
            />
            <h2 className='sm:text-4xl text-black font-bold m-0 text-2xl'>BigFour</h2>
          </div>
          <nav className='w-full flex items-center sm:w-auto flex-wrap justify-between space-x-2 sm:space-x-8 text-sm sm:text-base font-medium'>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`relative font-bold transition duration-300
        ${location.pathname === item.path ? 'text-red-500 after:w-full' : 'text-gray-700 after:w-0'}
        hover:text-red-500
        after:content-[''] after:block after:h-0.5 after:bg-red-500 after:transition-all after:duration-300`}
              >
                <Translate text={item.name} />
              </Link>
            ))}
          </nav>
          {/* Right side - Search bar, icons, and language switch */}
          <div className='flex items-center space-x-4 mt-4 mb-4 sm:mt-0 sm:mb-0'>
          <Select
              className='w-20 sm:w-28'
              defaultValue={localStorage.getItem('locale') ?? 'en'}
              onChange={handleChange}
              options={languages}
            />
            <div className='flex items-center space-x-4 '>
              <button
                className='text-xs text-white border-2 bg-red-500 rounded-md px-4 py-2 sm:text-sm sm:text-white sm:border-2 sm:bg-red-500 sm:rounded-md sm:px-4 sm:py-2 hover:bg-red-400 hover:text-white '
                onClick={toggleLoginPopup}
                ref={dropdownRef}
              >
                Login
              </button>
              <Link to='/cart' className='hover:text-red-500'>
                <ShoppingCartOutlined className='text-xl text-red-400 sm:text-2xl sm:text-red-400 hover:text-white hover:bg-red-500 hover:p-2 p-2 hover:rounded-full' />
              </Link>
            </div>
          </div>
        </div>
        <div className='w-full h-[0.5px] bg-gray-300 sm:mb-2'></div>
      </header>
      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 select-none'>
          <div className='bg-white w-9/12 sm:w-1/2 max-w-md p-6 rounded-lg shadow-lg'>
            <button
              onClick={toggleLoginPopup}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'
            >
              ✕
            </button>
            <LoginPage />
          </div>
        </div>
      )}
      {/* Page Content */}
      {children}
      <LogoShopBook />
      <Banner />
      <GalleryImage />
      <LogoGallery />
      <Footer />
    </div>
  );
}
