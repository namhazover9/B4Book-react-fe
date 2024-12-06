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

const Details = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [product, setProduct] = useState(null); // Lưu dữ liệu sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const userId = useSelector((state) => state.user._id);
  const cartItems = useSelector((state) => state.carts.items); // Đảm bảo cartItems là mảng

  const dispatch = useDispatch();

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
      message.error(`You already have ${product.stock} items in your shopping cart. The selected quantity cannot be added to the cart because it would exceed your purchase limit.`);
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
            <div className='space-y-4'>
              {[
                {
                  name: 'John Middleton',
                  date: 'February 15, 2023',
                  rating: 5,
                  comment:
                    "I can't believe how perfect this book is. The twists and turns are just amazing!",
                },
                {
                  name: 'Kenneth G. Myers',
                  date: 'February 15, 2023',
                  rating: 4,
                  comment:
                    'Fantastic read for anyone interested in sci-fi. Could use a bit more character development, but still great!',
                },
                {
                  name: 'Hilda Addington',
                  date: 'February 15, 2023',
                  rating: 4.5,
                  comment: 'Great quality and engaging story! Highly recommend it.',
                },
                {
                  name: 'Ervin Arrington',
                  date: 'February 15, 2023',
                  rating: 5,
                  comment: 'This book kept me up all night. Truly a page-turner.',
                },
                {
                  name: 'Patricia M. Newman',
                  date: 'February 15, 2023',
                  rating: 4.5,
                  comment: 'Wonderful design and engaging story. Loved it!',
                },
              ].map((review, index) => (
                <div key={index} className='p-4 bg-gray-50 rounded-md shadow-sm'>
                  <div className='flex justify-between'>
                    <p className='text-sm font-semibold'>{review.name}</p>
                    <p className='text-sm text-gray-500'>{review.date}</p>
                  </div>
                  <Rate disabled defaultValue={review.rating} className='text-sm' />
                  <p className='text-sm mt-2 text-gray-700'>{review.comment}</p>
                </div>
              ))}
            </div>
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
            </form>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className=' bg-gray-100  p-6 flex flex-col items-center'>
      <div className='container mx-auto w-[75%] h-[75%] px-6 py-4 bg-white rounded-2xl shadow-md pt-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Left Section: Product Image */}
          <div className='relative max-w-screen-lg'>
            <Carousel
              autoplay
              arrows
              dots={false}
              swipeToSlide
              autoplaySpeed={3000}
            >
              {product.images.slice(0, 2).map((image, index) => (
                <div className="">
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
          <div className='space-y-4 bg-white p-5'>
            <div>
              <Tag color='green'>IN STOCK</Tag>
              <h1 className='text-xl font-bold md:text-2xl'>{product.title}</h1>

              <p className='text-gray-500'>
                Author: <span className='font-medium'>{product.author || 'Unknown'}</span>
              </p>
              <p className='text-gray-500'>
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

              <Button type='primary' className='bg-blue-500 text-sm' onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <button><HeartOutlined className=' hover:text-red-600' />
              </button>
            </div>
            {/* Categories and Tags */}
            <div className='mt-4'>
              <p className='text-sm text-gray-500'>
                Categories:{' '}
                <span className='font-medium'>
                  {Array.isArray(product.category) && product.category.length > 0
                    ? product.category.join(', ')
                    : 'N/A'}
                </span>
              </p>

              <p className='text-sm text-gray-500'>
                Tags: <span className='font-medium'>{product.tags?.join(', ') || 'N/A'}</span>
              </p>
            </div>

            {/* Social Media Icons */}
            <div className='mt-4 flex space-x-4'>
              <FacebookOutlined className='text-blue-600 text-xl' />
              <TwitterOutlined className='text-blue-400 text-xl' />
              <LinkedinOutlined className='text-blue-700 text-xl' />
              <PinterestOutlined className='text-red-600 text-xl' />
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
