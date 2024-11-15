// eslint-disable-next-line no-unused-vars
import React from 'react';
import pic1 from '../../assets/images/BestSelling/32.jpg';
import pic2 from '../../assets/images/BestSelling/33.jpg';
import pic3 from '../../assets/images/BestSelling/9.jpg';
import store1 from '../../assets/images/BestSelling/store-7.jpg';

import pic4 from '../../assets/images/BestSelling/1.jpg';
import pic5 from '../../assets/images/BestSelling/15.jpg';
import pic6 from '../../assets/images/BestSelling/29.jpg';
import store2 from '../../assets/images/BestSelling/store-8.jpg';

import pic7 from '../../assets/images/BestSelling/4.jpg';
import pic8 from '../../assets/images/BestSelling/28.jpg';
import pic9 from '../../assets/images/BestSelling/21.jpg';
import store3 from '../../assets/images/BestSelling/store-9.jpg';

import pic10 from '../../assets/images/BestSelling/16.jpg';
import pic11 from '../../assets/images/BestSelling/20.jpg';
import pic12 from '../../assets/images/BestSelling/7.jpg';
import store4 from '../../assets/images/BestSelling/store-5.jpg';

const vendors = [
    {
        id: 1,
        name: "BarroneLLC.",
        products: 4,
        rating: 3,
        storeImage: store1,
        images: [pic1, pic2, pic3],
    },
    {
        id: 2,
        name: "GresStore.",
        products: 9,
        rating: 4,
        storeImage: store2,
        images: [pic4, pic5, pic6],
    },
    {
        id: 3,
        name: "Arlene.",
        products: 6,
        rating: 5,
        storeImage: store3,
        images: [pic7, pic8, pic9],
    },
    {
        id: 4,
        name: "Book House.",
        products: 10,
        rating: 4,
        storeImage: store4,
        images: [pic10, pic11, pic12],
    },
];

const TopSellingVendors = () => {
    return (
        <div className="p-4 bg-white px-20">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Top Selling Vendors</h2>
                <div className="w-1/2 h-px bg-gray-300 my-2 shadow-md"></div>
                <button className="bg-red-400 text-white px-3 py-1.5 rounded-full text-sm hover:bg-red-500 transition-colors">
                    View All
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
                {vendors.map((vendor) => (
                    <div key={vendor.id} className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2">
                                <img
                                    src={vendor.images[0]}
                                    alt="Main Product"
                                    className="w-auto h-[260px] object-cover rounded-xl"
                                />
                            </div>
                            <div className="grid grid-rows-2 gap-2">
                                <img
                                    src={vendor.images[1]}
                                    alt="Product"
                                    className="w-auto h-[125px] object-cover rounded-xl"
                                />
                                <img
                                    src={vendor.images[2]}
                                    alt="Product"
                                    className="w-auto h-[125px] object-cover rounded-xl"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-16 h-16 bg-blue-400 rounded-2xl flex items-center justify-center text-white text-sm font-bold">
                                <img
                                    src={vendor.storeImage}
                                    className="object-cover rounded-xl"
                                    alt="Store"
                                />
                            </div>
                            <div>
                                <div className="flex items-center space-x-1">
                                    <h3 className="font-semibold text-base pl-3">{vendor.name}</h3>
                                    <span className="text-gray-500 text-sm">({vendor.products} Products)</span>
                                </div>
                                <div className="flex text-yellow-400 text-xs pl-3">
                                    {"★".repeat(vendor.rating)}{"☆".repeat(5 - vendor.rating)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopSellingVendors;
