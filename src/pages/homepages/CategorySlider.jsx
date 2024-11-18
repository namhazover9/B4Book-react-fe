import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'antd';

const categories = [
    { title: 'Christian Living', imgSrc: './src/assets/images/CategorySlider/ChristianLiving.png' },
    { title: 'Church History', imgSrc: './src/assets/images/CategorySlider/ChurchHistory.png' },
    { title: 'Educational Curriculum', imgSrc: './src/assets/images/CategorySlider/EducationalCurriculum.png' },
    { title: 'Fiction & Fantasy', imgSrc: './src/assets/images/CategorySlider/Fiction&Fantasy.png' },
    { title: 'Religion & Spirituality', imgSrc: './src/assets/images/CategorySlider/Religion&Spirituality.png' },
    { title: 'Romance Books', imgSrc: './src/assets/images/CategorySlider/RomanceBook.png' },
    { title: 'Literature & Fiction', imgSrc: './src/assets/images/CategorySlider/Literature&Fiction.png' },
    { title: 'Biographies & Memoirs', imgSrc: './src/assets/images/CategorySlider/Biographies&Memoirs.png' },
    { title: 'ChildrenBook', imgSrc: './src/assets/images/CategorySlider/ChildrenBook.png' },
];

const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const ChangeSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 6;
    const intervalRef = useRef(null);
    // const dragStartX = useRef(0);
    // const dragEndX = useRef(0);
    // const isDragging = useRef(false);

    const startAutoSlide = () => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
        }, 3000);
    };

    const resetAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        startAutoSlide();
    };

    useEffect(() => {
        startAutoSlide();
        return () => clearInterval(intervalRef.current);
    }, []);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + categories.length) % categories.length
        );
        resetAutoSlide();
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
        resetAutoSlide();
    };

    // const handleMouseDown = (e) => {
    //     isDragging.current = true;
    //     dragStartX.current = e.clientX;
    // };

    // const handleMouseMove = (e) => {
    //     if (!isDragging.current) return;
    //     dragEndX.current = e.clientX;
    // };

    // const handleMouseUp = () => {
    //     isDragging.current = false;
    //     const distance = dragEndX.current - dragStartX.current;
    //     if (distance > 50) {
    //         handlePrevClick();  // Kéo qua trái để chuyển về ảnh trước
    //     } else if (distance < -50) {
    //         handleNextClick();  // Kéo qua phải để chuyển sang ảnh tiếp theo
    //     }
    //     dragStartX.current = 0;
    //     dragEndX.current = 0;
    // };

    const displayedItems = [];
    for (let i = 0; i < itemsToShow; i++) {
        displayedItems.push(categories[(currentIndex + i) % categories.length]);
    }


    return (
        <div className="flex items-center justify-center space-x-4 py-8">
            <button onClick={handlePrevClick} className="text-gray-500 text-6xl hover:text-red-600 transition select-none">
                ❮
            </button>
            <div
                className="flex space-x-6 overflow-hidden transition duration-150 ease-out hover:ease-in select-none"
                onDragStart={(e) => e.preventDefault()}
            >
                {displayedItems.map((category, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center space-y-3 transition-transform duration-300 cursor-pointer"
                    >
                        <div className="relative rounded-full p-4 group">
                            <div className="absolute inset-0 rounded-full bg-gray-200 w-48 h-48 m-auto transition-all duration-500 group-hover:bg-red-500 group-hover:-translate-y-16 translate-y-16"></div>
                            <img
                                src={category.imgSrc}
                                alt={category.title}
                                className="w-56 h-64 object-cover rounded-md relative transition-all duration-300 group-hover:-translate-y-8"
                            />
                        </div>
                        <p className="font-semibold">{category.title}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleNextClick} className="text-gray-500 text-6xl hover:text-red-600 transition">
                ❯
            </button>
        </div>
    );
};

export default ChangeSlider;
