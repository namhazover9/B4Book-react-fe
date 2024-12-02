import { CloudDownloadOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Input, message, Select, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { text } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import orderApi from '../../hooks/useOrderApi';
import { useParams } from 'react-router-dom';

export default function OrderPageOfSeller() {
  const [orders, setOrders] = useState([]); // Dữ liệu bảng
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const shopId = useParams().id;
  const [selectedSort, setSelectedSort] = useState('All Orders');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderApi.getAllOrderByShop(shopId, selectedSort); // Truyền selectedSort vào API
      setOrders(response.data.orders.map((order, index) => ({
        key: index + 1, 
        id: order._id,
        name: order.customer?.userName || "Unknown", 
        email: order.customer?.email || "N/A", 
        phoneNumber: order.customer?.phoneNumber || "N/A", 
        status: order.status || "Unknown", 
        totalPrice: `$${order.totalOrderPrice || 0}`, 
      })));
    } catch (error) {
      message.error("Now have any order"); 
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchOrders(); // Gọi API khi component được mount
  }, [shopId, selectedSort]);

  // Biến cấu hình để căn giữa
  const alignCenter = {
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
  };

  const columns = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: 'id',
      ...alignCenter,
    },
    {
      title: 'Full Name',
      width: 175,
      dataIndex: 'name',
      key: 'name',
      // fixed: 'left',
      ...alignCenter,
      render: (text, record) => <span className='text-red-500'>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
      ...alignCenter,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 125,
      ...alignCenter,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 75,
      ...alignCenter,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 100,
      ...alignCenter,
    },
    {
      title: 'Action',
      key: 'operation',
      // fixed: 'right',
      width: 100,
      ...alignCenter,
      render: () => (
        <div className='flex items-center justify-center'>
          <button className='text-base bg-teal-400 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-teal-400'>
            <SearchOutlined />
          </button>
        </div>
      ),
    },
  ];

  const onChange = (sorter) => {
    console.log('params', sorter);
  };

  return (
    <div className=''>
      <Content className='mx-2 lg:mx-5'>
        <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base'>
          <Breadcrumb.Item>Shop Page</Breadcrumb.Item>
          <Breadcrumb.Item>Order Product</Breadcrumb.Item>
        </Breadcrumb>
        <div className='p-4 min-h-96 bg-white rounded-lg'>
          <div className='header-shop-page px-5 flex items-center justify-between'>
            <h1 className='text-3xl font-semibold hidden lg:block'>Orders List</h1>
            <div className='w-full lg:w-4/5 flex flex-col items-start lg:flex-row lg:items-center justify-between'>
              <Input placeholder='Search Order ...' className='w-full lg:w-2/3 py-3' />
              <div className='mt-4 option-show'>
                <Select
                  defaultValue='Default sorting'
                  value={selectedSort}
                  onChange={(value) => setSelectedSort(value)} // Cập nhật selectedSort
                  className='w-52 mr-2'
                  options={[
                    { value: 'All Orders', label: 'All Orders' },
                    { value: 'Pending', label: 'Pending' },
                    { value: 'Confirmed', label: 'Confirmed' },
                    { value: 'Shipped', label: 'Shipped' },
                    { value: 'Delivered', label: 'Delivered' },
                    { value: 'Cancelled', label: 'Cancelled' },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className='data-shop-page my-4 lg:my-6'>
            <Table
              columns={columns}
              dataSource={orders}
              onChange={onChange}
              scroll={{
                x: 'max-content',
                y: 500,
              }}
            />
          </div>
        </div>
      </Content>
    </div>
  );
}
