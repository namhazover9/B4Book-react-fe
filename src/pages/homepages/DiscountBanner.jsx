// eslint-disable-next-line no-unused-vars
import React from 'react';
import banner1 from '../../assets/images/DiscountBanner/h6_banner1.jpg';
import banner2 from '../../assets/images/DiscountBanner/h6_banner2.jpg';

const banners = [
    {
        id: 1,
        bgColor: "bg-purple-500",
        imageSrc: banner1,
        title: "Books Make Great Gifts",
        subtitle: "Why not send the gift of a book to family & friends.",
        discount: "20%",
        overlayColor: "bg-purple-500",
        overlayOpacity: "bg-opacity-20",
        buttonText: null,
    },
    {
        id: 2,
        bgColor: "bg-amber-500",
        imageSrc: banner2,
        title: "Sale 10% Off",
        subtitle: "It all begins with a great book!",
        discount: null,
        overlayColor: "bg-amber-500",
        overlayOpacity: "bg-opacity-20",
        buttonText: "Shop Now",
    },
];

const BookSaleBanners = () => {
    return (
        <div className="grid grid-cols-2 gap-8 p-8">
            {banners.map((banner) => (
                <div
                    key={banner.id}
                    className={`relative ${banner.bgColor} rounded-3xl overflow-hidden group cursor-pointer p-2.5 h-70`}
                >
                    {/* Banner Header */}
                    {banner.discount && (
                        <div className="absolute top-4 left-4 z-10">
                            <div className="bg-pink-500 rounded-full p-4 text-center w-24 h-24 flex flex-col justify-center">
                                <div className="text-sm text-white">Sale</div>
                                <div className="text-2xl font-bold text-white">{banner.discount}</div>
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
                        <div className={`absolute inset-0 ${banner.overlayColor} ${banner.overlayOpacity}`}></div>
                    </div>

                    {/* Content - Right-aligned */}
                    <div className="relative z-10 p-8 flex flex-col items-end ">
                        <h2 className="text-4xl font-bold mb-4 text-white text-left">{banner.title}</h2>
                        <p className="text-lg opacity-90 text-white text-left">{banner.subtitle}</p>
                        {banner.buttonText && (
                            <button className="bg-white text-amber-500 px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
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
