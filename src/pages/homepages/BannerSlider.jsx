import { useState, useEffect } from 'react';
import { RightOutlined } from '@ant-design/icons';

const slides = [
  {
    id: 1,
    title: 'Christmas Pop Up Book Gift Ideas',
    description: 'Find The Perfect Gift For Everyone On Your List',
    color: 'bg-teal-900',
    image: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913211/rev_home6_10_ryujnw.png',
    miniBg: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913209/rev_home6_11_gz5e1z.png',
    decoration: {
      bell: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913209/rev_home6_7_ld76ee.png',
      candy: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913210/rev_home6_8_vr6yqo.png',
      title: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913210/rev_home6_9_plqgwo.png',
      giftBox: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913211/rev_home6_12_rfk82y.png',
    },
  },
  {
    id: 2,
    title: 'Reading is for all Ages',
    description: 'Buy Your Books In A Store',
    color: 'bg-lime-700',
    image: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913212/rev_home6_5_z2m5he.png',
    miniBg: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913210/rev_home6_3_h8jx4z.png',
    decoration: {
      giftBox: 'https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733913210/rev_home6_04_innolz.png',
    },
  },
];

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const changeSlide = (index) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <div className='relative w-full h-full mb-96'>
      <div className='relative'>
        <img
          src='src/assets/images/bannerslider/rev_home6.png'
          alt=''
          className='absolute w-1/6 sm:w-1/12 top-0 left-0 z-20'
        />
        <img
          src='src/assets/images/bannerslider/rev_home6_1.png'
          alt=''
          className='sm:hidden absolute w-1/5 top-80 right-0 z-20'
        />
      </div>
      <div className='mx-96'>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-96 top-0 left-0 rep-banner-xl-tnvd sm:flex sm:items-center sm:justify-between ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${slide.color} `}
            style={{ transition: 'opacity 0.5s ease-in-out' }}
          >
            <div className='slider-left-title text-white w-full h-full sm:w-1/2 text-center flex flex-col justify-center items-center'>
              <div className='sm:w-3/4 lg:w-3/4 md:w-4/5'>
                <div
                  className={`title-img flex justify-center items-center mb-2 transition-all duration-500 ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                  {slide.decoration && slide.decoration.title ? (
                    <img src={slide.decoration.title} alt='Title Decoration' className='w-3/12' />
                  ) : (
                    <span className='text-base'>SPECIAL OFFER</span>
                  )}
                </div>
                <div
                  className={`transition-all duration-700 ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                  <div className='relative'>
                    <img
                      src='src/assets/images/bannerslider/revslider_vector.png'
                      alt=''
                      className='absolute top-7 lg:w-1/2 left-0 z-0'
                    />
                    <h1 className='text-2xl sm:text-3xl font-semibold z-10 rep-title-xl-tnvd'>
                      {slide.title}
                    </h1>
                  </div>
                </div>
                <div
                  className={`transition-all duration-1000 ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                  <p className='text-sm sm:text-base mt-3'>{slide.description}</p>
                  <button
                    className='group mt-5 bg-white text-black rounded-3xl py-3 px-5 

                                    hover:bg-black hover:text-white hover:shadow-lg
                                    transition-all duration-300'
                  >
                    SHOP NOW
                    <span className='inline-block ml-2 transition-transform transform group-hover:translate-x-2'>
                      <RightOutlined />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className='slider-right-image items-center w-1/2 hidden sm:flex'>
              <div
                className={`bg-support relative z-0 w-11/12 flex justify-between items-center rep-bg-support-lg-tnvd rep-bg-support-xl-tnvd rep-bg-support-2xl-tnvd transition-transform duration-1000 bg-opacity-100 ease-in-out ${currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
              >
                <img
                  src='src/assets/images/bannerslider/rev_home6_1.png'
                  alt=''
                  className='absolute top-0 left-0 w-3/12 2xl:w-1/5'
                />
                <img
                  src='src/assets/images/bannerslider/rev_home6_2.png'
                  alt=''
                  className='absolute bottom-0 right-0 w-2/12'
                />
              </div>
              <div
                className={`absolute z-40 w-1/3 flex items-center justify-between ml-36 mt-20 sm:w-2/5 sm:ml-12 sm:mt-48 md:ml-14 md:mt-52 lg:ml-28 lg:mt-60 xl:ml-32 xl:mt-72 transition-all ${currentSlide === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                style={{ transition: 'transform 1s ease-out, opacity 1s ease-out' }}
              >
                <img
                  src={slide.decoration.candy}
                  alt=''
                  className='sm:w-1/4 md:w-1/3 lg:w-1/4 xl:w-3/12 xl:ml-3 2xl:ml-20'
                />
                <img src={slide.decoration.giftBox} alt='' className='sm:w-1/3 xl:w-4/12' />
              </div>
              <div
                className={`absolute slider-image opacity-100 bottom-10 right-16 w-2/5 flex items-center xl:justify-center transition-all ${currentSlide === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                style={{ transition: 'transform 1s ease-out, opacity 1s ease-out' }}
              >
                <img
                  src={slide.miniBg}
                  alt=''
                  className='mini-bg ml-10 rep-minibg-xl-tnvd rep-minibg-2xl-tnvd rep-minibg-lg-tnvd rep-minibg-md-tnvd '
                />
                <img
                  src={slide.image}
                  alt=''
                  className='absolute rep-imgbook-xl-tnvd rep-imgbook-2xl-tnvd mt-10 rep-imgbook-sm-tnvd'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='absolute flex justify-center w-full top-80 xl:top-96 z-20'>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => changeSlide(index)}
            className={`h-3 w-3 mx-2 rounded-full ${currentSlide === index ? 'bg-gray-400' : 'bg-gray-300 transition-all duration-300 hover:bg-teal-700 hover:scale-125'}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
