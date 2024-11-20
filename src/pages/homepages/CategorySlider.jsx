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

  const carouselRef = useRef(null); // Tham chiếu tới Carousel
  const intervalRef = useRef(null); // Tham chiếu tới interval

  // Hàm để tự động chuyển slide
  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.next(); // Chuyển sang slide tiếp theo
      }
    }, 5000); // 5 giây
  };

  // Hàm để reset interval khi có tương tác
  const resetAutoSlide = () => {
    clearInterval(intervalRef.current); // Xóa interval hiện tại
    startAutoSlide(); // Bắt đầu lại interval
  };

  useEffect(() => {
    startAutoSlide(); // Bắt đầu auto slide khi component mount

    return () => clearInterval(intervalRef.current); // Xóa interval khi component unmount
  }, []);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={() => {
        resetAutoSlide(); // Reset auto slide khi bấm nút
        onClick(); // Gọi hàm chuyển slide
      }}
      className='absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full hover:text-red-500 text-6xl'
    >
      ❮
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={() => {
        resetAutoSlide(); // Reset auto slide khi bấm nút
        onClick(); // Gọi hàm chuyển slide
      }}
      className='absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full hover:text-red-500 text-6xl'
    >
      ❯
    </button>
  );

  return (
    <div className='w-11/12 mx-auto py-8 relative'>
      <Carousel
        ref={carouselRef}
        dots={false}
        slidesToShow={6}
        arrows
        draggable
        infinite
        className='overflow-hidden'
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
        beforeChange={resetAutoSlide} // Reset khi kéo tay
      >
        {categories.map((category, index) => (
          <div key={index} className='flex justify-center my-10 px-4 select-none'>
            <div className='text-center relative'>
              <div className='relative group isolate'>
                <div className='absolute inset-0 rounded-full bg-gray-200 w-48 h-48 m-auto transition-all duration-500 group-hover:bg-red-500 group-hover:-translate-y-16 translate-y-3 z-[-1]' />
                <img
                  src={category.img}
                  alt={category.label}
                  className='mx-auto w-58 h-60 object-cover transition-all duration-500 group-hover:-translate-y-4 cursor-pointer'
                />
              </div>
              <p className='mt-4 text-2xl font-semibold pt-7 text-gray-800'>{category.label}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
