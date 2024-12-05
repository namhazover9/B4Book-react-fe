import {
  CarOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  DropboxOutlined,
  GiftOutlined,
  LoadingOutlined,
  SmileOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Carousel, message, Steps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import orderApi from '../../hooks/useOrderApi';
import { useParams } from 'react-router-dom';

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
  const isNext = className.includes('slick-next');
  const isSmallScreen = window.innerWidth < 640;
  return (
    <div
      className={`${className}`}
      style={{
        ...style,
        zIndex: 1,
        marginTop: isSmallScreen ? '-20px' : undefined,
        marginBottom: isSmallScreen ? '-20px' : undefined,
        marginRight: !isSmallScreen && isNext ? '-20px' : undefined,
        marginLeft: !isSmallScreen && !isNext ? '-20px' : undefined,
        color: 'red',
      }}
      onClick={onClick}
    />
  );
};

export default function OrderDetailPageCustomer() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderDetail, setOrderDetail] = useState(null);

  const statuses = [
    { title: 'Pending', icon: <LoadingOutlined /> },
    { title: 'Confirmed', icon: <CheckCircleOutlined /> },
    { title: 'Shipped', icon: <TruckOutlined /> },
    { title: 'Delivered', icon: <GiftOutlined /> },
  ];
  const [currentStep, setCurrentStep] = useState(); // Bắt đầu từ trạng thái "Pending"
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1024);
  const [isWideScreenMd, setIsWideScreenMd] = useState(window.innerWidth > 574);
  const [isWideScreenSm, setIsWideScreenSm] = useState(window.innerWidth < 640);
  const handleResize = () => {
    setIsWideScreen(window.innerWidth >= 1024);
  };

  const handleResizeSm = () => {
    setIsWideScreenSm(window.innerWidth < 640);
  };

  const handleResizeMd = () => {
    setIsWideScreenMd(window.innerWidth > 574);
  };

  useEffect(() => {
    const handleResizeAll = () => {
      handleResize(); // Logic của handleResize
      handleResizeMd(); // Logic của handleResizeMd
      handleResizeSm(); // Logic của handleResizeSm
    };

    window.addEventListener('resize', handleResizeAll);

    // Cleanup sự kiện khi component bị unmount
    return () => {
      window.removeEventListener('resize', handleResizeAll);
    };
  }, []);

  const fetchOrderDetail = async (refresh = false) => {
    try {
      if (!refresh) setLoading(true);
      const response = await orderApi.getDetailOrderCustomer(orderId);
      const orderStatus = response.data.data.status; // Trạng thái từ API
      
      setCurrentStep(orderStatus); // Gán trạng thái từ API
      setCompletedSteps(
        statuses.slice(0, statuses.findIndex((item) => item.title === orderStatus)).map((item) => item.title)
      ); // Cập nhật các bước đã hoàn thành
      setOrderDetail(response.data);
    } catch (error) {
      console.error('Error fetching order detail:', error);
      message.error('Failed to fetch order details');
    } finally {
      if (!refresh) setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetail) {
    return <div>Order detail not found.</div>;
  }

  const { customer, shops, paymentMethod, status, createdAt, shippedDate, deliveredDate, orderItems } =
    orderDetail.data;

  // Hàm chuyển trạng thái
  const handleNextStatus = async () => {
    if (currentStep === 'Delivered') {
      message.info('You have reached the final status.');
      return;
    }

    try {
      // Gọi API để cập nhật trạng thái
      const response = await orderApi.updateStatusOrder(orderId);
      const updatedStatus = response.data.data.status; // Trạng thái mới từ backend

      // Cập nhật trạng thái tiếp theo và UI
      setCurrentStep(updatedStatus);
      setCompletedSteps((prev) => [...prev, currentStep]);

      // Xử lý logic nếu trạng thái là 'Delivered'
      if (updatedStatus === 'Delivered') {
        message.warning('Order is delivered. Order have been removed.');
      } else {
        message.success(`Status updated to ${updatedStatus} successfully`);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      message.error('Failed to update order status');
    }
    fetchOrderDetail(true);
  };

  // Hàm cập nhật trạng thái dựa trên kích thước màn hình

  // Gắn sự kiện resize vào window

  return (
    <div>
      <Content className='mx-2 lg:mx-5'>
        <Breadcrumb className='mb-5 text-base lg:my-3 lg:mx-4'>
          <Breadcrumb.Item>Orders of User</Breadcrumb.Item>
          <Breadcrumb.Item>Tracking</Breadcrumb.Item>
        </Breadcrumb>
        <div className='lg:mx-1 w-full p-3 min-h-96 bg-white rounded-lg flex flex-col items-center'>
          <div className='profile-user-order w-full mb-5'>
            <div className='info-user'>
              <div className='w-full lg:w-5/6 bg-white rounded-lg shadow-lg mx-auto'>
                <div className='bg-red-400 text-white text-center py-2 rounded-t-lg'>
                  <h2 className='text-base font-medium'>Order ID: #{orderId}</h2>
                </div>
                <div className='p-5'>
                  <div className='lg:mx-2'>
                    <div className='flex flex-col lg:flex-row justify-between lg:items-center mb-4 lg:mb-5'>
                      <div className='w-full lg:w-1/2 flex items-center mb-2 lg:mb-0'>
                        <h4 className='h4-info-user'>Shipping Method:</h4>
                        <p className='p-info-user'>{shops[0].shippingMethod}</p>
                      </div>
                      <div className='w-full lg:w-1/2 flex items-center'>
                        <h4 className='h4-info-user'>Payment Method:</h4>
                        <p className='p-info-user'>{paymentMethod}</p>
                      </div>
                    </div>
                    <div className='flex flex-col lg:flex-row justify-between'>
                      <div className='w-full lg:w-1/2 flex items-center mb-2 lg:mb-0'>
                        <h4 className='h4-info-user'>Order Date:</h4>
                        <p className='p-info-user'>{createdAt}</p>
                      </div>
                      <div className='w-full lg:w-1/2 flex items-center'>
                        <h4 className='h4-info-user'>Shipping Date:</h4>
                        <p className='p-info-user'>{shippedDate || 'No shipping date'}</p>
                      </div>
                      <div className='w-full lg:w-1/2 flex items-center'>
                        <h4 className='h4-info-user'>Delivered Date:</h4>
                        <p className='p-info-user'>{deliveredDate || 'No delivered date'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='status-order w-full lg:w-5/6'>
            <div className='lg:my-5 flex justify-between items-center mb-2 lg:mb-0'>
              <h1 className='w-full lg:w-1/2 text-xl lg:text-2xl font-bold'>Order Status</h1>
              <div className='w-full text-end my-5 relative overflow-hidden group'>
                {currentStep !== 'Delivered' && (
                  <button
                    type='primary'
                    className='text-base bg-red-500 text-white px-4 py-2 rounded-full'
                    onClick={handleNextStatus}
                    disabled={currentStep === statuses.length - 1}
                  >
                    {status === 'Pending' && 'Confirm Order'}
                    {status === 'Confirmed' && 'Ship Order'}
                    {status === 'Shipped' && 'Deliver Order'}
                  </button>
                )}
                <div className='absolute top-0 left-[-120%] w-[200%] h-full bg-white opacity-50 transform skew-x-[-45deg] transition-all duration-200 group-hover:left-full'></div>
              </div>
            </div>
            <div className={`steps-section ${isWideScreenMd ? 'w-full' : 'w-32 mx-auto'}`}>
              <Steps
                current={statuses.findIndex((item) => item.title === currentStep)} // Xác định step hiện tại từ API
                direction='horizontal'
                items={statuses.map((status, index) => ({
                  title: status.title,
                  icon: completedSteps.includes(status.title) ? (
                    <CheckCircleOutlined />
                  ) : (
                    status.icon
                  ),
                  status:
                    currentStep === status.title
                      ? 'process'
                      : completedSteps.includes(status.title)
                      ? 'finish'
                      : 'wait',
                }))}
              />
            </div>
          </div>
          <div className='w-full lg:w-5/6'>
            <div className='mt-5 lg:mt-10 mx-auto'>
              <div className='flex justify-between items-center my-2'>
                <h2 className='text-xl lg:text-2xl text-center font-semibold'>Products Ordered</h2>
                {shops &&
                  shops.length > 0 &&
                  shops[0].orderItems &&
                  shops[0].orderItems.length > 0 && (
                    <div className='bg-red-500 text-center text-white py-2 px-4 rounded-3xl lg:w-1/4 relative overflow-hidden group'>
                      <span className='text-sm underline'>Total Price: </span>{' '}
                      {shops[0].totalShopPrice + ' $'}
                      <div className='absolute top-0 left-[-175%] w-[200%] h-full bg-white opacity-40 transform skew-x-[-45deg] transition-all duration-500 group-hover:left-full'></div>
                    </div>
                  )}
              </div>
              <div className=''>
                <Carousel
                  dotPosition={isWideScreenSm ? 'left' : 'none'}
                  className='select-none'
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
                    },
                  ]}
                  nextArrow={<CustomArrow />}
                  prevArrow={<CustomArrow />}
                >
                  {shops && shops.length > 0 ? (
                    shops.map((shop) =>
                      shop.orderItems && shop.orderItems.length > 0 ? (
                        shop.orderItems.map((items) => (
                          <div key={items._id} className='flex flex-col p-2' style={contentStyle}>
                            <div className='flex items-center sm:flex-col border border-solid border-gray-300 p-1 rounded-xl mx-0'>
                              <div className='overflow-hidden rounded-lg sm:mb-2 h-full w-1/2 sm:w-full lg:w-full'>
                                <img
                                  src={items.images[0]}
                                  alt='Product'
                                  className='w-full h-52 object-cover transform transition-transform duration-500 ease-in-out hover:scale-105'
                                />
                              </div>
                              <div className='ml-2 sm:ml-0 px-2 pb-2'>
                                <h4 className='text-base font-medium truncate'>{items.title}</h4>
                                <p className='text-gray-600 font-medium text-xs italic'>
                                  {items.author}
                                </p>
                                <p className='text-red-500 text-base font-medium'>${items.price}</p>
                                <p className='text-gray-600 font-medium text-xs'>
                                  Quantity:{' '}
                                  <span className='text-red-500 text-sm'>{items.quantity}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className='text-red-600 font-semibold text-nowrap'>
                          No products ordered.
                        </p>
                      ),
                    )
                  ) : (
                    <p className='text-red-600 font-semibold text-nowrap'>No shops found.</p>
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
