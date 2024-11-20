import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import post1 from "../../assets/images/PostImage/post1.jpg";
import post2 from "../../assets/images/PostImage/post2.jpg";
import post3 from "../../assets/images/PostImage/post3.jpg";
import post4 from "../../assets/images/PostImage/post4.jpg";
import post5 from "../../assets/images/PostImage/post5.jpg";
import post6 from "../../assets/images/PostImage/post6.jpg";
import post7 from "../../assets/images/PostImage/post7.jpg";

const BlogSection = () => {
    const blogPosts = [
        {
            date: "NOVEMBER 14, 2022",
            title: "5 Attractive Bookstore WordPress Themes",
            image: post1,
            category: ""
        },
        {
            date: "OCTOBER 11, 2022",
            title: "7 Books to Combat Racism",
            image: post2,
            category: ""
        },
        {
            date: "OCTOBER 11, 2022",
            title: "Top 5 Tarot Decks for the Tarot World Summit",
            image: post3,
            category: ""
        }
    ];

    const featuredPost = {
        date: "OCTOBER 11, 2022",
        author: "BY ADMIN",
        title: "Behind the Scenes with Author Victoria Aveyard",
        image: post6,
        category: "CULTURAL"
    };

    const rightPosts = [
        {
            date: "OCTOBER 11, 2022",
            title: "Oprah's Latest Book Club Pick is Being...",
            image: post5
        },
        {
            date: "OCTOBER 11, 2022",
            title: "Top 10 Books to Make It a Great Year",
            image: post7
        },
        {
            date: "OCTOBER 11, 2022",
            title: "Author Special: A Q&A with Brené Brown",
            image: post4
        }
    ];

    return (
        <div className="w-full bg-white px-4 sm:px-10 lg:px-20">
            <div className='max-w-6xl mx-auto px-4 py-5'>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold">Blog Posts</h2>
                    <button className="bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-colors flex items-center gap-2 font-medium">
                        View All <ArrowRightOutlined className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="col-span-12 md:col-span-3">
                        <div className="h-[400px] flex flex-col justify-between">
                            {blogPosts.map((post, index) => (
                                <div key={index} className="group cursor-pointer flex gap-4 h-[120px]">
                                    <div className="relative overflow-hidden rounded-lg w-32 h-32 flex-shrink-0">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex flex-col py-2">
                                        <p className="text-gray-400 text-sm tracking-wide mb-2">{post.date}</p>
                                        <h3 className="text-base font-bold leading-tight group-hover:text-red-500 transition-colors line-clamp-3">
                                            {post.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Center Column - Featured Post */}
                    <div className="col-span-12 md:col-span-6">
                        <div className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-2xl h-[400px]">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-white/90 text-xs tracking-wide">
                                                <span>{featuredPost.date}</span>
                                                <span>/</span>
                                                <span>{featuredPost.author}</span>
                                            </div>
                                            <h2 className="text-2xl font-bold text-white leading-tight">
                                                {featuredPost.title}
                                            </h2>
                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-red-500 text-xs tracking-wide">
                                                    IN {featuredPost.category}
                                                </span>
                                                <button className="text-white flex items-center gap-1.5 hover:text-red-500 transition-colors text-xs font-medium">
                                                    Read More <ArrowRightOutlined className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-12 md:col-span-3">
                        <div className="h-[400px] flex flex-col justify-between">
                            {rightPosts.map((post, index) => (
                                <div key={index} className="group cursor-pointer flex gap-4 h-[120px]">
                                    <div className="relative overflow-hidden rounded-lg w-32 h-32 flex-shrink-0">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex flex-col py-2">
                                        <p className="text-gray-400 text-sm tracking-wide mb-2">{post.date}</p>
                                        <h3 className="text-base font-bold leading-tight group-hover:text-red-500 transition-colors line-clamp-3">
                                            {post.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogSection;