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
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 '>
        {/* Logo and Contact Info */}
        <div className='space-y-4 lg:justify-start'>
          <div className='space-x-4 sm:flex sm:justify-center sm:items-center sm:text-center flex justify-center items-center text-center'>
            <div className='rounded-full bg-gray-100 p-4 flex items-center justify-center'>
              <img src='https://res.cloudinary.com/dmyfiyug9/image/upload/v1733819443/lgbf_qyw8ac.png' alt='Logo' className='w-16 h-16' />
            </div>
            
          </div>
          <p className='text-gray-300 hidden sm:flex sm:justify-center sm:items-center sm:text-center justify-center items-center text-center'>
            Got Questions? Call us 24/7!
          </p>
          <p className='text-lg sm:text-xl font-semibold text-[#f18966] sm:flex sm:justify-center sm:items-center sm:text-center flex justify-center items-center text-center'>
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



        <div className='lg:flex lg:space-x-8 lg:space-y-0 hidden items-center justify-center lg:block mr-0'>
          {/* Contact Info */}
          <div className='lg:w-1/3 flex flex-col items-center text-center'>
            <h3 className='text-lg font-semibold underline text-[#f18966]'>Explore</h3>
            <ul className='mt-2 space-y-2 text-gray-100'>
              <li className='hover:text-red-400 cursor-pointer'>About us</li>
              <li className='hover:text-red-400 cursor-pointer'>Sitemap</li>
              <li className='hover:text-red-400 cursor-pointer'>Bookmarks</li>
              <li className='hover:text-red-400 cursor-pointer'>Sign in/Join</li>
            </ul>
          </div>


          {/* Explore Links */}
          <div className='lg:w-1/3 flex flex-col items-center text-center'>
            <h3 className='text-lg font-semibold text-[#f18966] underline'>Explore</h3>
            <ul className='mt-2 space-y-2 text-gray-100'>
              <li className='hover:text-red-400 cursor-pointer'>About us</li>
              <li className='hover:text-red-400 cursor-pointer'>Sitemap</li>
              <li className='hover:text-red-400 cursor-pointer'>Bookmarks</li>
              <li className='hover:text-red-400 cursor-pointer'>Sign in/Join</li>
            </ul>
          </div>

          {/* Our Service Links */}
          <div className='lg:w-1/3 flex flex-col items-center text-center'>
            <h3 className='text-lg font-semibold text-[#f18966] underline'>Service</h3>
            <ul className='mt-2 space-y-2 text-gray-100'>
              <li className='hover:text-red-400 cursor-pointer'>Help Center</li>
              <li className='hover:text-red-400 cursor-pointer'>Returns</li>
              <li className='hover:text-red-400 cursor-pointer'>Product Recalls</li>
              <li className='hover:text-red-400 cursor-pointer'>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 mt-20 gap-10">
        <div className="flex items-center justify-center">
          <p className="text-gray-200 text-sm text-center sm:text-left mr-15">
            Copyright © 2024 <span className="text-[#f18966]">Big Four</span>. All rights reserved.
          </p>
        </div>
        <div className="flex items-center justify-center order-1 lg:order-2">
          <img
            src={footer}
            alt="Payment Methods"
            className="h-10 mb-5"
          />
        </div>
      </div>


    </footer>
  );
};

export default Footer;