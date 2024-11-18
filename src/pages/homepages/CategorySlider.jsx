import React from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Icon từ Ant Design
import "antd/dist/reset.css";


const CarouselComponent = () => {
    const categories = [
        {
            img: "./src/assets/images/CategorySlider/ChristianLiving.png",
            label: "Educational Curriculum",
        },
        {
            img: "./src/assets/images/CategorySlider/ChurchHistory.png",
            label: "Fiction & Fantasy",
        },
        {
            img: "./src/assets/images/CategorySlider/EducationalCurriculum.png",
            label: "Religion & Spirituality",
        },
        {
            img: "./src/assets/images/CategorySlider/Fiction&Fantasy.png",
            label: "Romance Books",
        },
        {
            img: "./src/assets/images/CategorySlider/Religion&Spirituality.png",
            label: "Literature & Fiction",
        },
        {
            img: "./src/assets/images/CategorySlider/RomanceBook.png",
            label: "Biographies & Memoirs",
        },
    ];

    const CustomPrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full  hover:text-red-500 text-6xl "
        >
            ❮
        </button>
    );

    const CustomNextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full   hover:text-red-500  text-6xl"
        >
            ❯
        </button>
    );

    return (
        <div className="max-w-screen-xl mx-auto py-8 relative ">
            <Carousel
                dots={false}
                slidesToShow={6}
                arrows
                draggable
                prevArrow={<CustomPrevArrow />}
                nextArrow={<CustomNextArrow />}
                className="!-mx-4 p-16"
            >
                {categories.map((category, index) => (
                    <div key={index} className="flex justify-center my-10">
                        <div className="text-center relative">
                            <div className="relative group isolate">
                                <div className="absolute inset-0 rounded-full bg-gray-200 w-48 h-48 m-auto transition-all duration-500 group-hover:bg-red-500 group-hover:-translate-y-16 translate-y-3 z-[-1]" />
                                <img
                                    src={category.img}
                                    alt={category.label}
                                    className="mx-auto w-40 h-60 object-cover transition-all duration-500 group-hover:-translate-y-4"
                                />
                            </div>
                            <p className="mt-4 font-semibold pt-7 text-gray-800 ">
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
