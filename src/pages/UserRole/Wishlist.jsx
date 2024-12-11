import { useState, useEffect } from 'react';
import { Table, Button, Pagination, message, Spin, Popconfirm } from 'antd';
import 'antd/dist/reset.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WishlistApi from '../../hooks/useWishlistApi'; // API Hook
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';

const Wishlist = () => {
  const [wishListItems, setWishListItems] = useState([]); // Danh sách wishlist
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const userId = useSelector((state) => state.user._id); // Lấy userId từ Redux

  // Lấy dữ liệu wishlist khi mount hoặc thay đổi trang

  const fetchWishlist = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await WishlistApi.getWishlist(currentPage, 5); // Gọi API wishlist với phân trang
      if (response.data && response.data.data) {
        setWishListItems(response.data.data);
        setTotalPages(response.data.totalPages);
      } else {
        setWishListItems([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch wishlist');
    } finally {
      setLoading(false); // Dừng loading
    }
  };


  useEffect(() => {
    if (userId) {
      fetchWishlist();
    }
  }, [userId, currentPage]);
  // Xóa mục trong wishlist
  const handleDelete = async (id) => {
    try {
      const response = await WishlistApi.deleteWishlistItem(id); // API xóa sản phẩm khỏi wishlist
      console.log(response);
      if (response.message === "Product deleted from wishlist") {
        setWishListItems(wishListItems.filter((item) => item._id !== id));
        message.success('Product removed from wishlist');
        fetchWishlist();
      } else {
        message.error('Failed to remove product');
      }
    } catch (error) {
      message.error('Error deleting product from wishlist');
      console.error(error);
    }
  };

  // Cột của bảng wishlist
  const columns = [
    {
      title: 'Image',
      dataIndex: ['product', 'images'],
      key: 'images',
      render: (images) => <img src={images[0]} alt="Product" className="w-12 h-12 object-cover" />,
    },
    {
      title: 'Product Name',
      dataIndex: ['product', 'title'],
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: ['product', 'price'],
      key: 'price',
      className: 'w-[13em]',
      render: (price) => `$${price}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      className: 'w-[4em]',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to remove this item?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">
            <DeleteOutlined className='text-lg text-black hover:text-red-700  m-4' />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-4 flex flex-col shadow-xl items-center">
      <div className="w-full max-w-4xl bg-gradient-to-br from-[#eee2d8] via-[#f1eae2] to-transparent p-4 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center text-[#f18966]">Your Wishlist</h1>
        <div className="mb-5">
          <Link to="/">
            <Button className='bg-[#679089] text-white px-6 py-2 rounded'>Back</Button>
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : wishListItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">Your wishlist is empty</p>
          </div>
        ) : (
          <Table
            dataSource={wishListItems}
            columns={columns}
            rowKey="_id"
            pagination={false}
            rowHeader={"rounded-t-lg "}
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

        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            current={currentPage}
            total={totalPages * 5} // 5 là số item mỗi trang
            pageSize={5}
            onChange={(page) => setCurrentPage(page)}
            className="mt-4"
          />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
