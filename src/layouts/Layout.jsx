import { useState } from 'react';
import { MenuUnfoldOutlined, CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Select } from 'antd';
import Footer from '../components/footer/Footer';

import LoginPage from '../components/modalLogin/LoginPopup';
import Translate from '../components/Common/Translate';
import { languages } from '../constants/constants';
import { useLocalization } from '../context/LocalizationWrapper';

export default function Layout({ children }) {
  const { switchLocale } = useLocalization();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (value) => {
    switchLocale(value);
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Shops', path: '/shops' },
    { name: 'Books', path: '/products' },
    { name: 'Pages', path: '/pages' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Us', path: '/aboutus' },
  ];

  return (
    <div className='font-cairoRegular'>
      <header className='bg-white shadow-md w-full'>
        {/* Main Container */}
        <div className='container mx-auto flex justify-between items-center px-4 py-2'>
          {/* Logo */}
          <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
            <img
              className='w-20 h-20'
              src='https://res.cloudinary.com/dmyfiyug9/image/upload/v1732094490/logo_b4b_pvldap.png'
              alt='Logo'
            />
            <h2 className='text-2xl font-bold m-0'>BigFour</h2>
          </div>

          {/* Mobile View - Sidebar and Shopping Cart */}
          <div className='block sm:hidden flex items-center space-x-4'>
            <Link to='/popupcart' className='hover:text-red-500'>
              <ShoppingCartOutlined className='text-2xl text-red-400 ' />
            </Link>
            <MenuUnfoldOutlined onClick={toggleSidebar} className='text-2xl cursor-pointer' />
          </div>

          {/* Navbar - Hidden on smaller screens */}
          <nav className='hidden sm:flex space-x-12'>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-bold transition duration-300 ${location.pathname === item.path
                    ? 'text-red-500 text-lg after:w-full'
                    : 'text-gray-700 text-lg after:w-0'
                  } hover:text-red-500 after:content-[''] after:block after:h-0.5 after:bg-red-500 after:transition-all after:duration-300`}
              >
                <Translate text={item.name} />
              </Link>
            ))}
          </nav>

          {/* Right side - Search bar, icons, and language switch */}
          <div className='hidden sm:flex items-center space-x-4'>
            {/* Language Switcher */}
            <Select
              className='w-28'
              defaultValue={localStorage.getItem('locale') ?? 'en'}
              onChange={handleChange}
              options={languages}
            />
            {/* Login Button */}
            <button
              className='text-sm text-white bg-red-500 rounded-md px-4 py-2 hover:bg-red-400'
              onClick={toggleLoginPopup}
            >
              Login
            </button>
            {/* Shopping Cart */}
            <Link to='/cart' className='hover:text-red-500'>
              <ShoppingCartOutlined className='text-2xl text-red-400 hover:bg-red-500 hover:text-white p-2 rounded-full' />
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isSidebarOpen ? 'opacity-50 z-40' : 'opacity-0 -z-10'
          } sm:hidden`}
        onClick={toggleSidebar} // Close sidebar when clicking outside
      ></div>

      {/* Sidebar - Only visible when open */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white bg-opacity-90 h-full flex flex-col p-4 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 sm:hidden`}
      >
        <div className='flex justify-between'>
          <div className='text-xl font-bold'>Menu</div>
          <CloseOutlined onClick={toggleSidebar} className='text-2xl cursor-pointer' />
        </div>
        <nav className='mt-4'>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={toggleSidebar} // Close sidebar when a menu item is clicked
              className='block py-2 px-4 text-gray-700 border-b-2 border-red-200 hover:bg-gray-200'
            >
              <Translate text={item.name} />
            </Link>
          ))}
          {/* Language Switcher */}
          <Select
            className='w-full mt-4'
            defaultValue={localStorage.getItem('locale') ?? 'en'}
            onChange={handleChange}
            options={languages}
          />
          {/* Login Button */}
          <button
            className='text-sm text-white bg-red-500 rounded-md px-4 py-2 hover:bg-red-400 mt-4'
            onClick={() => {
              toggleLoginPopup();
              toggleSidebar();
            }}
          >
            Login
          </button>
        </nav>
      </div>

      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 select-none'>
          <div className='bg-white w-9/12 sm:w-1/2 max-w-md p-6 rounded-lg shadow-lg relative'>
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

      <Footer />
    </div>
  );
}
