import {
  CheckCircleOutlined,
  TruckOutlined,
  GiftOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, message, Steps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import orderApi from '../../hooks/useOrderApi';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const { Step } = Steps;

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderDetail, setOrderDetail] = useState(null);
  const userId = useSelector((state) => state.user._id);
  const statuses = [
    { title: 'Pending', icon: <LoadingOutlined /> },
    { title: 'Confirmed', icon: <CheckCircleOutlined /> },
    { title: 'Shipped', icon: <TruckOutlined /> },
    { title: 'Delivered', icon: <GiftOutlined /> },
  ];

  const [currentStep, setCurrentStep] = useState([]);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1024);

  const handleResize = () => {
    setIsWideScreen(window.innerWidth >= 1024);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchOrderDetail = async (refresh = false) => {
    try {
      if (!refresh) setLoading(true);
      const response = await orderApi.getDetailOrderCustomer(orderId);
      console.log(response.data);
      const shops = response.data.data.shops;
      const statusesOfShops = shops.map((shop) => shop.status); // Lấy tất cả các trạng thái của các shop
      setCurrentStep(statusesOfShops); // Gán tất cả các trạng thái
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
  {
    if (currentStep === 'Delivered') {
    }
  }
  const { shops, shippingAddress } = orderDetail.data;

  return (
    <div>
      <Content className='mx-2 lg:mx-5'>
        <Breadcrumb className='mb-5 text-base lg:my-3 lg:mx-4'>
        <Breadcrumb.Item href={`/orderList/${userId}`}>Orders</Breadcrumb.Item> 
          <Breadcrumb.Item>Order Details</Breadcrumb.Item>
        </Breadcrumb>
        <div className='lg:mx-1 w-full p-3 min-h-96 bg-white rounded-lg flex flex-col items-center'>
          <div className='w-full mb-5'>
            {shops.map((shop, index) => (
              <div
                className='w-full lg:w-5/6 bg-white rounded-lg shadow-lg mx-auto mb-4'
                key={shop.id}
              >
                <div className='bg-[#679089] text-white text-center py-2 rounded-t-lg'>
                  <h2 className='text-xl font-bold text-[#f18966]'>Shop: {shop.shopName}</h2>
                </div>
                <div className='p-5'>
                  <div className='flex flex-col lg:flex-row justify-center lg:items-center mb-4 lg:mb-5'>
                    <div className='w-full lg:w-1/2 flex items-center'>
                      <h4 className='h4-info-user'>Shipping Address: </h4> 
                      <p className='p-info-user'>
                        {shippingAddress?.address + ', ' + shippingAddress?.city || 'No address'}
                      </p>
                    </div>
                    <div className='w-full lg:w-1/2 flex items-center'>
                      <h4 className='h4-info-user'>Shipping Date: </h4>
                      <p className='p-info-user'> {shop.shippedDate || 'Not yet'}</p>
                    </div>
                    <div className='w-full lg:w-1/2 flex items-center'>
                      <h4 className='h4-info-user'>Delivered Date: </h4>
                      <p className='p-info-user'> {shop.deliveredDate || 'Not yet'}</p>
                    </div>
                  </div>

                  {/* Step Component */}
                  <div className='mt-4'>
                    <h1 className='text-[#f18966] font-bold mb-2 text-xl'>Order Status:</h1>
                    <Steps
                      current={statuses.findIndex((status) => status.title === currentStep[index])}
                    >
                      {statuses.map((status) => (
                        <Step key={status.title} title={status.title} icon={status.icon} />
                      ))}
                    </Steps>
                  </div>

                  {/* Product List */}
                  <div className='mt-5'>
                    <h1 className=' text-[#f18966] font-bold mb-2 text-xl'>Products:</h1>
                    {shop.orderItems && Array.isArray(shop.orderItems) ? (
                      shop.orderItems.map((product, index) => {
                        // Kiểm tra nếu user đã feedback sản phẩm
                        const hasFeedbackByUser = 
                        Array.isArray(product.feedBacks) &&
                        product.feedBacks.some((feedback) => {
                          return feedback.orderId === orderId;
                        });
                        console.log(hasFeedbackByUser);
                        return (
                          <div key={product.productId} className='mb-4'>
                            {product.images && product.images.length > 0 && (
                              <img
                                src={product.images[0]}
                                alt={product.description}
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                              />
                            )}
                            <p>{product.title}</p>
                            <p>Price: ${product.price}</p>
                            <p>Quantity: {product.quantity}</p>

                            {/* Hiển thị nút Feedback nếu trạng thái là Delivered và user chưa feedback */}
                            {shop.status === 'Delivered' && !hasFeedbackByUser && (
                              <div className='mt-4 text-center'>
                                <NavLink to={`/feedbackProduct/${orderId}/${product.productId}`}>
                                  <Button
                                    className='bg-[679089]'
                                    onClick={() =>
                                      console.log(`Feedback for Product ID: ${product.productId}`)
                                    }
                                  >
                                    Leave Feedback
                                  </Button>
                                </NavLink>
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p>No products available.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </div>
  );
}
