// eslint-disable-next-line no-unused-vars
import { Button, Carousel, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { ArrowRightOutlined, EyeOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import store1 from '../../assets/images/BestSelling/h6_banner4.jpg';
import { useEffect, useState } from 'react';
import productsApi from '../../hooks/useProductsApi';
import { addToCart } from '../../reducers/carts';
import LoadingSpinner from '../../components/loading';
import { useDispatch, useSelector } from 'react-redux';
import WishlistApi from '../../hooks/useWishlistApi';

const BookShowcase = () => {
  const cartItems = useSelector((state) => state.carts.items);
  let [stockList, setStockList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const userId = useSelector((state) => state.user._id);
  const [books, setbooks] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await productsApi.getProductHomePage();
      const fetchedBooks = Array.isArray(response.data.bestSellingProducts) ? response.data.bestSellingProducts : [];
      setbooks(fetchedBooks);

      // Sử dụng fetchedBooks trực tiếp để tạo stockList
      const stockList = fetchedBooks.map((book) => ({
        productId: book._id,
        stock: book.stock, // Tùy thuộc vào API, bạn có thể phải điều chỉnh tên trường
      }));

      setStockList(stockList);
      console.log('Stock List:', stockList);
    };

    fetchBooks();
  }, []);



  const banner = {
    id: 1,
    sologan: ' Why not send the gift of a book to family & friends.',
    title: 'Books Make Great Gifts',
    detail: '20%',
    contact: 'Shop Now',
  };
  const handleAddToCart = (productId, quantity) => {
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

    // Tìm thông tin tồn kho từ stockList
    const stockItem = stockList.find((item) => item.productId === productId);
    const stock = stockItem ? stockItem.stock : 0; // Lấy stock của sản phẩm từ stockList
    console.log('Stock:', stock);
    // Kiểm tra số lượng sản phẩm trong giỏ hàng hiện tại
    const cartItem = cartItems.find((item) => item.product === productId);
    const currentCartQuantity = cartItem ? cartItem.quantity : 0;

    // Kiểm tra tồn kho, nếu số lượng thêm vào giỏ vượt quá tồn kho, thì thông báo lỗi
    if (currentCartQuantity + quantity > stock) {
      message.error(
        `You already have ${stock} items in your shopping cart. The selected quantity cannot be added to the cart because it would exceed your purchase limit.`,
      );
      return;
    }

    const cartData = {
      productId: productId,
      quantity: quantity,
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

  const handleAddToWishlist = async (productId) => {
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
    const respone = await WishlistApi.addProductToWishList(productId);
    if (respone.status === 200) {
      message.success('Add product to wishlist successfully');
    } else {
      message.error('Product already added to wishlist');
    }
  };

  const navigate = useNavigate();
  const handleViewAll = () => {
    navigate('/products', { state: { sort: 'popularity' } });
  };


  return (
    <div className='w-full bg-white px-4 sm:px-10 lg:px-20'>
      <div className='max-w-6xl mx-auto px-4 py-5'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-3xl font-bold text-[#f18966]'>Best Selling</h2>
          <div className='hidden xl:block w-[700px] h-px bg-gray-300 shadow-md'></div>
          <button onClick={handleViewAll} className='bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-colors flex items-center gap-2 font-medium'>
            <Link to='/products'>
              View All <ArrowRightOutlined className='w-4 h-4' />
            </Link>
          </button>
        </div>

        <div className='container flex flex-col lg:flex-row w-full max-w-6xl mx-auto p-4 gap-4'>
          {/* Carousel section */}
          <div className='lg:w-2/3 overflow-hidden mb-4 lg:mb-0'>
            <Carousel
              autoplay
              dots={false}
              slidesToShow={4}
              swipeToSlide
              autoplaySpeed={3000}
              responsive={[
                {
                  breakpoint: 0,
                  settings: {
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                  },
                },
              ]}
            >
              {books.map((book, index) => (
                <div key={book._id} className='w-1/4 p-2 '>
                  <div className='group relative '>
                    <div className='relative overflow-hidden rounded-2xl '>
                      <img
                        src={book.images[0]}
                        className='w-90 h-60 object-cover transition-all ease-in-out duration-300 '
                      />
                      <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                        <div className='absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4'>
                          <button className='flex justify-center p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transform translate-x-10 group-hover:translate-x-0 duration-300 shadow-lg'>
                            <HeartOutlined
                              onClick={() => handleAddToWishlist(book._id)}
                              className='w-6 h-6 flex justify-center items-center text-black-500'
                            />
                          </button>
                          <button className='flex justify-center items-center px-2 py-3 bg-white rounded-full hover:bg-red-500 hover:text-white transform translate-x-10 group-hover:translate-x-0 duration-300 delay-75 shadow-lg'>
                            <Link to={`/details/${book._id}`}>
                              <EyeOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                            </Link>
                          </button>
                          <button
                            className={`flex justify-evenly items-center px-1 py-3 bg-white rounded-full ${addingToCart
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-red-500 hover:text-white'
                              } transition-all transform translate-x-10 group-hover:translate-x-0 duration-300 delay-150 shadow-lg`}
                            onClick={() => handleAddToCart(book._id, quantity)}
                            disabled={addingToCart}
                          >
                            {addingToCart ? (
                              <Spin size='small' />
                            ) : (
                              <ShoppingCartOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='mt-3 text-left'>
                      <h3 className='text-lg font-semibold truncate hover:text-red-400'>
                        <button>{book.title}</button>
                      </h3>
                      <p className='text-gray-600 text-sm hover:text-red-600 truncate text-left'>
                        <button className='truncate block'>{book.author}</button>
                      </p>
                      <p className='text-red-500 font-bold mt-1'>{book.price}</p>
                      <div className='flex items-center mt-1'>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${i < book.ratingResult ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                        <span className='ml-1 text-gray-500 text-sm'>5</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Banner section */}
          <div className='lg:w-1/3 hidden lg:block'>
            <div className='relative aspect-square rounded-2xl overflow-hidden '>
              <img src={store1} alt='Banner' className='w-full h-full object-cover ' />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'>
                <div className='absolute inset-0 flex flex-col justify-start items-start text-white p-6'>
                  <h2 className='text-2xl sm:text-2xl font-bold break-words w-3/4'>
                    {banner.title}
                  </h2>
                  <div className='text-4xl sm:text-5xl font-bold mb-4'>{banner.detail} Off</div>
                  <h3 className='text-base sm:text-lg mb-2'>{banner.sologan}</h3>
                  <p className='text-sm sm:text-xl text-white/80 hover:text-yellow-400 underline decoration-dotted'>
                    <Link to='/products'>
                      <button className='hover:underline'>{banner.contact}</button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookShowcase;