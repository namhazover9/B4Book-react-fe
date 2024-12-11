import { CloudDownloadOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Input, message, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import orderApi from '../../hooks/useOrderApi';

export default function OrderList() {
  const [orders, setOrders] = useState([]); // Dữ liệu bảng
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const { id } = useParams(); // Lấy id từ URL
  const shopName = useParams().name;
  const navigate = useNavigate();

  // Hàm gọi API để lấy danh sách đơn hàng
  const fetchOrderList = async () => {
    setLoading(true);
    try {
      const response = await orderApi.getCustomerOrders(id);
      console.log(response.data.data);
      const orders = response.data?.data || [];
      setOrders(
        orders.map((order) => ({
          ...order,
          key: order._id, // Gán `key` cho mỗi mục
        })),
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchOrderList();
  }, [id]);

  // Cấu hình căn giữa cho bảng
  const alignCenter = {
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
  };

  // Cấu hình cột của bảng
  const columns = [
    {
      title: 'Product',
      width: 175,
      dataIndex: 'shops',
      key: 'shops',
      ...alignCenter,
      render: (shops) => {
        if (!shops || shops.length === 0) return 'N/A';
        return shops.map((shop) => (
          <div key={shop.shopId} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={shop.orderItems[0].images?.[0]}
              alt={shop.orderItems[0].title || 'Product Image'}
              style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '4px', margin: '5px' }}
            />
            <span>{shop.orderItems[0].title || 'No Title'}</span>
          </div>
        ));
      },
    },


    // {
    //   title: 'Product',
    //   width: 175,
    //   dataIndex: 'shops',
    //   key: 'shops',
    //   ...alignCenter,
    //   render: (shops) => {
    //     if (!shops || shops.length === 0) return 'N/A';
    //     return shops.map((shop) => shop.orderItems[0].title).join(', '); // Hiển thị `shopId` hoặc trường cần thiết
    //   },
    // },
    {
      title: 'Shipping Address',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
      width: 150,
      ...alignCenter,
      render: (address) => {
        if (!address) return 'N/A';
        return `${address.address}, ${address.city}, ${address.country}`;
      },
    },
    {
      title: 'Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 125,
      ...alignCenter,
      render: (date) => new Date(date).toLocaleDateString(), // Định dạng lại ngày
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 75,
      ...alignCenter,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalOrderPrice',
      key: 'totalOrderPrice',
      width: 100,
      ...alignCenter,
      render: (price) => `$${price.toFixed(2)}`, // Hiển thị định dạng giá tiền
    },
    {
      title: 'Action',
      key: 'operation',
      width: 100,
      ...alignCenter,
      render: (text, record) => (
        <div className='flex items-center justify-center'>
          <NavLink to={`/detailOrder/${record._id}`}>
            <button className='text-base bg-[#679089] text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-[#679089]'>
              <SearchOutlined />
            </button>
          </NavLink>
        </div>
      ),
    },
  ];

  return (
    <div className=''>
      <Content className='mx-2 lg:mx-5'>
        <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base'>
          <Breadcrumb.Item>Your Orders</Breadcrumb.Item>
          <Breadcrumb.Item className='text-[#f18966] font-bold'>{shopName} </Breadcrumb.Item>
        </Breadcrumb>
        <div className='p-4 min-h-96 bg-white rounded-lg'>
          <div className='header-shop-page px-5 flex items-center justify-between'>
            <h1 className='lg:text-2xl xl:text-3xl font-semibold hidden lg:block text-[#679089]'>
              Order List
            </h1>
          </div>
          <div className='data-shop-page my-4 lg:my-6'>
            <Table
              columns={columns}
              dataSource={orders}
              loading={loading}
              scroll={{
                x: 'max-content',
                y: 500,
              }}
              components={{
                header: {
                  cell: ({ children, ...restProps }) => (
                    <th {...restProps} style={{ backgroundColor: '#E6DBCD', color: 'black' }}>
                      {children}
                    </th>
                  ),
                },
                body: {
                  row: ({ children, ...restProps }) => (
                    <tr {...restProps} className="bg-white hover:bg-[#e6e4e0]  transition-colors duration-200">
                      {children}
                    </tr>
                  ),
                },
              }}
            />
          </div>
        </div>
      </Content>
    </div>
  );
}
