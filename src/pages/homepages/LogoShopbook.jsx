const logos = [
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913927/brand_6_q2m0zl.png',
    alt: 'Books For Life',
  },
  { src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913927/brand_2_mhxvcv.png', alt: 'Cook Books' },
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913927/brand_4_cobjv6.png',
    alt: 'Mit Media Lab',
  },
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913927/brand_1_e6w8ka.png',
    alt: 'Mountain  Books',
  },
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913927/brand_3_r39kth.png',
    alt: 'Particular Books',
  },
  {
    src: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913927/brand_5_l8kj9b.png',
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
