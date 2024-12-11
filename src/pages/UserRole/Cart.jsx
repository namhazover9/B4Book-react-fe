import { useState, useEffect, useRef } from 'react';
import {
  Table,
  Button,
  Divider,
  InputNumber,
  message,
  Pagination,
  Popconfirm,
  Checkbox,
} from 'antd';
import 'antd/dist/reset.css';
import { Link, useNavigate } from 'react-router-dom';
import ShopingCartApi from '../../hooks/useShopingCart'; // Import API
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { nav, s } from 'framer-motion/client';
import { useDispatch } from 'react-redux';
import { fetchCart, setSelectedItems } from '../../reducers/carts';

const Cart = ({ onTotalPriceChange, onCartItemsChange, showUI }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Fetch cart data with pagination when component mounts or page changes
  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          const response = await ShopingCartApi.getCart(currentPage, 5);

          // Kiểm tra nếu API trả về dữ liệu
          if (response.data && response.data.data) {
            const updatedData = response.data.data.map((item) => ({
              ...item,
              shopId: item.product.shopId._id, // Lấy shopId từ product
              shopName: item.product.shopId.shopName, // Thêm shopName từ API
            }));
            console.log('Updated Data with shopId:', updatedData);
            setCartItems(updatedData);

            console.log(response.data.data);
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

  const calculateTotalPrice = () => {
    const selectedItems = cartItems.filter((item) => item.select);
    if (selectedItems.length > 0) {
      return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    const calculatedTotal = calculateTotalPrice();
    setTotalPriceBeforeDiscount(calculatedTotal);

    if (onTotalPriceChange) {
      onTotalPriceChange(calculatedTotal);
    }

    if (onCartItemsChange) {
      onCartItemsChange(cartItems);
    }
  }, [cartItems, onTotalPriceChange, onCartItemsChange]);

  const totalPriceAfterDiscount = cartItems.reduce((total, item) => {
    if (item.select) {
      const itemTotal = item.price * item.quantity;
      return total + itemTotal;
    }
    return total - discount;
  }, 0) - discount;

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
        dispatch(fetchCart());
        //message.success('Quantity updated successfully!');
      } else {
        message.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      message.error('Error updating quantity');
    }
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

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
  };

  const handleSelectChange = (id, isSelected) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, select: isSelected } : item)),
    );
  };

  const selectedItems = cartItems.filter((item) => item.select);
  //console.log('Selected items:', selectedItems);
  const handleSelectItems = (selectedItems) => {
    if (selectedItems.length === 0) {
      message.warning('Please select at least one item to checkout');

      return;
    } else {
      dispatch(setSelectedItems(selectedItems));
      navigate('/order');
    }

  };
  const columns = [
    {
      title: '',
      key: 'select',
      className: 'w-[4.5em] ',
      render: (_, record) => (
        <Checkbox
          checked={record.select}
          onChange={(e) => handleSelectChange(record._id, e.target.checked)}
        />
      ),
    },

    {
      title: 'Image',
      dataIndex: 'images',
      key: 'image',
      className: 'w-[8em] ',
      render: (images) => <img src={images[0]} alt='Product' className='w-12 h-12 object-cover' />,
    },
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
      className: 'min-w-[120px] lg:w-[15em]',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
      className: 'min-w-[80px] w-[10em] ',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      className: 'w-[7em] ',
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
            } else handleQuantityChange(record._id, value);

            // Nếu giá trị hợp lệ, gọi hàm cập nhật quantity
            return;
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
      className: '',
      render: (_, record) => (
        <Popconfirm
          title='Are you sure you want to remove this item?'
          onConfirm={() => handleDelete(record._id)} // Gọi API xóa khi xác nhận
          okText='Yes'
          cancelText='No'
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          <Button type='danger'>
            <DeleteOutlined className='text-lg text-black hover:text-red-700  m-4' />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const groupedItems = Object.entries(
    cartItems.reduce((groups, item) => {
      if (!groups[item.shopId]) {
        groups[item.shopId] = {
          products: [],
          shopSelect: false,
          shopName: item.shopName, // Thêm shopName
        };
      }
      groups[item.shopId].products.push(item);
      return groups;
    }, {}),
  ).map(([shopId, data]) => ({
    shopId,
    shopName: data.shopName,
    products: data.products,
    shopSelect: data.products.every((product) => product.select), // Tính toán shopSelect
  }));

  const handleShopSelectChange = (shopId, isSelected) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.shopId === shopId ? { ...item, select: isSelected } : item)),
    );
  };

  //const filteredShops = Object.keys(groupedItems).filter((shopId) => isInTable(shopId));

  if (!showUI)
    return (
      <div className='min-h-screen p-4 flex flex-col items-center'>
        <div className='w-full max-w-4xl bg-gradient-to-br from-[#e9e1d8] via-[#fdf6ee] to-transparent  p-4 shadow-md rounded-xl'>
          <h1 className='text-2xl text-[#f18966] font-bold mb-4 flex items-center justify-center mt-5'>
            Shopping Cart
          </h1>
          {/* <div className=' p-0'>
            <Link to='/'>
              <Button>Back</Button>
            </Link>
          </div> */}

          <div className='flex justify-end pb-4 '>
            <Popconfirm
              title='Are you sure you want to remove all items?'
              onConfirm={() => clearUserCart()} // Gọi API xóa khi xác nhận
              okText='Yes'
              cancelText='No'
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              <button
                type='primary'
                className=' w-15 h-15 sm:w-auto flex items-center justify-center rounded-lg'
              >
                <p className='text-white bg-red-500 p-2 rounded hover:bg-red-200 hover:text-red-700'>Delete All</p>
              </button>
            </Popconfirm>
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
            <div>
              <div className='flex justify-end pb-4'>
                <Popconfirm
                  title='Are you sure you want to remove all items?'
                  onConfirm={() => clearUserCart()} // Gọi API xóa khi xác nhận
                  okText='Yes'
                  cancelText='No'
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                >
                  {/* <button
                    type='primary'
                    className=' w-15 h-15 sm:w-auto flex items-center justify-center rounded-lg'
                  >
                    <p className='text-red-400 hover:text-red-700'>Delete All</p>
                  </button> */}
                </Popconfirm>
              </div>
              {groupedItems.map((group, index) => (
                <div key={index}>
                  <div className='flex items-center pl-4 p-2 bg-[#679089]  rounded-t-lg py-2'>
                    <Checkbox
                      checked={group.shopSelect}
                      onChange={(e) => handleShopSelectChange(group.shopId, e.target.checked)}
                    >
                      <span className='text-md font-bold '>{group.shopName} Shop</span>
                    </Checkbox>
                  </div>
                  <Table
                    dataSource={group.products}
                    columns={columns}
                    rowKey='_id'
                    pagination={false}
                    showHeader={false}
                    rowClassName={''}
                    scroll={{ x: 'max-content' }}
                    className="table-auto w-full border-collapse text-left text-sm bg-gray-100 text-gray-900 rounded-b-lg"
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
                  {index < groupedItems.length - 1 && <Divider />}
                </div>
              ))}
            </div>


          )}

          {discount > 0 && (
            <div className='mt-4 text-right'>
              <h3 className='text-xl font-bold text-red-500'>
                Discount Applied: -${discount.toFixed(2)}
              </h3>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className='flex flex-col sm:flex-row justify-between items-center  gap-4 mt-8'>
              <h2 className='text-md font-bold text-[#f18966] rounded-lg p-2 px-3'>
                Total Price: ${totalPriceAfterDiscount.toFixed(2)}
              </h2>
              <button
                type='primary'
                className='bg-[#679089] text-white hover:opacity-90 rounded-xl w-1/2 sm:w-auto p-2 px-3'
                // onClick={handleCheckout}
                onClick={() => handleSelectItems(selectedItems)}
              >
                CheckOut
              </button>
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
