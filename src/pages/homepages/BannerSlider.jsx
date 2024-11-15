import { useState, useEffect } from 'react';
import { RightOutlined } from '@ant-design/icons';

const slides = [
    {
        id: 1,
        title: 'Christmas Pop Up Book Gift Ideas',
        description: 'Find The Perfect Gift For Everyone On Your List',
        color: 'bg-teal-900',
        image: 'src/assets/images/bannerslider/rev_home6_10.png',
        miniBg: 'src/assets/images/bannerslider/rev_home6_11.png',
        decoration: {
            bell: 'src/assets/images/bannerslider/rev_home6_7.png',
            candy: 'src/assets/images/bannerslider/rev_home6_8.png',
            title: 'src/assets/images/bannerslider/rev_home6_9.png',
            giftBox: 'src/assets/images/bannerslider/rev_home6_12.png',
        }
    },
    {
        id: 2,
        title: 'Reading is for all Ages',
        description: 'Buy Your Books In A Store',
        color: 'bg-lime-700',
        image: 'src/assets/images/bannerslider/rev_home6_5.png',
        miniBg: 'src/assets/images/bannerslider/rev_home6_3.png',
        decoration: {
            giftBox: 'src/assets/images/bannerslider/rev_home6_04.png',
        }
    },
];

export default function BannerSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 10000000);

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
        <div className="relative w-full h-full mt-36">
            <div className='relative'>
                <img src="src/assets/images/bannerslider/rev_home6.png" alt="" className='absolute top-0 left-0 z-20' />
            </div>
            <div className="">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute top-0 left-0 w-full h-5/6 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                            flex items-center justify-between ${slide.color} px-20 py-60`}
                        style={{ transition: 'opacity 0.5s ease-in-out' }}
                    >
                        <div className="slider-left-title text-white w-1/3 text-center">
                            <div
                                className={`title-img flex justify-center items-center mb-2 transition-all ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDuration: '1s' }}
                            >
                                {slide.decoration && slide.decoration.title ? (
                                    <img src={slide.decoration.title} alt="Title Decoration" className='w-3/12' />
                                ) : (
                                    <span className="text-base">SPECIAL OFFER</span>
                                )}
                            </div>
                            <div
                                className={`relative transition-all ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDuration: '2s' }}
                            >
                                <img src="src/assets/images/bannerslider/revslider_vector.png" alt="" className='absolute top-10 left-0 z-0' />
                                <h1 className='absolute text-5xl font-semibold mb-5 z-10'>{slide.title}</h1>
                            </div>
                            <div
                                className={`mt-32 transition-all ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDuration: '3s' }}
                            >
                                <p>{slide.description}</p>
                                <button className='group mt-5 bg-white text-black rounded-3xl py-3 px-5 
                                    hover:bg-black hover:text-white hover:shadow-lg
                                    transition-all duration-300'>
                                    SHOP NOW
                                    <span className='inline-block ml-2 transition-transform transform group-hover:translate-x-2'>
                                        <RightOutlined />
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="slider-right-image w-1/2">
                            <div className={`bg-support relative w-full h-full transition-all ${currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                                style={{ transition: 'opacity 1s ease, transform 1s ease' }}
                            >
                                <img src='src/assets/images/bannerslider/rev_home6_1.png' alt="" className='absolute top-0 left-0 w-3/12'/>
                                <img src='src/assets/images/bannerslider/rev_home6_2.png' alt="" className='absolute bottom-0 right-0 w-2/12'/>
                            </div>
                            <div className={`absolute z-50 w-1/3 flex items-center justify-between ml-28 mt-20 transition-all ${currentSlide === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} style={{ transition: 'transform 1s ease-out, opacity 1s ease-out' }}>
                                <img src={slide.decoration.candy} alt="" className='w-3/12'/>
                                <img src={slide.decoration.giftBox} alt="" className='w-4/12'/>
                            </div>
                            <div className={`absolute slider-image opacity-100 bottom-10 right-16 w-2/5 flex items-center transition-all ${currentSlide === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                                style={{ transition: 'transform 1s ease-out, opacity 1s ease-out' }}
                            >
                                <img src={slide.miniBg} alt="" className='mini-bg w-3/4 ml-10' />
                                <img src={slide.image} alt="" className='absolute w-11/12 h-auto mt-10' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute top-96 left-1/2 z-20 mt-14">
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
