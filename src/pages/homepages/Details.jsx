import React, { useState } from "react";
import { Rate, Button, InputNumber, Tag } from "antd";
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, PinterestOutlined } from '@ant-design/icons';
import "tailwindcss/tailwind.css";
import pic6 from '../../assets/images/BestSelling/13.jpg';
const Details = () => {
    const [activeTab, setActiveTab] = useState("description");

    const renderTabContent = () => {
        switch (activeTab) {
            case "description":
                return (
                    <p className="text-gray-700 text-sm">
                        Debitis id qui fuga delectus voluptates et id. Est porro alias aut.
                        Cumque molestias qui dolores et laboriosam laboriosam qui. Et
                        voluptatem sed quo.
                    </p>
                );
            case "additional-info":
                return (
                    <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md">
                        <table className="min-w-full table-auto">
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2 font-medium">Weight</td>
                                    <td className="border px-4 py-2">96 kg</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-medium">Dimensions</td>
                                    <td className="border px-4 py-2">150 x 180 x 60 cm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case "reviews":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Customer Reviews</h3>
                        <div className="space-y-4">
                            {[
                                {
                                    name: "John Middleton",
                                    date: "February 15, 2023",
                                    rating: 5,
                                    comment: "I can't believe how perfect this book is. The twists and turns are just amazing!",
                                },
                                {
                                    name: "Kenneth G. Myers",
                                    date: "February 15, 2023",
                                    rating: 4,
                                    comment: "Fantastic read for anyone interested in sci-fi. Could use a bit more character development, but still great!",
                                },
                                {
                                    name: "Hilda Addington",
                                    date: "February 15, 2023",
                                    rating: 4.5,
                                    comment: "Great quality and engaging story! Highly recommend it.",
                                },
                                {
                                    name: "Ervin Arrington",
                                    date: "February 15, 2023",
                                    rating: 5,
                                    comment: "This book kept me up all night. Truly a page-turner.",
                                },
                                {
                                    name: "Patricia M. Newman",
                                    date: "February 15, 2023",
                                    rating: 4.5,
                                    comment: "Wonderful design and engaging story. Loved it!",
                                },
                            ].map((review, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-semibold">{review.name}</p>
                                        <p className="text-sm text-gray-500">{review.date}</p>
                                    </div>
                                    <Rate disabled defaultValue={review.rating} className="text-sm" />
                                    <p className="text-sm mt-2 text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                        <form className="mt-6 space-y-4">
                            <h4 className="font-semibold text-gray-700">Write a review:</h4>
                            <Rate allowHalf className="text-sm" />
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                rows="3"
                                placeholder="Your review"
                            ></textarea>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                                />
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                            <Button type="primary" className="bg-blue-500">
                                Submit
                            </Button>
                        </form>
                    </div>
                );

            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Section: Product Image */}
                <div className="relative">
                    <img
                        src={pic6}
                        alt="Book Cover"
                        className="rounded-lg shadow-lg w-72 mx-auto md:w-full"
                    />
                    <Tag
                        color="yellow"
                        className="absolute top-4 left-4 text-black font-bold"
                    >
                        -30%
                    </Tag>
                </div>

                {/* Right Section: Product Details */}
                <div className="space-y-4">
                    <div>
                        <Tag color="green">IN STOCK</Tag>
                        <h1 className="text-xl font-bold md:text-2xl">
                            Treachery: Alpha Colony Book 8
                        </h1>
                        <p className="text-gray-500">
                            Author: <span className="font-medium">Jessica Munoz</span>
                        </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-4">
                        <p className="text-xl text-red-500 font-bold">$569.00</p>
                        <p className="text-gray-400 line-through">$814.66</p>
                    </div>

                    {/* Rating */}
                    <Rate allowHalf defaultValue={4.5} />

                    {/* Countdown */}
                    <div>
                        <p className="font-semibold text-red-500">
                            Hurry up! Sale ends in:
                        </p>
                        <p className="text-lg font-bold">45 DAYS 21 HRS 55 MINS 56 SECS</p>
                    </div>

                    {/* Quantity and Buttons */}
                    <div className="flex items-center space-x-4">
                        <InputNumber min={1} defaultValue={1} className="w-20" />
                        <Button type="primary" className="bg-blue-500 text-sm">
                            Add to Cart
                        </Button>
                        <Button className="bg-gray-100 border-none text-sm">
                            Add to Wishlist
                        </Button>
                    </div>

                    {/* Categories and Tags */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">
                            Categories:{" "}
                            <span className="font-medium">
                                Action & Adventure, Activity Books, Cars & Trucks, Cultural
                            </span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Tags: <span className="font-medium">Books, Fiction, Romance</span>
                        </p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="mt-4 flex space-x-4">
                        <FacebookOutlined className="text-blue-600 text-xl" />
                        <TwitterOutlined className="text-blue-400 text-xl" />
                        <LinkedinOutlined className="text-blue-700 text-xl" />
                        <PinterestOutlined className="text-red-600 text-xl" />
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-6">
                <div className="border-b">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            className={`py-2 px-1 border-b-2 text-sm font-medium ${activeTab === "description"
                                ? "border-blue-500 text-blue-500"
                                : "border-transparent text-gray-500 hover:text-blue-500"
                                }`}
                            onClick={() => setActiveTab("description")}
                        >
                            Description
                        </button>
                        <button
                            className={`py-2 px-1 border-b-2 text-sm font-medium ${activeTab === "additional-info"
                                ? "border-red-500 text-red-500"
                                : "border-transparent text-gray-500 hover:text-red-500"
                                }`}
                            onClick={() => setActiveTab("additional-info")}
                        >
                            Additional Information
                        </button>
                        <button
                            className={`py-2 px-1 border-b-2 text-sm font-medium ${activeTab === "reviews"
                                ? "border-gray-500 text-gray-500"
                                : "border-transparent text-gray-500 hover:text-gray-500"
                                }`}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Reviews (5)
                        </button>
                    </nav>
                </div>
                <div className="mt-4">{renderTabContent()}</div>
            </div>
        </div>
    );
};

export default Details;
