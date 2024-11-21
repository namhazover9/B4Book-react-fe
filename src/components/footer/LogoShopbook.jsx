import React from 'react';

const logos = [
  {
    src: './src/assets/images/LogoShopBook/brand_1.svg',
    alt: 'Books For Life',
  },
  { src: './src/assets/images/LogoShopBook/brand_2.svg', alt: 'Cook Books' },
  {
    src: './src/assets/images/LogoShopBook/brand_3.svg',
    alt: 'Mit Media Lab',
  },
  {
    src: './src/assets/images/LogoShopBook/brand_4.svg',
    alt: 'Mountain  Books',
  },
  {
    src: './src/assets/images/LogoShopBook/brand_5.svg',
    alt: 'Particular Books',
  },
  {
    src: './src/assets/images/LogoShopBook/brand_6.svg',
    alt: 'Travel Books',
  },
];
function LogoShopBook() {
  return (
    <div className='flex flex-wrap justify-center items-center p-4 space-x-4 md:space-x-8'>
      {logos.map((logo, index) => (
        <div key={index} className='relative'>
          <img
            src={logo.src}
            alt={logo.alt}
            className='mx-auto max-w-full h-auto object-cover rounded-lg hover:scale-110 transition duration-300'
          />
        </div>
      ))}
    </div>
  );
}

export default LogoShopBook;
