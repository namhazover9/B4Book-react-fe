import React from 'react';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
} from '@ant-design/icons';

function OrderConfirm() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white'>
      <img src=''></img>
      <h1 className='text-3xl font-bold mt-4'>Thank you!</h1>
      <p className='text-gray-500 mt-2'>A confirmation has been sent to your email.</p>
      <p className='text-gray-500'>Since you're here, join our list for discounts!</p>
      <form className='mt-4'>
        <input
          type='email'
          placeholder='Email Address'
          className='border border-gray-300 p-2 rounded'
        />
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3'>
          Yes, Sign Me Up!
        </button>
      </form>
      <p className='text-gray-400 mt-8'>Let's Be Friends!</p>
      <div className='flex mt-2'>
        <div className='flex space-x-3 sm:flex sm:justify-center sm:items-center sm:text-center justify-center items-center text-center'>
          <a href='#' className='text-gray-900 hover:text-blue-500'>
            <FacebookOutlined />
          </a>
          <a href='#' className='text-gray-900 hover:text-blue-400'>
            <TwitterOutlined />
          </a>
          <a href='#' className='text-gray-900 hover:text-pink-500'>
            <InstagramOutlined />
          </a>
          <a href='#' className='text-gray-900 hover:text-red-500'>
            <MailOutlined />
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirm;
