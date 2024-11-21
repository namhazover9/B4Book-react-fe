import React from 'react';
import { BellOutlined, WechatOutlined } from '@ant-design/icons';

const Dashboard = () => {
  return (
    <div className='w-screen bg-gray-50 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-md'>
        {/* Search */}
        <div className='flex items-center'>
          <input
            type='text'
            placeholder='Type to search...'
            className='p-2 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200'
          />
        </div>

        {/* Actions */}
        <div className='flex items-center space-x-4'>
          <button className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 relative'>
            <BellOutlined />
          </button>
          <button className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200'>
            <WechatOutlined />
          </button>
          {/* User Profile */}
          <div className='flex items-center space-x-2'>
            <img
              src='https://via.placeholder.com/40'
              alt='User'
              className='w-10 h-10 rounded-full'
            />
            <div>
              <h4 className='text-sm font-semibold'>Cuong Huynh</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
        {/* Total Views */}
        <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
          <div className='w-12 h-12 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full'>
            <span className='material-icons'>visibility</span>
          </div>
          <div>
            <h3 className='text-lg font-bold'>$3.456K</h3>
            <p className='text-sm text-gray-500'>Total Views</p>
            <p className='text-xs text-green-500'>0.43% ↑</p>
          </div>
        </div>

        {/* Total Profit */}
        <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
          <div className='w-12 h-12 bg-purple-100 text-purple-500 flex items-center justify-center rounded-full'>
            <span className='material-icons'>shopping_cart</span>
          </div>
          <div>
            <h3 className='text-lg font-bold'>$45.2K</h3>
            <p className='text-sm text-gray-500'>Total Profit</p>
            <p className='text-xs text-green-500'>4.35% ↑</p>
          </div>
        </div>

        {/* Total Products */}
        <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
          <div className='w-12 h-12 bg-indigo-100 text-indigo-500 flex items-center justify-center rounded-full'>
            <span className='material-icons'>store</span>
          </div>
          <div>
            <h3 className='text-lg font-bold'>2.450</h3>
            <p className='text-sm text-gray-500'>Total Products</p>
            <p className='text-xs text-green-500'>2.59% ↑</p>
          </div>
        </div>

        {/* Total Users */}
        <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
          <div className='w-12 h-12 bg-teal-100 text-teal-500 flex items-center justify-center rounded-full'>
            <span className='material-icons'>group</span>
          </div>
          <div>
            <h3 className='text-lg font-bold'>3.456</h3>
            <p className='text-sm text-gray-500'>Total Users</p>
            <p className='text-xs text-red-500'>0.95% ↓</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
