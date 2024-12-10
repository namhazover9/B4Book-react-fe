// eslint-disable-next-line no-unused-vars
import { Button, Carousel } from 'antd';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { ArrowRightOutlined } from '@ant-design/icons';
import pic1 from '../../assets/images/BestSelling/1.jpg';
import pic2 from '../../assets/images/BestSelling/4.jpg';
import pic3 from '../../assets/images/BestSelling/7.jpg';
import pic4 from '../../assets/images/BestSelling/9.jpg';
import pic5 from '../../assets/images/BestSelling/12.jpg';
import pic6 from '../../assets/images/BestSelling/13.jpg';
import pic7 from '../../assets/images/BestSelling/15.jpg';
import pic8 from '../../assets/images/BestSelling/16.jpg';
import pic9 from '../../assets/images/BestSelling/30.jpg';
import store1 from '../../assets/images/BestSelling/h6_banner4.jpg';
import productsApi from '../../hooks/useProductsApi';
import { useEffect, useState } from 'react';

const BookShowcase = () => {
  const [books, setbooks] = useState([]); 
  
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await productsApi.getProductHomePage();
      console.log(response.data.trendingProducts);  

      setbooks(Array.isArray(response.data.trendingProducts) ? response.data.trendingProducts : []);
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
  
  return (
    <div className='w-full bg-white px-4 sm:px-10 lg:px-20'>
      <div className='max-w-6xl mx-auto px-4 py-5'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-3xl font-bold'>Trending Now</h2>
          <div className='hidden xl:block w-[700px] h-px bg-gray-300 shadow-md'></div>
          <button className='bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-colors flex items-center gap-2 font-medium'>
            View All <ArrowRightOutlined className='w-4 h-4' />
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
                    slidesToShow: 3,
                  },
                },
              ]}
            >
              {books.map((book) => (
                
                <div key={book._id} className='w-1/4 p-2 '>
                  <div className='group relative '>
                    <div className='relative overflow-hidden rounded-2xl '>
                      <img
                        src={book.images[0]}
                        className='w-full h-90 object-cover transition-all ease-in-out duration-300 '
                      />
                      <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='absolute right-4 bottom-5 top-1/2 -translate-y-1/2 flex flex-col gap-3'>
                          <button className='p-2 bg-white border-2 border-transparent rounded-full hover:bg-red-400 hover:border-white hover:text-white transition-colors transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300 shadow-lg'>
                            <Heart className='w-5 h-5 text-black-500' />
                          </button>
                          <button className='p-2 bg-white border-2 border-transparent rounded-full hover:bg-red-400 hover:border-white hover:text-white transition-colors transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300 delay-75 shadow-lg'>
                            <Eye className='w-5 h-5 text-black-500' />
                          </button>
                          <button className='p-2 bg-white border-2 border-transparent rounded-full hover:bg-red-400 hover:border-white hover:text-white transition-colors transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300 delay-150 shadow-lg'>
                            <ShoppingCart className='w-5 h-6 text-black-500' />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='mt-3'>
                      <h3 className='text-lg font-semibold truncate hover:text-red-400'>
                        <button>{book.title}</button>
                      </h3>
                      <p className='text-gray-600 text-sm hover:text-red-600 truncate'>
                        <button className='truncate block w-full'>{book.author}</button>
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
                    <button className='hover:underline'>{banner.contact}</button>
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