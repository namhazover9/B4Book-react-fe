import React from 'react';
import footer from '../../assets/images/footer_img.png';
import logo from '../../assets/images/logo_b4b.png';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
} from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className='bg-gray-900 p-6 sm:p-8'>
      {/* Main Container */}
      <div className='container mx-auto grid grid-cols-1 md:justify-center lg:grid-cols-2 gap-10 '>
        {/* Logo and Contact Info */}
        <div className='space-y-4 '>
          <div className='space-x-4 sm:flex sm:justify-center sm:items-center sm:text-center flex justify-center items-center text-center'>
            <img src={logo} alt='Logo' className='w-16 h-16' />
            <span className='text-2xl sm:text-3xl font-bold text-gray-100'>Big Four</span>
          </div>
          <p className='text-gray-300 sm:flex sm:justify-center sm:items-center sm:text-center flex justify-center items-center text-center'>
            Got Questions? Call us 24/7!
          </p>
          <p className='text-lg sm:text-xl font-semibold text-red-500 sm:flex sm:justify-center sm:items-center sm:text-center flex justify-center items-center text-center'>
            +84 - 1800 - 4635
          </p>
          <div className='flex space-x-3 sm:flex sm:justify-center sm:items-center sm:text-center justify-center items-center text-center'>
            <a href='#' className='text-gray-100 hover:text-blue-500'>
              <FacebookOutlined />
            </a>
            <a href='#' className='text-gray-100 hover:text-blue-400'>
              <TwitterOutlined />
            </a>
            <a href='#' className='text-gray-100 hover:text-pink-500'>
              <InstagramOutlined />
            </a>
            <a href='#' className='text-gray-100 hover:text-red-500'>
              <MailOutlined />
            </a>
          </div>
        </div>
        <div className='lg:flex lg:w-1/2 space-y-8 lg:space-y-0'>
          {/* Contact Info */}
          <div className='hidden lg:block lg:px-5'>
            <h3 className='text-lg font-semibold text-gray-100 underline'>Contact Info</h3>
            <p className='text-gray-100 mt-2'>1418 River Drive, Suite 35</p>
            <p className='text-gray-100'>Cottonhall, CA 9622</p>
            <p className='text-gray-100 mt-2'>Monday – Friday: 9:00–20:00</p>
            <p className='text-gray-100'>Saturday: 11:00–15:00</p>
            <p className='text-gray-100 mt-2'>contact@example.com</p>
          </div>

          {/* Explore Links */}
          <div className='hidden lg:block lg:px-5'>
            <h3 className='text-lg font-semibold text-gray-100 underline'>Explore</h3>
            <ul className='mt-2 space-y-2 text-gray-100'>
              <li className='hover:text-red-400 cursor-pointer'>About us</li>
              <li className='hover:text-red-400 cursor-pointer'>Sitemap</li>
              <li className='hover:text-red-400 cursor-pointer'>Bookmarks</li>
              <li className='hover:text-red-400 cursor-pointer'>Sign in/Join</li>
            </ul>
          </div>

          {/* Our Service Links */}
          <div className='hidden lg:block lg:px-5'>
            <h3 className='text-lg font-semibold text-gray-100 underline'>Service</h3>
            <ul className='mt-2 space-y-2 text-gray-100'>
              <li className='hover:text-red-400 cursor-pointer'>Help Center</li>
              <li className='hover:text-red-400 cursor-pointer'>Returns</li>
              <li className='hover:text-red-400 cursor-pointer'>Product Recalls</li>
              <li className='hover:text-red-400 cursor-pointer'>Accessibility</li>
              <li className='hover:text-red-400 cursor-pointer'>Contact Us</li>
              <li className='hover:text-red-400 cursor-pointer'>Store Pickup</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className='container mx-auto flex flex-col sm:flex-row md:flex-row items-center justify-between mt-8'>
        <p className='text-gray-200 text-sm text-center sm:text-left md:auto'>
          Copyright © 2024 <span className='text-red-500'>Big Four</span>. All rights reserved.
        </p>
        <img
          src={footer}
          alt='Payment Methods'
          className='h-10 mt-4 sm:mt-0 sm:ml-auto md:mt-0 md:ml-auto  '
        />
      </div>
    </footer>
  );
};

export default Footer;
