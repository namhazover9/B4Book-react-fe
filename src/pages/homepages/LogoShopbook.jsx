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
    <div className='w-full overflow-x-auto md:overflow-visible'>
      <div className='flex items-center gap-4 md:gap-8 sm:gap-4 py-4 px-2 min-w-max md:min-w-0 sm:min-w-0 md:justify-center sm:justify-center'>
        {logos.map((logo, index) => (
          <div key={index} className='flex-shrink-0 md:flex-shrink sm:flex-shrink'>
            <img
              src={logo.src}
              alt={logo.alt}
              className='mx-auto max-w-full h-auto w-auto object-containhover:scale-110 transition duration-300'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoShopBook;
