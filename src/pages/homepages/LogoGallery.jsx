import React from 'react';
import {
  ShoppingCartOutlined,
  CarOutlined,
  TagOutlined,
  GlobalOutlined,
  InboxOutlined,
} from '@ant-design/icons';

const Logo = () => {
  return (
    <div className='flex justify-center items-center my-8 mx-5'>
      <div className='flex flex-col md:flex-row sm:flex-row  gap-4 md:gap-10 sm:gap-10'>
        <div className='flex flex-col md:flex-row items-center gap-4 hover:scale-110 transition duration-300'>
          <ShoppingCartOutlined className='text-3xl rounded-full bg-[#679089] p-3 hover:scale-110 transition duration-300 text-white' />
          <div className='text-center md:text-left'>
            <div className='text-sm text-gray-950'>Best Prices & Offers</div>
            <div className='text-xs text-gray-500 md:block sm:block'>Orders $50 or more</div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-4 hover:scale-110 transition duration-300'>
          <CarOutlined className='text-3xl rounded-full bg-[#679089] p-3 hover:scale-110 transition duration-300 text-white' />
          <div className='text-center md:text-left'>
            <div className='text-sm text-gray-950'>Free Delivery</div>
            <div className='text-xs text-gray-500 md:block sm:block'>24/7 amazing services</div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-4 hover:scale-110 transition duration-300'>
          <TagOutlined className='text-3xl rounded-full bg-[#679089] p-3 hover:scale-110 transition duration-300 text-white' />
          <div className='text-center md:text-left'>
            <div className='text-sm text-gray-950'>Great Daily Deal</div>
            <div className='text-xs text-gray-500 md:block sm:block'>When you sign up</div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-4 hover:scale-110 transition duration-300'>
          <GlobalOutlined className='text-3xl rounded-full bg-[#679089] p-3 hover:scale-110 transition duration-300 text-white' />
          <div className='text-center md:text-left'>
            <div className='text-sm text-gray-950'>Wide Assortment</div>
            <div className='text-xs text-gray-500 md:block sm:block'>Mega Discounts</div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-4 hover:scale-110 transition duration-300'>
          <InboxOutlined className='text-3xl rounded-full bg-[#679089] p-3 hover:scale-110 transition duration-300 text-white' />
          <div className='text-center md:text-left'>
            <div className='text-sm text-gray-950'>Easy Returns</div>
            <div className='text-xs text-gray-500 md:block sm:block'>
              Within 30 <i className='wi wi-day-sprinkle'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;