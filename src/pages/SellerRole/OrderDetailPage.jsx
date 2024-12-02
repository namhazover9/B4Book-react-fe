import { CarOutlined, CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, DropboxOutlined, GiftOutlined, LoadingOutlined, SmileOutlined, TruckOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Carousel, message, Steps } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";

// Carousel
const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const CustomArrow = ({ className, style, onClick }) => {
    const isNext = className.includes("slick-next"); 
    const isSmallScreen = window.innerWidth < 640;
    return (
        <div
            className={`${className}`}
            style={{
                ...style,
                zIndex: 1,
                marginTop: isSmallScreen ? "-20px" : undefined, 
                marginBottom: isSmallScreen ? "-20px" : undefined, 
                marginRight: !isSmallScreen && isNext ? "-20px" : undefined,
                marginLeft: !isSmallScreen && !isNext ? "-20px" : undefined,
                color: "red",
            }}
            onClick={onClick}
        />
    );
};


export default function OrderDetailPage() {
    const statuses = [
        { title: 'Pending', icon: <LoadingOutlined /> },
        { title: 'Confirmed', icon: <CheckCircleOutlined /> },
        { title: 'Shipped', icon: <TruckOutlined /> },
        { title: 'Delivered', icon: <GiftOutlined /> },
    ];
    const [currentStep, setCurrentStep] = useState(0); // Bắt đầu từ trạng thái "Pending"
    const [completedSteps, setCompletedSteps] = useState([]);
    const [products, setProducts] = useState([
        { id: 1, name: 'Anh hẹn em Pickleball', author: 'Hoang Nam', image: 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732850370/Screenshot_2024-11-29_101701_xvpbq2.png', price: 10000, quantity: 2 },
        { id: 2, name: 'Anh hẹn em Pickleball', author: 'Hoang Nam', image: 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732850370/Screenshot_2024-11-29_101701_xvpbq2.png', price: 20, quantity: 6 },
        { id: 3, name: 'Anh hẹn em Pickleball', author: 'Hoang Nam', image: 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732850370/Screenshot_2024-11-29_101701_xvpbq2.png', price: 30, quantity: 5 },
        { id: 4, name: 'Anh hẹn em Pickleball', author: 'Hoang Nam', image: 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732850370/Screenshot_2024-11-29_101701_xvpbq2.png', price: 40, quantity: 2 },
        { id: 5, name: 'Anh hẹn em Pickleball', author: 'Hoang Nam', image: 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732181350/VuHoangNam_wbngk0.jpg', price: 50, quantity: 7 },
        { id: 6, name: 'Anh hẹn em Pickleball', author: 'Hoang Nam', image: 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732181350/VuHoangNam_wbngk0.jpg', price: 60, quantity: 10 },
    ]);

    // Hàm chuyển trạng thái
    const handleNextStatus = () => {
        if (currentStep < statuses.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            setCompletedSteps((prev) => [...prev, currentStep]);

            if (statuses[nextStep].title === 'Delivered') {
                setProducts([]); // Xóa danh sách sản phẩm
                message.warning('Order is cancelled. Products have been removed.');
            }
        } else {
            message.info('You have reached the final status.');
        }
    };

    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1024);
    const [isWideScreenMd, setIsWideScreenMd] = useState(window.innerWidth > 574);
    const [isWideScreenSm, setIsWideScreenSm] = useState(window.innerWidth < 640);

    // Hàm cập nhật trạng thái dựa trên kích thước màn hình
    const handleResize = () => {
        setIsWideScreen(window.innerWidth >= 1024);
    };

    const handleResizeSm = () => {
        setIsWideScreenSm(window.innerWidth < 640);
    };

    const handleResizeMd = () => {
        setIsWideScreenMd(window.innerWidth > 574);
    };

    // Gắn sự kiện resize vào window
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('resize', handleResizeMd);
        window.addEventListener('resize', handleResizeSm);
        // Cleanup sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('resize', handleResizeMd);
            window.removeEventListener('resize', handleResizeSm);
        };
    }, []);

    return (
        <div>
            <Content className='mx-2 lg:mx-5'>
                <Breadcrumb className='mb-5 text-base lg:my-3 lg:mx-4'>
                    <Breadcrumb.Item>Orders of User</Breadcrumb.Item>
                    <Breadcrumb.Item>Tracking</Breadcrumb.Item>
                </Breadcrumb>
                <div className="lg:mx-1 w-full p-3 min-h-96 bg-white rounded-lg flex flex-col items-center">
                    <div className="profile-user-order w-full mb-5">
                        <div className="info-user">
                            <div className="w-full lg:w-5/6 bg-white rounded-lg shadow-lg mx-auto">
                                <div className="bg-red-400 text-white text-center py-2 rounded-t-lg">
                                    <h2 className="text-base font-medium">Order ID: #12345</h2>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center mb-5">
                                        <img className="w-1/3 sm:w-1/5 lg:w-1/6 rounded-full border-2 border-red-500" src="https://res.cloudinary.com/dmyfiyug9/image/upload/v1732181350/VuHoangNam_wbngk0.jpg" alt="Customer Image" />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold">John Doe</h3>
                                            <p className="text-gray-500 text-sm">+84 234 567 890</p>
                                        </div>
                                    </div>
                                    <div className="lg:mx-2">
                                        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4 lg:mb-5">
                                            <div className="w-full lg:w-1/2 flex items-center mb-2 lg:mb-0">
                                                <h4 className="h4-info-user">Email:</h4>
                                                <p className="p-info-user">johndoe@example.com</p>
                                            </div>
                                            <div className="w-full lg:w-1/2 flex items-center">
                                                <h4 className="h4-info-user">Address:</h4>
                                                <p className="p-info-user">123 Main Street, New York, NY 10001</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4 lg:mb-5">
                                            <div className="w-full lg:w-1/2 flex items-center mb-2 lg:mb-0">
                                                <h4 className="h4-info-user">Shipping Method:</h4>
                                                <p className="p-info-user">Express</p>
                                            </div>
                                            <div className="w-full lg:w-1/2 flex items-center">
                                                <h4 className="h4-info-user">Payment Method:</h4>
                                                <p className="p-info-user">Credit Card</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col lg:flex-row justify-between">
                                            <div className="w-full lg:w-1/2 flex items-center mb-2 lg:mb-0">
                                                <h4 className="h4-info-user">Order Date:</h4>
                                                <p className="p-info-user">2024-11-01</p>
                                            </div>
                                            <div className="w-full lg:w-1/2 flex items-center">
                                                <h4 className="h4-info-user">Shipping Date:</h4>
                                                <p className="p-info-user">2024-11-05</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="status-order w-full lg:w-5/6">
                        <div className="lg:my-5 flex justify-between items-center mb-2 lg:mb-0">
                            <h1 className="w-full lg:w-1/2 text-xl lg:text-2xl font-bold">Order Status</h1>
                            <div className="w-full text-end my-5 relative overflow-hidden group">
                                {statuses[currentStep].title !== "Delivered" && (
                                    <button
                                        type="primary"
                                        className="text-base bg-red-500 text-white px-4 py-2 rounded-full"
                                        onClick={handleNextStatus}
                                        disabled={currentStep === statuses.length - 1}
                                    >
                                        {statuses[currentStep].title === "Pending" && "Confirm Order"}
                                        {statuses[currentStep].title === "Confirmed" && "Ship Order"}
                                        {statuses[currentStep].title === "Shipped" && "Deliver Order"}
                                    </button>
                                )}
                                <div className="absolute top-0 left-[-120%] w-[200%] h-full bg-white opacity-50 transform skew-x-[-45deg] transition-all duration-200 group-hover:left-full"></div>
                            </div>
                        </div>
                        <div className={`steps-section ${isWideScreenMd ? 'w-full' : 'w-32 mx-auto'}`}>
                            <Steps
                                current={currentStep}
                                direction='horizontal'
                                items={statuses.map((status, index) => ({
                                    title: status.title,
                                    icon: completedSteps.includes(index) ? <CheckCircleOutlined /> : status.icon,
                                    status: currentStep === index ? 'process' : currentStep > index ? 'finish' : 'wait',
                                }))}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-5/6">
                        <div className="mt-5 lg:mt-10 mx-auto">
                            <div className="flex justify-between items-center my-2">
                                <h2 className="text-xl lg:text-2xl text-center font-semibold">Products Ordered</h2>
                                {products.length > 0 && (
                                    <div className="bg-red-500 text-center text-white py-2 px-4 rounded-3xl lg:w-1/4 relative overflow-hidden group">
                                        <span className="text-sm underline">Total Price: </span>
                                         ${products.reduce((total, product) => total + product.price * product.quantity, 0)}
                                        <div className="absolute top-0 left-[-175%] w-[200%] h-full bg-white opacity-40 transform skew-x-[-45deg] transition-all duration-500 group-hover:left-full"></div>
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <Carousel 
                                    dotPosition={isWideScreenSm ? 'left' : 'none'} 
                                    className="select-none" 
                                    arrows 
                                    draggable 
                                    infinite={false} 
                                    slidesToShow={4} 
                                    responsive={[
                                        {
                                            breakpoint: 768, 
                                            settings: {
                                                slidesToShow: 3, 
                                                slidesToScroll: 1,
                                            },
                                        }
                                    ]} 
                                    nextArrow={<CustomArrow />} 
                                    prevArrow={<CustomArrow />}
                                >
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <div key={product.id} className="flex flex-col p-2" style={contentStyle}>
                                                <div className="flex items-center sm:flex-col border border-solid border-gray-300 p-1 rounded-xl mx-0">
                                                    <div className="overflow-hidden rounded-lg sm:mb-2 h-full w-1/2 sm:w-full lg:w-full">
                                                        <img src={product.image} alt={product.name} className="w-full h-52 object-cover transform transition-transform duration-500 ease-in-out hover:scale-105" />
                                                    </div>
                                                    <div className="ml-2 sm:ml-0 px-2 pb-2">
                                                        <h4 className="text-base font-medium truncate">{product.name}</h4>
                                                        <p className="text-gray-600 font-medium text-xs italic">{product.author}</p>
                                                        <p className="text-red-500 text-base font-medium">${product.price}</p>
                                                        <p className="text-gray-600 font-medium text-xs">Quantity: <span className="text-red-500 text-sm">{product.quantity}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-red-600 font-semibold text-nowrap">No products ordered.</p>
                                    )}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </div>
    );
}
