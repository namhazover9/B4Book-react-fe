import React from 'react';
import banner1 from '../../assets/images/Banner/banner1.jpg';

const BookSaleBanners = () => {
  return (
    <div className='lg:mx-40 lg:px-4 gap-4 sm:gap-6 p-4 sm:p-8'>
      {/* First Banner */}
      <div className='container relative bg-purple-500 rounded-3xl overflow-hidden group cursor-pointer lg:h-[250px]'>
        {/* Banner Header */}

        {/* Image container with hover effect */}
        <div className='absolute inset-0 overflow-hidden'>
          <img
            src={banner1}
            alt='Books Great Gifts'
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
          />
          {/* Overlay */}
          <div className='absolute inset-0 bg-purple-500 bg-opacity-20'></div>
        </div>

        {/* Content */}
        <div className='relative h-full flex flex-col items-center justify-center px-4 text-center z-10'>
          <h2 className='text-4xl font-bold my-4 mb-2'>
            Get <span className='text-[#ff6b6b]'>10%</span> Off Your Order!
          </h2>
          <p className='text-gray-600 mb-4'>
            Enter your email and receive a 10% discount on your next order!
          </p>
          <div className='flex w-full max-w-md mx-auto relative m-5'>
            <input
              type='email'
              placeholder='Your email address'
              className='w-full px-6 py-3 rounded-full border-0 focus:outline-none'
            />
            <button className='absolute right-0 bg-[#ff6b6b] text-white px-8 py-3  rounded-full hover:bg-[#ff5252] transition-colors duration-200'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSaleBanners;
