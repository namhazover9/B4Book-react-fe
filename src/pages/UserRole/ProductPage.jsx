import {
  BarsOutlined,
  EyeOutlined,
  HeartOutlined,
  QrcodeOutlined,
  ReadOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Card, Checkbox, Menu, Pagination, Select, Slider, Spin, Switch, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/loading';
import productsApi from '../../hooks/useProductsApi';
import { addToCart } from '../../reducers/carts';
import WishlistApi from '../../hooks/useWishlistApi';

export default function ProductPage() {
  const [filterBooks, setFilterBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [bookList, setBookList] = useState([]);
  const [booksPerPage, setBooksPerPage] = useState(10); // Số sách mặc định mỗi trang
  const [quantity, setQuantity] = useState(1); // State để lưu số lượng sản phẩm
  const cartItems = useSelector((state) => state.carts.items); // Đảm bảo cartItems là mảng
  let [stockList, setStockList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState(''); // State for the search keyword
  const hardcodedCategories = [
    'ChristianLiving',
    'ChurchHistory',
    'Educational Curriculum',
    'Fiction & Fantasy',
    'Religion & Spirituality',
    'Romance',
    'Literature & Fiction',
    'Biographies & Memoirs',
    'Children Book',
    'Novel/Light Novel',
    'Self-help',
    'Literary Fiction',
    'Biography/Autobiography',
    'Cookbooks',
    'History',
    'Graphic Novels/Comic',
    'Poetry',
    'Business',
    'Philosophy',
    'Travel',
    'Novel/Light Novel'
  ];
  const [addingToCart, setAddingToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedSort, setSelectedSort] = useState('default');

  const location = useLocation();

  useEffect(() => {
    // Kiểm tra nếu có state được truyền qua
    if (location.state?.sort) {
      setSelectedSort(location.state.sort); // Gán giá trị `sort` từ state
    }
  }, [location.state]);

  const userId = useSelector((state) => state.user._id);
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await productsApi.getAllProducts({
        category: selectedCategories.join(','),
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        author: selectedAuthors.join(','),
        page: currentPage,
        limit: booksPerPage,
        sort: selectedSort,
      });
      const data = response.data;
      setBookList(data.data);
      console.log(data.data);

      stockList = data.data.map((book) => ({
        productId: book._id,
        stock: book.stock, // Tùy thuộc vào API, bạn có thể phải điều chỉnh tên trường
      }));
      setStockList(stockList);
      console.log('Stock List:', stockList);
      setFilterBooks(data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filtered books based on the search keyword
  const searchBooks = async (keyword) => {
    setLoading(true);
    try {
      const response = await productsApi.searchProducts(keyword);
      const data = await response.data;
      setBookList(data);
      setFilterBooks(data);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
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
    //console.log('Stock:', stock);
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

  // Call fetchBooks when the component first loads
  useEffect(() => {
    fetchBooks();
  }, [currentPage, priceRange, selectedCategories, selectedAuthors, selectedSort, booksPerPage]);

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() === '') {
      // If search keyword is empty, fetch all products
      fetchBooks();
    } else {
      // Fetch products based on the search keyword
      searchBooks(keyword);
    }
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value); // Cập nhật priceRange khi người dùng thay đổi thanh trượt
  };

  // Sửa categoryItems để có thể chọn và bỏ chọn danh mục
  const categoryItems = hardcodedCategories.map((category, index) => ({
    key: `category-${index}`,
    label: (
      <Checkbox
        value={category}
        onChange={(e) => handleCategoryChange(e, category)} // Xử lý sự kiện chọn/deselect
      >
        {category}
      </Checkbox>
    ),
  }));

  // Hàm để xử lý sự kiện thay đổi danh mục
  const handleCategoryChange = (e, category) => {
    let updatedCategories;
    if (e.target.checked) {
      updatedCategories = [...selectedCategories, category]; // Thêm vào danh mục đã chọn
    } else {
      updatedCategories = selectedCategories.filter((cat) => cat !== category); // Loại bỏ danh mục không chọn
    }
    setSelectedCategories(updatedCategories); // Cập nhật selectedCategories
  };

  const categorys = [
    {
      key: 'sub1',
      label: 'Categories',
      icon: <ReadOutlined />,
      children: categoryItems,
    },
  ];

  // Filter by Price
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked) => {
    setDisabled(checked);
  };

  // View Change
  const [viewMode, setViewMode] = useState('block');

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;
      if (isSmallScreen) {
        setViewMode('line');
      } else {
        setViewMode('block');
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [expandedItems, setExpandedItems] = useState({});
  const [isTruncated, setIsTruncated] = useState({});

  const toggleDescription = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleTitle = (index) => {
    setIsTruncated((prev) => ({
      ...prev,
      [index]: !(prev[index] ?? true),
    }));
    console.log(index);
  };

  return (
    <div className='container mx-auto'>
      <div className='header my-5 p-5 sm:p-10 flex justify-center sm:justify-between items-center bg-gradient-to-tl from-[#f8f4ef] to-transparent'>
        <h1 className='hidden sm:block text-2xl text-red-500 font-medium'>
          <h1 className='text-lg text-black sm:hidden md:block font-bold'>Welcome to</h1> <span className=' text-[#F18966] sm:hidden md:block  font-bold'>Books Page!</span>
        </h1>
        <div className='flex w-4/5 py-1 sm:w-1/2 md:w-2/3 items-center border rounded-full px-2 sm:px-3 sm:py-3 bg-gray-100'>
          <input
            type='text'
            value={searchKeyword}
            onChange={handleSearchChange} // Handle search input change
            placeholder='Search products...'
            className='flex-grow outline-none text-sm sm:text-base bg-gray-100 text-gray-700 px-2'
          />
          <SearchOutlined className='text-white cursor-pointer text-lg sm:text-xl bg-[#679089] p-2 rounded-full transition-transform duration-300 transform hover:scale-110' />
        </div>
      </div>
      <div className='flex flex-col lg:flex-row justify-between md:items-center lg:items-start'>
        <div className='mx-5 lg:mx-0 list-books lg:w-1/6 flex flex-col md:w-11/12 md:mx-52'>
          <div className='genre'>
            <div className='genre-ipad hidden lg:block'>
              <Menu
                className='h-100 overflow-y-auto'
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode='inline'
                items={categorys}
              />
            </div>
            <div className='genre-phone lg:hidden w-11/12 mx-auto'>
              <Select
                mode='multiple'
                className='w-full'
                value={selectedCategories}
                onChange={(value) => setSelectedCategories(value)} // Cập nhật selectedCategories khi người dùng thay đổi
                options={hardcodedCategories.map((category) => ({
                  label: category,
                  value: category,
                }))}
              />
            </div>
          </div>
          <div className='hidden lg:block'>
            <br />
          </div>
          <div className='price'>
            <div className='price-ipad hidden lg:block'>
              <Card
                title='Filter by Price'
                className='h-auto overflow-y-auto bg-gray-50'
                bordered={false}
              >
                <Slider
                  range
                  value={priceRange}
                  onChange={handlePriceRangeChange} // Xử lý khi người dùng thay đổi thanh trượt
                  max={200000}
                  disabled={disabled}
                />
                <div className='flex justify-between mt-2'>
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>

                <div className='my-5'>
                  Disabled:{' '}
                  <Switch
                    size='small'
                    checked={disabled}
                    onChange={(checked) => setDisabled(checked)}
                  />
                </div>
              </Card>
            </div>
            <div className='price-phone lg:hidden mx-5 mt-5'>
              <Slider
                range
                defaultValue={priceRange}
                onChange={handlePriceRangeChange}
                max={200000}
                className='w-full md:w-5/6 mx-auto'
                disabled={disabled}
              />
              <div className='flex justify-between md:w-5/6 mt-2 mx-auto'>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <div className='md:w-5/6 my-1 mx-auto'>
                Disabled:{' '}
                <Switch
                  size='small'
                  checked={disabled}
                  onChange={(checked) => setDisabled(checked)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='all-books w-full md:w-11/12 lg:w-5/6 lg:ml-4 sm:flex flex-col items-center'>
          <div className='header-all-books flex justify-between items-center mx-4 my-2 lg:my-0 lg:w-11/12'>
            <div className='option-form-left flex items-center w-1/12 justify-end lg:justify-start'>
              <QrcodeOutlined
                className={`md:mr-2 choice-icon-tnvd ${viewMode === 'block' ? 'text-blue-500' : ''
                  }`}
                onClick={() => handleViewModeChange('block')}
              />
              <BarsOutlined
                className={`choice-icon-tnvd hidden md:block ${viewMode === 'line' ? 'text-blue-500' : ''
                  }`}
                onClick={() => handleViewModeChange('line')}
              />
            </div>
            <div className='options-right flex justify-between items-center'>
              <div className='option-show'>
                <Select
                  defaultValue='Default sorting'
                  value={selectedSort}
                  onChange={(value) => setSelectedSort(value)} // Cập nhật selectedSort khi người dùng thay đổi
                  className='w-44 mr-2'
                  options={[
                    { value: 'default', label: 'Default sorting' },
                    { value: 'popularity', label: 'Sort by popularity' },
                    { value: 'averageRating', label: 'Sort by average rating' },
                    { value: 'latest', label: 'Sort by latest' },
                    { value: 'priceLowToHigh', label: 'Sort by price: low to high' },
                    { value: 'priceHighToLow', label: 'Sort by price: high to low' },
                  ]}
                />
              </div>
              <div className='option-number-books-show'>
                <Select
                  defaultValue='Show 10'
                  value={`Show ${booksPerPage}`} // Hiển thị số lượng sách đang chọn
                  onChange={(value) => setBooksPerPage(parseInt(value.replace('Show ', '')))} // Cập nhật booksPerPage khi người dùng thay đổi
                  className='w-28'
                  options={[
                    { value: 'Show 5', label: 'Show 5' },
                    { value: 'Show 10', label: 'Show 10' },
                    { value: 'Show 20', label: 'Show 20' },
                    { value: 'Show 50', label: 'Show 50' },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className='horizontal-line bg-slate-200 h-px w-11/12 my-2 mx-10'></div>
          <div className=''>
            {loading ? (
              <div className='flex justify-center items-center h-screen'>
                <div className='text-center'>
                  <LoadingSpinner />
                </div>
              </div>
            ) : (
              <div className=''>
                {viewMode === 'block' ? (
                  <div className='list-by-block sm:w-11/12 xl:w-full mx-auto'>
                    {bookList.length === 0 ? (
                      <div className='not-found'>
                        <h2 className='text-center my-20'>
                          No books found matching the selected filters.
                        </h2>
                      </div>
                    ) : (
                      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-2 '>
                        {bookList.map((book, index) => {
                          const imageUrl = book.images[0] ? book.images[0] : '';
                          return (
                            <div
                              className='flex flex-col sm:flex-row justify-between items-start '
                              key={index}
                            >
                              <div
                                id={index}
                                className='bg-gradient-to-tl from-[#f8f4ef] to-transparent w-11/12 sm:w-full h-auto p-3 rounded-lg transition duration-500 ease-in-out hover:shadow-md sm:mb-4'
                              >
                                <div className='relative group overflow-hidden rounded-lg mb-4'>
                                  <img
                                    src={imageUrl}
                                    alt={book.title}
                                    className='w-full h-96 object-cover'
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
                                        disabled={addingToCart} // Vô hiệu hóa khi đang thêm
                                      >
                                        {addingToCart ? (
                                          <Spin size='small' /> // Icon loading từ Ant Design
                                        ) : (
                                          <ShoppingCartOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <p
                                  className={`text-xl font-bold mb-1 text-[#F18966] ${isTruncated[index] ?? true ? 'truncate' : ''
                                    }`}
                                  onClick={() => toggleTitle(index)}
                                >
                                  {book.title}
                                </p>

                                <div className='flex flex-col justify-between items-start mr-5 space-y-1'>
                                  <p className='text-base text-gray-600 truncate'>{book.author}</p>
                                </div>
                                <div className='flex my-1 items-center'>
                                  {/* Vòng lặp tạo sao */}
                                  {[...Array(5)].map((_, index) => (
                                    <span
                                      key={index}
                                      className={`text-xl ${index < book.ratingResult
                                        ? 'text-yellow-500'
                                        : 'text-gray-300'
                                        }`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                  <span className='text-[#F18966] text-base ml-2'>{book.ratingResult}</span>
                                </div>

                                <div className='flex items-center justify-between mb-2'>
                                  <div className='flex items-center'>
                                    <p className='text-sm text-gray-600'>
                                      Stock: <span className='text-[#F18966]'>{book.stock}</span>
                                    </p>
                                  </div>
                                  <div className='hidden sm:block'>
                                    <div className='flex items-center'>
                                      <p className='text-sm mr-2'>
                                        Sales number:
                                        <span className='text-[#F18966] truncate'>
                                          {' '}
                                          {book.salesNumber}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <p className='text-lg font-bold text-[#679089]'>${book.price}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='list-by-line '>
                    {bookList.length === 0 ? (
                      <div className='not-found'>
                        <h2 className='text-center my-20'>
                          No books found matching the selected filters.
                        </h2>
                      </div>
                    ) : (
                      <div className='flex flex-col'>
                        {bookList.map((book, index) => {
                          const imageUrl = book.images[0]
                            ? book.images[0]
                            : 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732181350/VuHoangNam_wbngk0.jpg';
                          return (
                            <div className='' key={index}>
                              <div className='flex items-start justify-between md:w-5/6 mx-auto'>
                                <div className='relative group overflow-hidden w-1/2 md:w-1/4 m-2'>
                                  <div className=''>
                                    <img
                                      src={imageUrl}
                                      alt={book.title}
                                      className='w-full h-auto object-cover rounded-lg'
                                    />
                                  </div>
                                  <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                                    <div className='absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4'>
                                      <button className='flex justify-center p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transform translate-x-10 group-hover:translate-x-0 duration-300 shadow-lg'>
                                        <HeartOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                                      </button>
                                      <button className='flex justify-center items-center px-2 py-3 bg-white rounded-full hover:bg-red-500 hover:text-white transform translate-x-10 group-hover:translate-x-0 duration-300 delay-75 shadow-lg'>
                                        <EyeOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                                      </button>
                                      <button className='flex justify-evenly items-center px-1 py-3 bg-white rounded-full hover:bg-red-500 hover:text-white transition-all transform translate-x-10 group-hover:translate-x-0 duration-300 delay-150 shadow-lg'>
                                        <ShoppingCartOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div id={index} className='w-1/2 md:w-3/4 h-auto m-2'>
                                  <div className=''>
                                    <p className='text-[#f18966] text-xl font-bold mb-2 text-wrap'>{book.title}</p>
                                    <p className='text-gray-600 text-sm mb-2 truncate'>
                                      {book.author}
                                    </p>
                                    <div className='sm:hidden'>
                                      <div
                                        className={`relative overflow-hidden transition-[max-height] duration-300 ease-in-out ${expandedItems[index] ? 'max-h-[500px]' : 'max-h-[80px]'
                                          }`}
                                      >
                                        <p className='text-gray-600 text-sm mr-2 text-balance'>
                                          {book.description}
                                        </p>
                                      </div>
                                      {book.description.split(' ').length > 30 && (
                                        <button
                                          className='text-blue-500 underline text-xs'
                                          onClick={() => toggleDescription(index)}
                                        >
                                          {expandedItems[index] ? 'Ẩn bớt' : 'Xem thêm'}
                                        </button>
                                      )}
                                    </div>
                                    <p className='w-11/12 text-gray-600 text-sm mb-2 mr-2 text-balance hidden sm:block'>
                                      {book.description}
                                    </p>
                                    <div className='flex items-center mb-2'>
                                      <div className='text-yellow-500 mr-2'>★★★★★</div>
                                      <span className='text-gray-600 truncate'>{book.stock}</span>
                                    </div>
                                    <div className='w-5/6 flex items-center justify-between'>
                                      <div className='flex items-center'>
                                        <p className='text-sm text-gray-600'>
                                          Stock:{' '}
                                          <span className='text-base text-[#F18966]'>
                                            {book.stock}
                                          </span>
                                        </p>
                                      </div>
                                      <div className='hidden sm:block'>
                                        <div className='flex items-center mb-2'>
                                          <div className='text-sm text-gray-600 mr-2'>
                                            Sales number:{' '}
                                          </div>
                                          <span className='text-base text-gray-600 truncate'>
                                            {book.salesNumber}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <p className='text-[#679089] text-2xl font-bold truncate'>
                                      $ {book.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className='jamb bg-slate-200 h-px w-3/4 my-2'></div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            current={currentPage}
            total={totalPages * booksPerPage} // Tổng số mục = số trang * số mục mỗi trang
            pageSize={booksPerPage} // Sử dụng booksPerPage thay cho pageSize cố định
            onChange={(page) => setCurrentPage(page)} // Cập nhật trang khi người dùng chuyển trang
            className='mt-4 mb-10 flex justify-center'
          />
        </div>
      </div>
    </div>
  );
}
