import {
  BankOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DropboxOutlined,
  FieldTimeOutlined,
  GiftOutlined,
  LoadingOutlined,
  SmileOutlined,
  TruckOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Carousel, message, Steps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import orderApi from '../../hooks/useOrderApi';
import { useNavigate, useParams } from 'react-router-dom';
import comLoading from '../../components/loading';
import chatApi from '../../hooks/useChatApi';

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
        marginTop: isSmallScreen ? '-25px' : undefined,
        marginBottom: isSmallScreen ? '-25px' : undefined,
        marginRight: !isSmallScreen && isNext ? '-25px' : undefined,
        marginLeft: !isSmallScreen && !isNext ? '-25px' : undefined,
        color: 'red',
      }}
      onClick={onClick}
    />
  );
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const { id, name } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderDetail, setOrderDetail] = useState(null);
  const navigate = useNavigate();
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
      const response = await orderApi.getDetailOrder(orderId);
      const shop = response.data.data.shops?.[0];
      const orderStatus = shop.status; // Trạng thái từ API

      setCurrentStep(orderStatus); // Gán trạng thái từ API
      setCompletedSteps(
        statuses
          .slice(
            0,
            statuses.findIndex((item) => item.title === orderStatus),
          )
          .map((item) => item.title),
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
    return (
      <div>
        <comLoading />
      </div>
    );
  }

  if (!orderDetail) {
    return <div>Order detail not found.</div>;
  }

  const { customer, shops, paymentMethod, createdAt, shippingAddress } = orderDetail.data;

  const handleCreateChat = async () => {
    const response = await chatApi.createChat(customer._id);
    if (response.status === 200) {
      navigate(`/${name}/chat/${id}/:chatId?`);
    }
  };
  // Hàm chuyển trạng thái
  const handleNextStatus = async () => {
    if (currentStep === 'Delivered') {
      message.info('You have reached the final status.');
      return;
    }

    try {
      // Gọi API để cập nhật trạng thái
      const response = await orderApi.updateStatusOrder(orderId, id);
      const updatedShop = response.data.data.shops.find((shop) => shop.shopId === id);
      const updatedStatus = updatedShop.status; // Trạng thái mới từ backend

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
          <Breadcrumb.Item>Order Details</Breadcrumb.Item>
          <Breadcrumb.Item className='text-[#f18966] font-bold'>Tracking</Breadcrumb.Item>
        </Breadcrumb>
        <div className='lg:mx-1 w-full lg:p-3 min-h-96 bg-white rounded-lg flex flex-col items-center pb-8'>
          <div className='profile-user-order w-full lg:w-11/12 lg:my-4 mt-4 flex flex-col lg:flex-row justify-center lg:items-start lg:space-x-8'>
            <div className='info-user w-full lg:w-3/4'>
              <div className='w-full bg-white rounded-lg lg:shadow-lg mx-auto bottom-5 lg:h-80'>
                <div className='p-3'>
                  <div className='lg:w-11/12 mx-auto flex items-center justify-between mb-4 xl:mb-2'>
                    <img
                      className='w-1/3 sm:w-1/5 lg:w-1/4 rounded-full border-2 border-red-500'
                      src={
                        customer?.avartar ||
                        'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
                      }
                      alt='Customer Image'
                    />
                    <div className='flex flex-col items-end w-2/3'>
                      <h2 className='text-sm font-medium text-end'>
                        Order ID: <span className='text-[#F18966] italic'>#{orderId}</span>
                      </h2>
                      <button
                        onClick={handleCreateChat}
                        className='bg-[#679089] text-white px-3 py-1.5 rounded-full border-2 hover:bg-white hover:border-2 border-[#679089] hover:text-[#679089] duration-300 ease-in-out mt-2'
                      >
                        Chat with customer!
                      </button>
                    </div>
                  </div>

                  <div className='lg:w-full mx-auto border bottom-2 rounded-lg py-4 px-2'>
                    <div className='flex flex-col justify-between lg:items-center mb-4 lg:mb-2'>
                      <div className='w-full lg:w-11/12 flex items-center justify-between mb-5'>
                        <h4 className='h4-info-user'>Name:</h4>
                        <p className='p-info-user'>{customer?.userName}</p>
                      </div>
                      <div className='w-full lg:w-11/12 flex items-center justify-between mb-5'>
                        <h4 className='h4-info-user'>Phone:</h4>
                        <p className='p-info-user'>{customer?.phoneNumber || 'No phone number'}</p>
                      </div>
                      <div className='w-full lg:w-11/12 flex items-center justify-between mb-5'>
                        <h4 className='h4-info-user'>Email:</h4>
                        <p className='p-info-user'>{customer?.email}</p>
                      </div>
                      <div className='w-full lg:w-11/12 flex items-center justify-between'>
                        <h4 className='h4-info-user'>Address:</h4>
                        <p className='p-info-user'>
                          {shippingAddress?.address + ', ' + shippingAddress?.city || 'No address'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='info-order w-11/12 lg:w-5/6 mx-auto'>
              <div className='w-full bg-white rounded-t-xl rounded-b-lg lg:shadow-lg mx-auto bottom-5 lg:h-80'>
                <div className='bg-[#F18966] py-1 rounded-r-xl rounded-l-xl text-center text-white mb-3'>
                  Information Order
                </div>
                <div className='flex flex-col justify-between items-center pl-4 lg:pl-0 lg:mt-0 lg:mb-5 border lg:border-0 p-2 rounded-lg'>
                  <div className='w-full lg:w-11/12 flex flex-col lg:flex-row items-start justify-between lg:items-center space-y-2 lg:space-y-0 mt-2 lg:mt-0 mb-3.5'>
                    <h4 className='h4-info-user w-2/5 ml-2 lg:ml-0 truncate'>Payment Method:</h4>
                    <div className='border-2 flex space-x-2 px-3 py-1 rounded-3xl'>
                      <WalletOutlined className='text-[#679089]' />
                      <p className='p-info-user'>{paymentMethod}</p>
                    </div>
                  </div>
                  <div className='w-full lg:w-11/12 flex flex-col lg:flex-row items-start justify-between lg:items-center space-y-2 lg:space-y-0 mb-3.5'>
                    <h4 className='h4-info-user w-2/5 ml-2 lg:ml-0 truncate'>Order Date:</h4>
                    <div className='border-2 flex space-x-2 px-3 py-1 rounded-3xl'>
                      <ClockCircleOutlined className='text-[#679089]' />
                      <p className='p-info-user'>{createdAt}</p>
                    </div>
                  </div>
                  <div className='w-full lg:w-11/12 flex flex-col lg:flex-row items-start justify-between lg:items-center space-y-2 lg:space-y-0 mb-3.5'>
                    <h4 className='h4-info-user w-2/5 ml-2 lg:ml-0 truncate'>Shipping Date:</h4>
                    <div className='border-2 flex space-x-2 px-3 py-1 rounded-3xl'>
                      <FieldTimeOutlined className='text-[#679089]' />
                      <p className='p-info-user'>{shops?.[0].shippedDate || 'No shipping date'}</p>
                    </div>
                  </div>
                  <div className='w-full lg:w-11/12 flex flex-col lg:flex-row items-start justify-between lg:items-center space-y-2 lg:space-y-0 mb-3.5'>
                    <h4 className='h4-info-user w-2/5 ml-2 lg:ml-0 truncate'>Delivered Date:</h4>
                    <div className='border-2 flex space-x-2 px-3 py-1 rounded-3xl'>
                      <FieldTimeOutlined className='text-[#679089]' />
                      <p className='p-info-user'>
                        {shops?.[0].deliveredDate || 'No delivered date'}
                      </p>
                    </div>
                  </div>
                  <div className='w-full lg:w-11/12 flex flex-col lg:flex-row items-start justify-between lg:items-center space-y-2 lg:space-y-0 mb-2 lg:mb-5'>
                    <h4 className='h4-info-user w-2/5 ml-2 lg:ml-0 truncate'>Total price:</h4>
                    <div className='border-2 flex space-x-2 px-3 py-1 rounded-3xl'>
                      <BankOutlined className='text-[#679089]' />
                      <p className='p-info-user'>
                        {shops &&
                          shops.length > 0 &&
                          shops[0].orderItems &&
                          shops[0].orderItems.length > 0 && (
                            <div className=''>{shops[0].totalShopPrice + ' $'}</div>
                          )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='status-order lg:mt-2 w-11/12 lg:w-5/6'>
            <div className='flex justify-between items-center mb-2 lg:mb-0'>
              <h1 className='w-full lg:w-1/2 text-xl lg:text-2xl font-bold'>Order Status</h1>
              <div className='w-full text-end my-5 relative overflow-hidden group'>
                {currentStep !== 'Delivered' && (
                  <button
                    type='primary'
                    className='text-base bg-[#679089] text-white px-4 py-1 lg:py-2 rounded-full'
                    onClick={handleNextStatus}
                    disabled={currentStep === statuses.length - 1}
                  >
                    {currentStep === 'Pending' && 'Confirm Order'}
                    {currentStep === 'Confirmed' && 'Ship Order'}
                    {currentStep === 'Shipped' && 'Deliver Order'}
                  </button>
                )}
                <div className='absolute top-0 left-[-120%] w-[100%] h-full bg-white opacity-50 transform skew-x-[-45deg] transition-all duration-500 group-hover:left-full'></div>
              </div>
            </div>
            <div className={`steps-section lg:mt-4 ${isWideScreenMd ? 'w-full' : 'w-32 mx-auto'}`}>
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
          <div className='w-11/12 lg:w-5/6'>
            <div className='mt-5 mx-auto'>
              <div className='flex justify-between items-center my-2'>
                <h2 className='text-xl lg:text-2xl text-center font-semibold'>Products Ordered</h2>
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
                        slidesToShow: 2,
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
                          <div key={items._id} className='' style={contentStyle}>
                            <div className='flex items-center sm:flex-col border border-solid border-gray-300 p-1 rounded-xl mx-0 sm:mx-2 my-2 sm:my-0'>
                              <div className='overflow-hidden rounded-lg sm:mb-2 h-full w-1/2 sm:w-full lg:w-full'>
                                <img
                                  src={items.images[0]}
                                  alt='Product'
                                  className='w-full h-52 object-cover transform transition-transform duration-500 ease-in-out hover:scale-105'
                                />
                              </div>
                              <div className='ml-2 sm:ml-0 px-2 pb-2 w-11/12 mx-auto'>
                                <h3 className='text-base font-semibold h-14'>{items.title}</h3>
                                <div className='flex justify-between items-center'>
                                  <p className='text-[#F18966] font-bold'>{items.price} $</p>
                                  <p className='text-xs'>
                                    Quantity:{' '}
                                    <span className='text-[#679089] font-medium'>
                                      {items.quantity}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className='text-[#679089] font-semibold text-nowrap'>
                          No ordered books.
                        </p>
                      ),
                    )
                  ) : (
                    <p className='text-[#679089] font-semibold text-nowrap'>No shops found.</p>
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
