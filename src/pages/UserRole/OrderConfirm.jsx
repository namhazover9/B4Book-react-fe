import React from 'react';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
} from '@ant-design/icons';
const handleHome = () => {
  console.log('Proceeding to checkout...');
  console.log('/');
};
const OrderConfirmation = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md text-center transform hover:scale-105 transition duration-300 ease-in-out'>
        <div className='flex justify-center mb-5'>
          <img
            className='h-20 w-20 text-green-500'
            src='/src/assets/images/ConfirmImage/5290058.png'
          ></img>
        </div>
        {/* Heading */}
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Thank you for your order!</h2>
        {/* Subtext */}
        <p className='text-gray-600 mb-6'>
          A confirmation has been sent to your email.
          <br />
          Since you're here, join our list for discounts!
        </p>
        {/* Button */}
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out'
          onClick={handleHome}
        >
          Return to Home
        </button>
        {/* Footer */}
        <div className='mt-6'>
          <p className='text-gray-400 text-sm mb-3'>Let's Be Friends!</p>
          <div className='flex justify-center space-x-4'>
            <a href='#' className='text-gray-400 hover:text-blue-500 transition duration-200'>
              <FacebookOutlined />
            </a>
            <a href='#' className='text-gray-400 hover:text-blue-400 transition duration-200'>
              <TwitterOutlined />
            </a>
            <a href='#' className='text-gray-400 hover:text-pink-400 transition duration-200'>
              <InstagramOutlined />
            </a>
            <a href='#' className='text-gray-400 hover:text-red-400 transition duration-200'>
              <MailOutlined />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
