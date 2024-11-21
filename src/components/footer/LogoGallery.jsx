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
    <div className='flex justify-center items-center'>
      <div className='flex flex-col md:flex-row gap-4 md:gap-10'>
        <div className='hover:scale-110 transition duration-300 flex justify-between items-center gap-4 my-12'>
          <ShoppingCartOutlined className='text-3xl relative rounded-full bg-red-500 p-3 hover:scale-110 transition duration-300' />
          <div>
            <div className='text-sm text-gray-950'> Best Prices & Offers</div>
            <div className='text-xs text-gray-500'> Orders $50 or more</div>
          </div>
        </div>
        <div className='hover:scale-110 transition duration-300 flex justify-between items-center gap-4 my-12 '>
          <CarOutlined className='text-3xl relative rounded-full bg-red-500 p-3 hover:scale-110 transition duration-300' />
          <div>
            <div className='text-sm text-gray-950'> Free Delivery</div>
            <div className='text-xs text-gray-500'> 24/7 amazing services</div>
          </div>
        </div>
        <div className='hover:scale-110 transition duration-300 flex justify-between items-center gap-4 my-12'>
          <TagOutlined className='text-3xl relative rounded-full bg-red-500 p-3 hover:scale-110 transition duration-300' />
          <div>
            <div className='text-sm text-gray-950'> Great Daily Deal</div>
            <div className='text-xs text-gray-500'> When you sign up</div>
          </div>
        </div>
        <div className='hover:scale-110 transition duration-300 flex justify-between items-center gap-4 my-12'>
          <GlobalOutlined className='text-3xl relative rounded-full bg-red-500 p-3 hover:scale-110 transition duration-300' />
          <div>
            <div className='text-sm text-gray-950'> Wide Assortment</div>
            <div className='text-xs text-gray-500'> Mega Discounts</div>
          </div>
        </div>
        <div className='hover:scale-110 transition duration-300 flex justify-between items-center gap-4 my-12'>
          <InboxOutlined className='text-3xl relative rounded-full bg-red-500 p-3 hover:scale-110 transition duration-300' />
          <div>
            <div className='text-sm text-gray-950'> Easy Returns</div>
            <div className='text-xs text-gray-500'>
              {' '}
              Within 30 <i className='wi wi-day-sprinkle'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
