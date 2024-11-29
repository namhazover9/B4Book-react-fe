import { useState, useEffect } from 'react';
import { MenuUnfoldOutlined, CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, List, Button, InputNumber, Radio, Popconfirm } from 'antd';
import { Select } from 'antd';
import Footer from '../components/footer/Footer';
import Translate from '../components/Common/Translate';
import LoginPage from '../components/modalLogin/LoginPopup';
import { languages } from '../constants/constants';
import { useLocalization } from '../context/LocalizationWrapper';
import pic1 from '../assets/images/BestSelling/1.jpg';
import pic2 from '../assets/images/BestSelling/4.jpg';
import pic3 from '../assets/images/BestSelling/7.jpg';
import pic4 from '../assets/images/BestSelling/9.jpg';
import userApi from '../hooks/userApi';
import { useSelector } from 'react-redux';

export default function Layout({ children }) {
  const userId = useSelector((state) => state.user._id);
  const { switchLocale } = useLocalization();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const handleChange = (value) => {
    switchLocale(value);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCartSidebar = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSwitchShop = async () => {
    try {
      const response = await userApi.getSwitchShop(); // Gọi API với userId
      console.log('Response from switchShop API:', response.data); // Debug
      const shop = response.data.data; // Truy cập data
      const shopName = shop.shopName; // Lấy shopName
      if (response.data.message === 'success') {
        navigate(`/shop/${shopName}/home/${shop._id}`); // Điều hướng
      }
    } catch (error) {
      console.error('Error fetching shop detail:', error);
    }
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Shops', path: '/shops' },
    { name: 'Books', path: '/products' },
    { name: 'Pages', path: '/pages' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Us', path: '/aboutus' },
  ];
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Surrounded by Idiots',
      vendor: 'Online Store',
      price: 825.85,
      quantity: 1,
      image: pic1,
    },
    {
      id: 2,
      title: 'Treachery: Alpha Colony Book 8',
      vendor: 'Gregstore',
      price: 569.0,
      quantity: 1,
      image: pic2,
    },
    {
      id: 3,
      title: 'Another Book',
      vendor: 'BookStore',
      price: 420.5,
      quantity: 1,
      image: pic3,
    },
    {
      id: 4,
      title: 'Math Book',
      vendor: 'BookStore',
      price: 120.5,
      quantity: 1,
      image: pic4,
    },
    {
      id: 4,
      title: 'Math Book',
      vendor: 'BookStore',
      price: 120.5,
      quantity: 1,
      image: pic4,
    },
    {
      id: 4,
      title: 'Math Book',
      vendor: 'BookStore',
      price: 120.5,
      quantity: 1,
      image: pic4,
    },
    {
      id: 4,
      title: 'Math Book',
      vendor: 'BookStore',
      price: 120.5,
      quantity: 1,
      image: pic4,
    },
  ]);

  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] = useState(
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
  const removeCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSubmit = (values) => {
    console.log('Form data submitted:', values);
    // Call API or perform actions with `values`
  };
  useEffect(() => {
    setTotalPriceBeforeDiscount(
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    );
  }, [cartItems]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className='font-cairoRegular'>
      <header className='bg-white shadow-md w-full'>
        {/* Main Container */}
        <div className='container mx-auto flex justify-between items-center px-4 py-2'>
          {/* Logo */}
          <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
            <img
              className='w-20 h-20'
              src='https://res.cloudinary.com/dmyfiyug9/image/upload/v1732094490/logo_b4b_pvldap.png'
              alt='Logo'
            />
            <h2 className='text-2xl font-bold m-0'>BigFour</h2>
          </div>

          {/* Mobile View - Sidebar and Shopping Cart */}
          <div className='block sm:hidden flex items-center space-x-4'>
            <Link to='/cart' className='hover:text-red-500'>
              <ShoppingCartOutlined className='text-2xl text-red-400 ' />
            </Link>
            <MenuUnfoldOutlined onClick={toggleSidebar} className='text-2xl cursor-pointer' />
          </div>

          {/* Navbar - Hidden on smaller screens */}
          <nav className='hidden sm:flex space-x-12'>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-bold transition duration-300 ${
                  location.pathname === item.path
                    ? 'text-red-500 text-lg after:w-full'
                    : 'text-gray-700 text-lg after:w-0'
                } hover:text-red-500 after:content-[''] after:block after:h-0.5 after:bg-red-500 after:transition-all after:duration-300`}
              >
                <Translate text={item.name} />
              </Link>
            ))}
          </nav>

          {/* Right side - Search bar, icons, and language switch */}
          <div className='hidden sm:flex items-center space-x-4'>
            <Button
              lassName='text-sm text-white bg-red-500 rounded-md px-4 py-2 hover:bg-red-400 mt-4'
              onClick={() => {
                handleSwitchShop();
              }}
            >
              Switch shop
            </Button>
            {/* Language Switcher */}
            <Select
              className='w-28'
              defaultValue={localStorage.getItem('locale') ?? 'en'}
              onChange={handleChange}
              options={languages}
            />
            {/* Shopping Cart */}
            <ShoppingCartOutlined
              onClick={toggleCartSidebar}
              className='text-2xl text-red-400 cursor-pointer hover:bg-red-500 hover:text-white p-2 rounded-full'
            />
            {/* Login Button or Avatar */}
            {userId ? (
              <div className='flex items-center space-x-2 cursor-pointer'>
                <img
                  src='https://via.placeholder.com/40' // Thay bằng link ảnh avatar thực tế
                  alt='User Avatar'
                  className='w-10 h-10 rounded-full'
                  onClick={() => navigate('/profile')} // Dẫn đến trang profile của người dùng
                />
                <span className='text-gray-700 font-medium'>Hello, User</span>
              </div>
            ) : (
              <Link to='/login' className='hover:text-red-500'>
                <button className='text-sm text-white bg-red-500 rounded-md px-4 py-2 hover:bg-red-400'>
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-50 z-40' : 'opacity-0 -z-10'
        } sm:hidden`}
        onClick={toggleSidebar} // Close sidebar when clicking outside
      ></div>

      {/* Sidebar - Only visible when open */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white bg-opacity-90 h-full flex flex-col p-4 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 sm:hidden`}
      >
        <div className='flex justify-between'>
          <div className='text-xl font-bold'>Menu</div>
          <CloseOutlined onClick={toggleSidebar} className='text-2xl cursor-pointer' />
        </div>
        <nav className='mt-4'>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={toggleSidebar} // Close sidebar when a menu item is clicked
              className='block py-2 px-4 text-gray-700 border-b-2 border-red-200 hover:bg-gray-200'
            >
              <Translate text={item.name} />
            </Link>
          ))}
          {/* Language Switcher */}
          <Select
            className='w-full mt-4'
            defaultValue={localStorage.getItem('locale') ?? 'en'}
            onChange={handleChange}
            options={languages}
          />

          {/* Login Button */}
          <button
            className='text-sm text-white bg-red-500 rounded-md px-4 py-2 hover:bg-red-400 mt-4'
            onClick={() => {
              toggleLoginPopup();
              toggleSidebar();
            }}
          >
            Login
          </button>
        </nav>
      </div>

      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 select-none'>
          <div className='bg-white w-9/12 sm:w-1/2 max-w-md p-6 rounded-lg shadow-lg relative'>
            <button
              onClick={toggleLoginPopup}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'
            >
              ✕
            </button>
            <LoginPage />
          </div>
        </div>
      )}

      {/* Cart Side Bar */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='flex justify-between items-center border-b pb-2 p-4'>
          <h2 className='text-xl font-semibold'>Shopping cart</h2>
          <CloseOutlined onClick={toggleCartSidebar} className='cursor-pointer text-lg' />
        </div>

        {/* Cart Items - Scrollable */}
        <div className=' px-4 mt-1 space-y-1 overflow-y-auto h-[calc(100vh-160px)]'>
          {cartItems.map((item) => (
            <div key={item.id} className='flex items-center justify-between'>
              <img src={item.image} alt={item.title} className='w-16 h-20 object-cover rounded' />
              <div className='flex-1 ml-4 py-3'>
                <h3 className='font-normal text-base truncate max-w-[120px]' title={item.title}>
                  {item.title}
                </h3>
                <p className='text-sm  m-0  text-gray-500'>Vendor: {item.vendor}</p>
                <p className='text-base  m-0  font-semibold'>
                  {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <Popconfirm
                title='Are you sure you want to remove this item?'
                onConfirm={() => {
                  setCartItems((prevItems) =>
                    prevItems.filter((cartItem) => cartItem.id !== item.id),
                  );
                }}
                okText='Yes'
                cancelText='No'
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
              >
                <CloseOutlined className='cursor-pointer text-gray-500 hover:text-red-500' />
              </Popconfirm>
            </div>
          ))}
        </div>

        {/* Subtotal and View Cart Button */}
        <div className='p-4 border-t bg-white sticky bottom-0'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-lg font-semibold'>Subtotal:</span>
            <span className='text-xl font-bold'>${subtotal.toFixed(2)}</span>
          </div>
          <Link to='/cart'>
            <Button
              block
              onClick={toggleCartSidebar}
              className='!bg-gray-200 !text-black hover:!bg-gray-300 rounded-2xl'
            >
              View Cart
            </Button>
          </Link>
        </div>
      </div>

      {/* Page Content */}
      {children}
      <Footer />
    </div>
  );
}
