import { useRef, useEffect } from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css';

const CarouselComponent = () => {
  const categories = [
    { img: './src/assets/images/CategorySlider/ChristianLiving.png', label: 'ChristianLiving' },
    { img: './src/assets/images/CategorySlider/ChurchHistory.png', label: 'ChurchHistory' },
    {
      img: './src/assets/images/CategorySlider/EducationalCurriculum.png',
      label: 'Educational Curriculum',
    },
    { img: './src/assets/images/CategorySlider/Fiction&Fantasy.png', label: 'Fiction & Fantasy' },
    {
      img: './src/assets/images/CategorySlider/Religion&Spirituality.png',
      label: 'Religion & Spirituality',
    },
    { img: './src/assets/images/CategorySlider/RomanceBook.png', label: 'Romance Books' },
    {
      img: './src/assets/images/CategorySlider/Literature&Fiction.png',
      label: 'Literature & Fiction',
    },
    {
      img: './src/assets/images/CategorySlider/Biographies&Memoirs.png',
      label: 'Biographies & Memoirs',
    },
    { img: './src/assets/images/CategorySlider/ChildrenBook.png', label: 'Children Book' },
  ];

  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.next();
      }
    }, 5000);
  };

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={() => {
        resetAutoSlide();
        onClick();
      }}
      className='absolute left-0 top-1/2 transform -translate-y-14 z-10 p-2 rounded-full hover:text-red-500 text-6xl'
    >
      ❮
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={() => {
        resetAutoSlide();
        onClick();
      }}
      className='absolute right-0 top-1/2 transform -translate-y-14 z-10 p-2 rounded-full hover:text-red-500 text-6xl'
    >
      ❯
    </button>
  );

  return (
    <div className='w-full mx-auto py-4 relative'>
      <Carousel
        ref={carouselRef}
        dots={false}
        infinite
        arrows
        draggable
        slidesToShow={6}
        className='overflow-hidden'
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
        beforeChange={resetAutoSlide}
        responsive={[
          {
            breakpoint: 640, // Small screens (iPhone SE, etc.)
            settings: {
              slidesToShow: 2, // Hiển thị 2 slide trên màn hình nhỏ
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768, // Medium screens
            settings: {
              slidesToShow: 3, // Hiển thị 3 slide trên màn hình vừa
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1024, // Large screens (1024px - 1280px)
            settings: {
              slidesToShow: 4, // Hiển thị 4 slide để không chồng lên nhau
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1280, // Extra large screens (1280px+)
            settings: {
              slidesToShow: 5, // Hiển thị 5 slide
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {categories.map((category, index) => (
          <div key={index} className='flex justify-center my-6 px-2 select-none py-6'>
            <div className='text-center'>
              <div className='relative group isolate'>
                <div className='absolute inset-0 rounded-full bg-gray-200 w-36 h-36 md:w-48 md:h-48 m-auto transition-all duration-500 group-hover:bg-red-500 group-hover:-translate-y-8 z-[-1] translate-y-4' />
                <img
                  src={category.img}
                  alt={category.label}
                  className='mx-auto w-40 h-40 md:w-48 md:h-48  object-cover transition-all duration-500 group-hover:-translate-y-4 cursor-pointer'
                />
              </div>
              <p className='mt-2 md:mt-4 text-base md:text-lg font-semibold text-gray-800'>
                {category.label}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
