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
    <footer className='bg-gray-100 p-8 '>
      <div className='flex justify-center items-center'>
        <div className='container md:flex lg:flex mx-auto sm:grid-cols-4 sm:gap-4'>
          {/* Logo và thông tin liên hệ */}
          <div className='col-span-1 sm:mb-4 w-2/5 sm:w-full md:w-full'>
            <div className='container flex flex-col sm:flex-row items-center space-x-1 '>
              <img src={logo} alt='Logo' className='w-20 h-20 sm:justify-center' />
              <span className='text-3xl font-bold text-gray-800 container'>Big Four</span>
            </div>
            <p className='mt-1 text-gray-600'>Got Questions? Call us 24/7!</p>
            <p className='text-xl font-semibold text-red-500'>+84 - 1800 - 4635</p>
            <div className='flex space-x-3 mt-4'>
              <a href='#' className='text-gray-500'>
                <FacebookOutlined />
              </a>
              <a href='#' className='text-gray-500'>
                <TwitterOutlined />
              </a>
              <a href='#' className='text-gray-500'>
                <InstagramOutlined />
              </a>
              <a href='#' className='text-gray-500'>
                <MailOutlined />
              </a>
            </div>
          </div>
          {/* Thông tin liên hệ */}
          <div className='col-span-1 sm:mb-4 hidden sm:hidden md:hidden lg:block w-1/5'>
            <h3 className='text-lg font-semibold text-gray-800'>Contact Info</h3>
            <p className='text-gray-600'>1418 River Drive, Suite 35</p>
            <p className='text-gray-600'>Cottonhall, CA 9622</p>
            <p className='text-gray-600 mt-2'>Monday – Friday: 9:00–20:00</p>
            <p className='text-gray-600'>Saturday: 11:00–15:00</p>
            <p className='text-gray-600 mt-2'>contact@example.com</p>
          </div>

          {/* Liên kết Explore */}
          <div className='col-span-1 sm:mb-4 hidden sm:hidden md:hidden lg:block w-1/5'>
            <h3 className='text-lg font-semibold text-gray-800'>Explore</h3>
            <ul className='mt-2 space-y-2 text-gray-600'>
              <li>About us</li>
              <li>Sitemap</li>
              <li>Bookmarks</li>
              <li>Sign in/Join</li>
            </ul>
          </div>

          {/* Liên kết Our Service */}
          <div className='col-span-1 sm:mb-4 hidden sm:hidden md:hidden lg:block w-1/5'>
            <h3 className='text-lg font-semibold text-gray-800'>Our Service</h3>
            <ul className='mt-2 space-y-2 text-gray-600'>
              <li>Help Center</li>
              <li>Returns</li>
              <li>Product Recalls</li>
              <li>Accessibility</li>
              <li>Contact Us</li>
              <li>Store Pickup</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='container mx-auto flex flex-col-reverse sm:flex-row mt-8 items-center justify-between'>
        <p className='text-gray-600 text-sm text-center mt-4'>
          Copyright © 2024 <span className='text-red-500'>Big Four</span>. All rights reserved.
        </p>
        <img src={footer} alt='Payment Methods' className='w-50' />
      </div>
    </footer>
  );
};

export default Footer;
