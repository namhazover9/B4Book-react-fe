// eslint-disable-next-line no-unused-vars
import React from 'react';
import banner1 from '../../assets/images/DiscountBanner/h6_banner1.jpg';
import banner2 from '../../assets/images/DiscountBanner/h6_banner2.jpg';


const BookSaleBanners = () => {
  const banners = [
    {
      id: 1,
      bgColor: 'bg-purple-500',
      imageSrc: banner1,
      title: 'Books Great Gifts',
      subtitle: 'Why not send the gift of a book to family & friends.',
      discount: '20%',
      overlayColor: 'bg-purple-500',
      overlayOpacity: 'bg-opacity-20',
      buttonText: null,
    },
    {
      id: 2,
      bgColor: 'bg-amber-500',
      imageSrc: banner2,
      title: 'Sale 10% Off',
      subtitle: 'It all begins with a great book!',
      discount: null,
      overlayColor: 'bg-amber-500',
      overlayOpacity: 'bg-opacity-20',
      buttonText: 'Shop Now',
    },
  ];

  return (
    <div className="lg:mx-40 lg:px-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-8">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className={`container relative ${banner.bgColor} rounded-3xl overflow-hidden group cursor-pointer lg:h-[250px]`}
        >
          {/* Banner Header */}
          {banner.discount && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-pink-500 rounded-full p-3 sm:p-4 text-center w-20 sm:w-20 h-20 sm:h-24 flex flex-col justify-center">
                <div className="text-xs sm:text-sm text-white">Sale</div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {banner.discount}
                </div>
              </div>
            </div>
          )}

          {/* Image container with hover effect */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={banner.imageSrc}
              alt={banner.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Overlay */}
            <div
              className={`absolute inset-0 ${banner.overlayColor} ${banner.overlayOpacity}`}
            ></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col justify-center items-end my-4 sm:m-0">
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-2 sm:mb-4 max-w-xs sm:max-w-sm md:max-w-md text-white text-right sm:mt-0">
              {banner.title}
            </h2>
            
            {/* Updated subtitle with correct conditional rendering */}
            <p
              className={`text-sm md:text-lg max-w-xs md:max-w-md text-white text-right ${
                banner.buttonText ? 'hidden sm:block' : 'block'
              }`}
            >
              {banner.subtitle}
            </p>

            {banner.buttonText && (
              <button className="bg-white text-amber-500 px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors sm:mt-2">
                {banner.buttonText}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookSaleBanners;