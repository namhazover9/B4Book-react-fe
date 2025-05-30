import React, { useState, useEffect } from 'react';
import { Rate, Button, InputNumber, Tag, message, Carousel } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  PinterestOutlined,
} from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import productsApi from '../../hooks/useProductsApi';
import ShopingCartApi from '../../hooks/useShopingCart'; // Import API
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../reducers/carts';
import WishlistApi from '../../hooks/useWishlistApi';

const Details = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [product, setProduct] = useState(null); // Lưu dữ liệu sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const userId = useSelector((state) => state.user._id);
  const cartItems = useSelector((state) => state.carts.items); // Đảm bảo cartItems là mảng
  const [feedbacks, setFeedbacks] = useState([]); // Lưu trữ danh sách feedback
  const [feedbackLoading, setFeedbackLoading] = useState(true); // Trạng thái tải feedback
  let [stockList, setStockList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setFeedbackLoading(true);
        const response = await productsApi.showAllFeedbacks(id);
        console.log(response.data);
        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setFeedbacks([]); // Gán giá trị mặc định trong trường hợp lỗi
      } finally {
        setFeedbackLoading(false);
      }
    };

    fetchFeedbacks();
  }, [id]);

  useEffect(() => {
    console.log('Feedbacks:', feedbacks);
  }, [feedbacks]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsApi.getProductById(id); // Gọi API
        setProduct(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };
    fetchProduct();
  }, [id]); // Chỉ gọi lại khi `id` thay đổi

  const handleAddToCart = () => {
    if (!userId) {
      message.warning(
        <div className='p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md shadow-md flex items-center'>
          <span className='mr-2 font-medium'>Please</span>
          <button
            onClick={() => navigate('/login')}
            className='text-blue-600 underline font-semibold hover:text-blue-800'
          >
            login
          </button>
          <span className='ml-2'>to add products to your cart.</span>
        </div>,
      );
      return;
    }

    // Lấy số lượng sản phẩm hiện tại trong giỏ hàng
    const cartItem = cartItems.find((item) => item.product === product._id);
    const currentCartQuantity = cartItem ? cartItem.quantity : 0;

    // Kiểm tra tồn kho
    if (currentCartQuantity + quantity > product.stock) {
      message.error(
        `You already have ${product.stock} items in your shopping cart. The selected quantity cannot be added to the cart because it would exceed your purchase limit.`,
      );
      return;
    }

    const cartData = {
      productId: product._id,
      quantity: quantity, // Sử dụng số lượng được kiểm tra
    };

    dispatch(addToCart(cartData))
      .then(() => {
        message.success('Product successfully added to cart!');
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
        message.error('Failed to add product to cart. Please try again.');
      });
  };

  const handleQuantityChange = (value) => {
    if (value > product.stock) {
      message.warning(`Quantity cannot exceed available stock (${product.stock})`);
      setQuantity(product.stock); // Giới hạn tối đa
    } else if (value < 1) {
      setQuantity(1); // Giới hạn tối thiểu
    } else {
      setQuantity(value);
    }
  };

  if (loading) {
    return <p className='text-center text-gray-500'>Loading...</p>;
  }

  if (!product) {
    return <p className='text-center text-gray-500'>Product not found</p>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <p className='text-gray-700 text-sm'>
            {product.description || 'No description available.'}
          </p>
        );

      case 'additional-info':
        return (
          <div className='overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md'>
            <table className='min-w-full table-auto'>
              <tbody>
                <tr>
                  <td className='border px-4 py-2 font-medium'>Author</td>
                  <td className='border px-4 py-2'>Maria Ozawa</td>
                </tr>
                <tr>
                  <td className='border px-4 py-2 font-medium'>Category</td>
                  <td className='border px-4 py-2'>Horror</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'reviews':
        return (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Customer Reviews</h3>
            {feedbackLoading ? (
              <p className='text-center text-gray-500'>Loading reviews...</p>
            ) : feedbacks.length === 0 ? (
              <p className='text-center text-gray-500'>No reviews available for this product.</p>
            ) : (
              feedbacks.map((feedback, index) => (
                <div key={index} className='p-4 bg-gray-50 rounded-md shadow-sm'>
                  <div className='flex justify-between'>
                    <p className='text-sm font-semibold'>{feedback.userName}</p>
                    <p className='text-sm text-gray-500'>
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Rate disabled defaultValue={feedback.rating} className='text-sm' />
                  <p className='text-sm mt-2 text-gray-700'>{feedback.comment}</p>
                </div>
              ))
            )}

            {/* Form thêm review (có thể thêm nếu cần)
            <form className='mt-6 space-y-4'>
              <h4 className='font-semibold text-gray-700'>Write a review:</h4>
              <Rate allowHalf className='text-sm' />
              <textarea
                className='w-full p-2 border border-gray-300 rounded-md text-sm'
                rows='3'
                placeholder='Your review'
              ></textarea>
              <div className='flex space-x-4'>
                <input
                  type='text'
                  placeholder='Your name'
                  className='flex-1 p-2 border border-gray-300 rounded-md text-sm'
                />
                <input
                  type='email'
                  placeholder='Your email'
                  className='flex-1 p-2 border border-gray-300 rounded-md text-sm'
                />
              </div>
              <Button type='primary' className='bg-blue-500'>
                Submit
              </Button>
            </form> */}
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };
  const CheckStock = () => {
    const cartItem = cartItems.find((item) => item.product === product._id);
    const currentCartQuantity = cartItem ? cartItem.quantity : 0;
    if (currentCartQuantity + quantity > product.stock) {
      return (
        <Tag color='red'>OUT STOCK</Tag>
      )
    }
    else {
      return (<Tag color='green'>IN STOCK</Tag>)
    }
  }

  const handleAddToWishlist = async () => {
    if (!userId) {
      message.warning(
        <div className='p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md shadow-md flex items-center'>
          <span className='mr-2 font-medium'>Please</span>
          <button
            onClick={() => navigate('/login')}
            className='text-blue-600 underline font-semibold hover:text-blue-800'
          >
            login
          </button>
          <span className='ml-2'>to add products to your wishlist.</span>
        </div>,
      );
      return;
    }

    const respone = await WishlistApi.addProductToWishList(product._id);
    if (respone.status === 200) {
      message.success('Add product to wishlist successfully');
    } else {
      message.error('Product already added to wishlist');
    }
  };


  return (
    <div className=' bg-gray-100  p-6 flex flex-col text-black items-center text-xl'>
      <div className='container mx-auto w-[75%] h-[75%] px-6 py-4 bg-white rounded-2xl shadow-md pt-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Left Section: Product Image */}
          <div className='relative max-w-screen-lg'>
            <Carousel autoplay arrows dots={false} swipeToSlide autoplaySpeed={3000}>
              {product.images.slice(0, 2).map((image, index) => (
                <div className=''>
                  <img
                    key={index}
                    src={image || 'https://via.placeholder.com/300'}
                    alt={`Book Cover ${index + 1}`}
                    className='rounded-xl w-72 h-130 mx-auto md:w-full'
                  />
                </div>
              ))}
            </Carousel>

            <Tag color='yellow' className='absolute top-4 left-4 text-black font-bold'>
              -30%
            </Tag>
          </div>

          {/* Right Section: Product Details */}
          <div className='space-y-8 bg-[#E6DBCD] shadow-md p-5 rounded-xl'>
            <div className='space-y-4'>
              {CheckStock()}
              <h1 className='text-xl font-bold md:text-3xl'>{product.title}</h1>

              <p className=' mt-9'>
                Author: <span className='font-medium'>{product.author || 'Unknown'}</span>
              </p>
              <p className=''>
                Publisher: <span className='font-medium'>{product.publisher || 'Unknown'}</span>
              </p>
            </div>

            {/* Price */}
            <div className='flex items-center space-x-4'>
              <p className='text-xl text-red-500 font-bold'>${product.price}</p>
              {product.originalPrice && (
                <p className='text-gray-400 line-through'>${product.originalPrice}</p>
              )}
            </div>

            {/* Rating */}
            <div className='flex flex-col'>
              <Rate allowHalf value={product.rating || 5} disabled />
              <span className='font-medium pt-4 italic'>
                <span className='text-blue-600 '>{product.stock}</span> products available
              </span>
            </div>

            {/* Quantity and Buttons */}
            <div className='flex items-center space-x-4'>
              <InputNumber
                min={1}
                //max={product.stock} // Giới hạn max bằng stock
                value={quantity}
                onChange={handleQuantityChange} // Thay đổi logic xử lý
                className='w-20'
              />

              <button type='primary' className='bg-[#679089] text-sm text-white hover:bg-[#5d948a] p-[0.4em] px-2 rounded-md' onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className='text-md hover:text-xl'>
                <HeartOutlined
                  onClick={handleAddToWishlist}
                  className='text-red-400 hover:text-red-700 w-6 h-6'
                />
              </button>

            </div>
            {/* Categories and Tags */}
            <div className='mt-4'>
              <p className='text-md '>
                Categories:{' '}
                <span className='font-medium'>
                  {Array.isArray(product.category) && product.category.length > 0
                    ? product.category.join(', ')
                    : 'N/A'}
                </span>
              </p>
            </div>


          </div>
        </div>

        {/* Tabs Section */}
        <div className='mt-6'>
          <div className='border-b'>
            <nav className='-mb-px flex space-x-8'>
              <button
                className={`py-2 px-1 border-b-2 text-sm font-medium ${activeTab === 'description'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-500 hover:text-blue-500'
                  }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-2 px-1 border-b-2 text-sm font-medium ${activeTab === 'reviews'
                  ? 'border-gray-500 text-gray-500'
                  : 'border-transparent text-gray-500 hover:text-gray-500'
                  }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews (5)
              </button>
            </nav>
          </div>
          <div className='mt-4'>{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Details;
