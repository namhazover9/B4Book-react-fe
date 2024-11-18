import React from 'react';
import { Typography, Divider } from 'antd';
import { BookOutlined, ShopOutlined, GlobalOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import pic1 from '@/assets/images/AboutUs/About_04.jpg';
import pic2 from '../../assets/images/AboutUs/About_02.jpg';
import pic3 from '../../assets/images/AboutUs/About_03.jpg';
import avt1 from '../../assets/images/AboutUs/test_01.png';
import avt2 from '../../assets/images/AboutUs/test_02.png';
import avt3 from '../../assets/images/AboutUs/test_03.png';
import avt4 from '../../assets/images/AboutUs/h2_img.png';
import logo from '../../assets/images/AboutUs/About_01_1.png';



const AboutUs = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-6">About Us</h1>
                <div className="w-60 h-60 mx-auto mb-6">
                    <div className="rounded-full bg-gray-100 p-4 flex items-center justify-center">
                        <img
                            src={logo}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    We are the premier books publishing chain in the Southwestern United States with more than 500 Book stores in 75 states.
                </p>
            </div>

            {/* Our Story Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Retail Stores */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-green-700">RETAIL STORES</h3>
                        <p className="text-gray-600">
                            Modern libraries and digital media facilities are equipped with innovative resources to support research and learning activities, staffed with dedicated staff.
                        </p>
                    </div>

                    {/* E-commerce */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-green-700">E-COMMERCE AND INTERNET SERVICES</h3>
                        <p className="text-gray-600">
                            Digital libraries provide huge digital collections with comprehensive catalogs all at users' fingertips. Online resources support student and faculty collaboration.
                        </p>
                    </div>

                    {/* Wholesale */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-green-700">WHOLESALE DISTRIBUTION</h3>
                        <p className="text-gray-600">
                            We provide a wide range of books, magazines, journals, digital content and specialty products directly to institutions and retail partners nationwide.
                        </p>
                    </div>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="grid md:grid-cols-2 gap-20 mb-16">
                <div className="relative h-120 overflow-hidden rounded-xl">
                    <img
                        src={pic2}
                        alt="Bookstore interior"
                        className="object-cover w-140 h-120"
                    />
                </div>
                <div className="relative h-120 overflow-hidden rounded-lg ">
                    <img
                        src={pic3}
                        alt="Reader by the window"
                        className="object-cover w-120 h-120"
                    />
                </div>
            </div>
            {/* Quote Section */}

            <div className="grid md:grid-cols-2 last:bg-gray-50 gap-20  mb-16">
                <blockquote className="text-center">
                    <p className="text-xl italic text-gray-700 mb-4">
                        "Books Are Such Joy – To Be Purchased, Handled With Pleasure, Read And Reread, Passed Down To The Next Generation"
                    </p>
                    <footer className="text-gray-600">
                        - Reader's World Founder
                    </footer>
                </blockquote>

                {/* Additional Info */}
                <div className=" text-gray-600 text-left">
                    <p className="mb-4">
                        We're not only a bookstore but committed to make books accessible to everyone. For more than 50 years, we've served millions of readers, helping them discover their next favorite book.
                    </p>
                    <p>
                        If you are looking forward to engage in some serious gig with us, please feel free to visit any of our stores for further assistance. Visit our locations to find the one closest to you.
                    </p>
                </div>
            </div>


            <div className="mb-16">
                <div className='flex justify-between items-center'>
                    <h2 className="text-3xl font-bold text-left mb-12">What Client Says</h2>
                    <div className="w-1/2 h-px bg-gray-300 my-2 shadow-md"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Testimonial 1 */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <div className="flex items-center mb-4">
                            <img
                                src={avt1}
                                alt="John Doe"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <h4 className="font-semibold">JOHN DOE</h4>
                                <p className="text-gray-500 text-sm">@johndoe</p>
                            </div>
                        </div>
                        <p className="text-gray-600 italic">
                            "I am so happy to find a site where I can shop for unusual items. The packaging was perfect too, and my book arrived on time in perfect condition."
                        </p>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <div className="flex items-center mb-4">
                            <img
                                src={avt2}
                                alt="Ray Right"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <h4 className="font-semibold">RAY RIGHT</h4>
                                <p className="text-gray-500 text-sm">@right</p>
                            </div>
                        </div>
                        <p className="text-gray-600 italic">
                            "This is the best book store! The prices are great, and there is always something new to browse on. You can find just what you are looking for."
                        </p>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <div className="flex items-center mb-4">
                            <img
                                src={avt3}
                                alt="Josh K"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <h4 className="font-semibold">JOSH K</h4>
                                <p className="text-gray-500 text-sm">@joshk</p>
                            </div>
                        </div>
                        <p className="text-gray-600 italic">
                            "I am so happy to find a site where I can shop for unusual items. The packaging was perfect too, and my book arrived on time in perfect condition."
                        </p>
                    </div>
                </div>
            </div>

            {/* Join Community Section */}
            <div className="bg-emerald-100 rounded-2xl p-8 mb-16">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-4">Join the community</h2>
                        <p className="text-gray-600 mb-6">
                            Share your email address to receive regular updates, as well as news on upcoming events and special offers.
                        </p>
                        <div className="flex">
                            <Input
                                placeholder="Your email address"
                                className="mr-2 rounded-md"
                                style={{ width: '300px' }}
                            />
                            <Button
                                type="primary"
                                icon={<SendOutlined />}
                                className="bg-red-500 hover:bg-red-600 border-none"
                            >
                                Subscribe
                            </Button>
                        </div>
                    </div>
                    <div className="md:w-1/3">
                        <img
                            src={avt4}
                            alt="Join community illustration"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;