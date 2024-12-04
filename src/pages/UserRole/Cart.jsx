import { useState, useEffect, useRef } from 'react';
import { Table, Button, Divider, InputNumber, message, Pagination, Popconfirm } from 'antd';
import 'antd/dist/reset.css';
import { Link } from 'react-router-dom';
import ShopingCartApi from '../../hooks/useShopingCart'; // Import API
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons';

const Cart = ({ onTotalPriceChange, onCartItemsChange, showUI }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const userId = useSelector((state) => state.user._id);

  // Fetch cart data with pagination when component mounts or page changes
  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          const response = await ShopingCartApi.getCart(currentPage, 5);

          // Kiểm tra nếu API trả về dữ liệu
          if (response.data && response.data.data) {
            setCartItems(response.data.data);

            //console.log('Stock:', response.data.data[0].product.stock);
            setTotalPages(response.data.totalPages);
          } else {
            // Xử lý khi không có dữ liệu
            setCartItems([]);
            setTotalPages(0);
          }
        } catch (error) {
          console.error(error);
          setCartItems([]); // Giỏ hàng trống khi có lỗi
          message.error('Failed to fetch cart data');
        } finally {
          setLoading(false); // Đảm bảo spinner dừng chạy
        }
      };

      setLoading(true); // Bắt đầu loading
      fetchCart();
    }
  }, [userId, currentPage]);

  useEffect(() => {
    const calculatedTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    setTotalPriceBeforeDiscount(calculatedTotal);

    if (onTotalPriceChange) {
      onTotalPriceChange(calculatedTotal);
    }

    if (onCartItemsChange) {
      onCartItemsChange(cartItems);
    }
  }, [cartItems, onTotalPriceChange, onCartItemsChange]);

  const totalPriceAfterDiscount = totalPriceBeforeDiscount - discount;

  // Handle quantity change
  const handleQuantityChange = async (id, quantity) => {
    try {
      const itemToUpdate = cartItems.find((item) => item._id === id);

      if (!itemToUpdate) {
        console.error('Item not found in cart');
        message.error('Item not found');
        return;
      }

      // Nếu số lượng hợp lệ, gọi API cập nhật
      const response = await ShopingCartApi.updateCartItemQuantity(id, quantity);
      if (response.status === 'success') {
        setCartItems(
          cartItems.map((item) =>
            item._id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item,
          ),
        );
        //message.success('Quantity updated successfully!');
      } else {
        message.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      message.error('Error updating quantity');
    }
  };
  const handleShopChange = (storeIndex) => {
    // setStores((prevStores) =>
    //   prevStores.map((store, index) => {
    //     if (index === storeIndex) {
    //       const newChecked = !store.checked;
    //       return {
    //         ...store,
    //         checked: newChecked,
    //         products: store.products.map((product) => ({
    //           ...product,
    //           checked: newChecked,
    //         })),
    //       };
    //     }
    //     return store;
    //   })
    // );
  };
  const handleItemChange = (storeIndex, productIndex) => {
    // setStores((prevStores) =>
    //   prevStores.map((store, index) => {
    //     if (index === storeIndex) {
    //       return {
    //         ...store,
    //         products: store.products.map((product, pIndex) => {
    //           if (pIndex === productIndex) {
    //             return {
    //               ...product,
    //               checked: !product.checked,
    //             };
    //           }
    //           return product;
    //         }),
    //       };
    //     }
    //     return store;
    //   })
    // );
  };

  const clearUserCart = async () => {
    try {
      await ShopingCartApi.clearCart(userId);
      setCartItems([]); // Cập nhật trạng thái giỏ hàng
      console.log('Giỏ hàng đã được xóa.');
      message.success('All products deleted');
    } catch (error) {
      console.error('Không thể xóa giỏ hàng:', error);
    }
  };

  // Handle item deletion
  const handleDelete = async (id) => {
    try {
      const response = await ShopingCartApi.deleteProductFromCart(id);

      if (response.status === 'success') {
        setCartItems(cartItems.filter((item) => item._id !== id)); // Xóa sản phẩm khỏi danh sách
        message.success('Product removed from cart');
      } else {
        message.error('Failed to remove product');
      }
    } catch (error) {
      message.error('Error deleting product from cart');
      console.error(error);
    }
  };

  // const handleUpdateItems = () => {
  //   console.log('Updating items:', cartItems);
  //   message.success('Cart updated successfully!');
  // };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
  };

  const columns = [
    {
      title: 'Select',
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'image',
      render: (images) => <img src={images[0]} alt='Product' className='w-12 h-12 object-cover' />,
    },
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
      className: 'min-w-[120px]',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
      className: 'min-w-[80px]',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          //max={record.product.stock} // Giới hạn max để không thể nhập giá trị vượt quá stock
          value={record.quantity}
          onChange={(value) => {
            // Kiểm tra ngay giá trị nhập vào và hiển thị thông báo nếu vượt quá stock
            if (value > record.product.stock) {
              message.error(`Quantity cannot exceed available stock (${record.product.stock})`);
              handleQuantityChange(record._id, record.product.stock);
              return; // Không tiếp tục thực hiện cập nhật nếu vượt quá stock
            }

            // Nếu giá trị hợp lệ, gọi hàm cập nhật quantity
              handleQuantityChange(record._id, value); 

          }}
          className='w-16'
        
        />
      ),
    },

    {
      title: 'Total',
      key: 'total',
      render: (_, record) => `$${record.price * record.quantity}`,
      className: 'min-w-[80px]',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title='Are you sure you want to remove this item?'
          onConfirm={() => handleDelete(record._id)} // Gọi API xóa khi xác nhận
          okText='Yes'
          cancelText='No'
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          <Button type='danger'>
            <CloseOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const groupedItems = cartItems.reduce((groups, item) => {
    if (!groups[item.shop]) groups[item.shop] = [];
    groups[item.shop].push(item);
    return groups;
  }, {});

  if (!showUI)
    return (
      <div className='min-h-screen bg-gray-100 p-4 flex flex-col items-center'>
        <div className='w-full max-w-4xl bg-white p-4 shadow-md rounded-lg'>
          <h1 className='text-2xl font-bold mb-4 flex items-center justify-center'>
            Shopping Cart
          </h1>
          <div className='mb-5 p-0'>
            <Link to='/'>
              <Button>Back</Button>
            </Link>
          </div>
          {loading ? (
            <div className='flex justify-center items-center py-10'>
              <Spin size='large' tip='Đang tải dữ liệu...' />
            </div>
          ) : cartItems.length === 0 ? (
            <div className='text-center py-10'>
              <p className='text-lg text-gray-500'>Cart is empty</p>
            </div>
          ) : (
            Object.keys(groupedItems).map((shop, index) => (
              <div key={index}>
                <div className='flex justify-between items-center mb-2'>
                  <h2 className='text-lg font-bold'>{shop}</h2>
                  <Popconfirm
                    title='Are you sure you want to remove this item?'
                    onConfirm={() => clearUserCart()} // Gọi API xóa khi xác nhận
                    okText='Yes'
                    cancelText='No'
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    <button
                      type='primary'
                      className='bg-red-500 hover:bg-red-600 w-10 h-10 sm:w-auto flex items-center justify-center rounded-lg'
                    >
                      <DeleteOutlined className='text-xl text-white m-4' />
                    </button>
                  </Popconfirm>
                </div>

                <Table
                  dataSource={groupedItems[shop]}
                  columns={columns}
                  rowKey='_id'
                  rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: shop.cartItems
                  }}
                  pagination={false}
                  bordered
                  scroll={{ x: 'max-content' }}
                />
                {index < Object.keys(groupedItems).length - 1 && <Divider />}
              </div>
            ))
          )}

          {discount > 0 && (
            <div className='mt-4 text-right'>
              <h3 className='text-xl font-bold text-red-500'>
                Discount Applied: -${discount.toFixed(2)}
              </h3>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-4'>
              <h2 className='text-xl font-bold'>
                Total Price: ${totalPriceAfterDiscount.toFixed(2)}
              </h2>

              <Button
                type='primary'
                className='bg-red-500 hover:bg-red-600 w-full sm:w-auto'
                onClick={handleCheckout}
              >
                <Link to='/order'>Checkout</Link>
              </Button>
            </div>
          )}

          {/* Pagination */}
          {cartItems.length > 0 && (
            <Pagination
              current={currentPage}
              total={totalPages * 10} // Số lượng mục mỗi trang * tổng số trang
              pageSize={10}
              onChange={(page) => setCurrentPage(page)} // Cập nhật trang khi người dùng chuyển trang
              className='mt-4'
            />
          )}
        </div>
      </div>
    );
};

export default Cart;
