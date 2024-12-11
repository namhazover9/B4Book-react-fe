import { ArrowRightOutlined } from '@ant-design/icons';
import productsApi from '../../hooks/useProductsApi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// console.log(sortedBooks);

export default function FavouriteBook() {
  const [books, setbooks] = useState([]);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.carts.items); // Đảm bảo cartItems là mảng
  let [stockList, setStockList] = useState([]);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const userId = useSelector((state) => state.user._id);
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await productsApi.getProductHomePage();
      setbooks(
        Array.isArray(response.data.favouriteProducts) ? response.data.favouriteProducts : [],
      );
      stockList = response.data.favouriteProducts.map((book) => ({
        productId: book._id,
        stock: book.stock, // Tùy thuộc vào API, bạn có thể phải điều chỉnh tên trường
      }));
      setStockList(stockList);
    };
    fetchBooks();
  }, []);
  return (
    <div className='bg-white w-full mt-5 px-5 sm:px-10 lg:px-20'>
      <div className='flex justify-between items-center mx-4'>
        <p className='m-0 text-3xl font-bold text-[#f18966]'>Our Favourite Reads</p>
        <div className='hidden xl:block w-[700px] h-px bg-gray-300 shadow-md'></div>
        <button className='bg-[#679089] text-white px-6 py-2.5 rounded-full hover:bg-[#679079] transition-colors flex items-center gap-2 font-bold'>
          View All <ArrowRightOutlined className='w-4 h-4' />
        </button>
      </div>
      <div className='mx-4 mt-6 mb-2 border border-solid rounded-lg'>
        <div className='flex justify-center m-2 sm:flex-row'>
          <div className='hidden sm:block w-1/4 sm:w-1/2 lg:w-1/3 xl:w-1/4'>
            {books.slice(2, 6).map((book) => (
              <div key={book.title} className='mt-2'>
                <div className='bg-white p-3 rounded-lg transition duration-500 ease-in-out hover:shadow-lg mb-3'>
                  <div className='flex'>
                    <img className='w-1/3 rounded-lg' src={book.images[0]} alt={book.title} />
                    <div className='flex flex-col justify-between ml-4'>
                      <h2 className='text-lg font-bold'>{book.title}</h2>
                      <div className='flex items-center'>
                        <div className='flex items-center'>
                          <div className='text-yellow-500 mr-2'>★★★★★</div>
                        </div>
                        <span className='text-gray-600'>{book.rating}</span>
                      </div>
                      <p className='text-gray-400 font-medium'>{book.author}</p>
                      <p className='text-lg font-bold text-red-500'>{book.price}</p>
                    </div>
                  </div>
                </div>
                <div className='crossbar h-px bg-slate-200 w-5/6 mx-3'></div>
              </div>
            ))}
          </div>

          {/* Center Books (1st and 2nd Highest Rated) */}
          <div className='sm:w-2/4 flex flex-col justify-center xl:flex-row lg:w-1/3 xl:w-2/4 2xl:space-x-3 xl:-ml-1'>
            {/* Sản phẩm đầu tiên */}
            <div className='lg:w-11/12 sm:ml-2 sm:mt-2 xl:mb-4'>
              <div className='bg-white py-3 sm:p-3 flex items-center justify-around sm:block rounded-lg transition duration-500 ease-in-out hover:shadow-md mb-4 sm:m-0'>
                <div className='overflow-hidden rounded-lg sm:mb-4 h-full w-1/2 sm:w-3/4 lg:w-full'>
                  {books[0]?.images?.[0] && (
                    <img
                      src={books[0].images[0]}
                      alt={books[0]?.title || 'Unknown Title'}
                      className='w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-105'
                    />
                  )}
                </div>
                <div className='w-1/3 sm:w-full'>
                  <h2 className='text-xl font-bold mb-2'>{books[0]?.title || 'No Title'}</h2>
                  <p className='text-gray-600 mb-2'>{books[0]?.author || 'Unknown Author'}</p>
                  <div className='flex items-center mb-2'>
                    <div className='text-yellow-500 mr-2'>★★★★★</div>
                    <span className='text-gray-600'>{books[0]?.ratingResult || '0'}</span>
                  </div>
                  <p className='m-0 text-red-500 text-lg font-bold'>
                    {books[0]?.price || 'Contact for Price'}
                  </p>
                </div>
              </div>
            </div>

            <div className='sm:hidden jamb bg-slate-200 w-px h-3/4'></div>

            {/* Sản phẩm thứ hai */}
            <div className='lg:w-11/12 sm:ml-2 xl:mt-2 xl:ml-1'>
              <div className='bg-white py-3 sm:p-3 flex items-center justify-around sm:block rounded-lg transition duration-500 ease-in-out hover:shadow-md sm:mb-4'>
                <div className='overflow-hidden rounded-lg sm:mb-4 h-full w-1/2 sm:w-3/4 lg:w-full'>
                  {books[1]?.images?.[0] && (
                    <img
                      src={books[1].images[0]}
                      alt={books[1]?.title || 'Unknown Title'}
                      className='w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-105'
                    />
                  )}
                </div>
                <div className='w-1/3 sm:w-full'>
                  <h2 className='text-xl font-bold mb-2'>{books[1]?.title || 'No Title'}</h2>
                  <p className='text-gray-600 mb-2'>{books[1]?.author || 'Unknown Author'}</p>
                  <div className='flex items-center mb-2'>
                    <div className='text-yellow-500 mr-2'>★★★★★</div>
                    <span className='text-gray-600'>{books[1]?.ratingResult || '0'}</span>
                  </div>
                  <p className='m-0 text-red-500 text-lg font-bold'>
                    {books[1]?.price || 'Contact for Price'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách sản phẩm khác */}
          <div className='hidden lg:block w-1/4 lg:w-1/3 xl:w-1/4'>
            {books.slice(7, 10).map((book, index) => (
              <div key={index} className='mt-2'>
                <div className='bg-white p-3 rounded-lg transition duration-500 ease-in-out hover:shadow-lg mb-3'>
                  <div className='flex'>
                    {book.images?.[0] && (
                      <img
                        className='w-1/3 rounded-lg'
                        src={book.images[0]}
                        alt={book.title || 'Unknown Title'}
                      />
                    )}
                    <div className='flex flex-col justify-between ml-4'>
                      <h2 className='text-lg font-bold'>{book.title || 'No Title'}</h2>
                      <div className='flex items-center'>
                        <div className='text-yellow-500 mr-2'>★★★★★</div>
                        <span className='text-gray-600'>{book.ratingResult || '0'}</span>
                      </div>
                      <p className='text-gray-400 font-medium'>{book.author || 'Unknown Author'}</p>
                      <p className='text-lg font-bold text-red-500'>
                        {book.price || 'Contact for Price'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='crossbar h-px bg-slate-200 w-5/6 mx-3'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
