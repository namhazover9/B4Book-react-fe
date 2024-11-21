import pic1 from '../../assets/images/BestSelling/32.jpg ';
import pic2 from '../../assets/images/BestSelling/33.jpg';
import pic3 from '../../assets/images/BestSelling/28.jpg';
import pic4 from '../../assets/images/BestSelling/28.jpg';
import pic5 from '../../assets/images/BestSelling/28.jpg';
import pic6 from '../../assets/images/BestSelling/29.jpg';
import pic7 from '../../assets/images/BestSelling/28.jpg';
import pic8 from '../../assets/images/BestSelling/28.jpg';
import pic9 from '../../assets/images/BestSelling/28.jpg';
import pic10 from '../../assets/images/BestSelling/28.jpg';
import pic11 from '../../assets/images/BestSelling/28.jpg';
import { ArrowRightOutlined } from '@ant-design/icons';

const favouriteBooks = [
  {
    title: 'Rich Dad Poor Dad',
    author: 'Misty Figueroa',
    rating: 3,
    price: '$170.03',
    original_price: null,
    image: pic10,
  },
  {
    title: 'House of Sky and Breath',
    author: 'Ernesto Wade',
    rating: 2,
    price: '$72.99',
    original_price: '$86.99',
    image: pic7,
  },
  {
    title: 'Treachery: Alpha',
    author: 'Jessica Munoz',
    rating: 3,
    price: '$569.00',
    original_price: '$814.66',
    image: pic6,
  },
  {
    title: 'P.S. Never in a Million Years',
    author: 'Marcella Bennett',
    rating: 3,
    price: '$664.55-$906.29',
    original_price: null,
    image: pic4,
  },
  {
    title: 'My Dearest Darkest',
    author: 'Enrique Wallace',
    rating: 5,
    price: '$914.53',
    original_price: null,
    image: pic1,
  },
  {
    title: 'Surrounded by Idiots',
    author: 'Georgia Ramirez',
    rating: 4,
    price: '$825.85',
    original_price: null,
    image: pic5,
  },
  {
    title: 'A Crown of Petals and Ice',
    author: 'Karla Newman',
    rating: 5,
    price: '$95.91',
    original_price: null,
    image: pic8,
  },
  {
    title: 'Heavenly Bodies',
    author: 'Karla Newman',
    rating: 2,
    price: '$53.00',
    original_price: null,
    image: pic3,
  },
  {
    title: 'The Story of Succss',
    author: 'Arthur Gonzalez',
    rating: 1,
    price: '$50.89',
    original_price: null,
    image: pic9,
  },
  {
    title: 'Annie Leibovitz: Wonderlnd',
    author: 'Dana Chambers',
    rating: 3,
    price: '$316.15',
    original_price: null,
    image: pic2,
  },
  {
    title: 'Vit [Duck]',
    author: 'Truong Nguyen Viet Duc',
    rating: 3,
    price: '$799.15',
    original_price: '$1000',
    image: pic11,
  },
];

// Sort books by rating in descending order
const sortedBooks = [...favouriteBooks].sort((a, b) => b.rating - a.rating);

// console.log(sortedBooks);

export default function FavouriteBook() {
  return (
    <div className='bg-white w-full mt-5 px-5 sm:px-10 lg:px-20'>
      <div className="flex justify-between items-center mx-4">
        <p className="m-0 text-3xl font-bold">Our Favourite Reads</p>
        <div className="hidden xl:block w-[700px] h-px bg-gray-300 shadow-md"></div>
        <button className="bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-colors flex items-center gap-2 font-medium">
          View All <ArrowRightOutlined className="w-4 h-4" />
        </button>
      </div>
      <div className='mx-4 mt-6 mb-2 border border-solid rounded-lg'>
        <div className='flex justify-center m-2 sm:flex-row-reverse'>
          <div className='hidden sm:block w-1/4 sm:w-1/2 lg:w-1/3 xl:w-1/4'>
            {sortedBooks.slice(2, 6).map((book) => (
              <div key={book.title} className='mt-2'>
                <div className='bg-white p-3 rounded-lg transition duration-500 ease-in-out hover:shadow-lg mb-3'>
                  <div className='flex'>
                    <img className='w-1/3 rounded-lg' src={book.image} alt={book.title} />
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
            <div className='lg:w-11/12 sm:ml-2 sm:mt-2 xl:mb-4'>
              <div className='bg-white py-3 sm:p-3 flex items-center justify-around sm:block rounded-lg transition duration-500 ease-in-out hover:shadow-md mb-4 sm:m-0'>
                <div className='overflow-hidden rounded-lg sm:mb-4 h-full w-1/2 sm:w-3/4 lg:w-full'>
                  <img
                    src={sortedBooks[0].image}
                    alt={sortedBooks[0].title}
                    className='w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-105'
                  />
                </div>
                <div className="w-1/3 sm:w-full">
                  <h2 className='text-xl font-bold mb-2'>{sortedBooks[0].title}</h2>
                  <p className='text-gray-600 mb-2'>{sortedBooks[0].author}</p>
                  <div className='flex items-center mb-2'>
                    <div className='text-yellow-500 mr-2'>★★★★★</div>
                    <span className='text-gray-600'>{sortedBooks[0].rating}</span>
                  </div>
                  <p className='m-0 text-red-500 text-lg font-bold'>{sortedBooks[0].price}</p>
                </div>
              </div>
            </div>
            <div className='sm:hidden jamb bg-slate-200 w-px h-3/4'></div>
            <div className='lg:w-11/12 sm:ml-2 xl:mt-2 xl:ml-1'>
              <div className='bg-white py-3 sm:p-3 flex items-center justify-around sm:block rounded-lg transition duration-500 ease-in-out hover:shadow-md sm:mb-4'>
                <div className='overflow-hidden rounded-lg sm:mb-4 h-full w-1/2 sm:w-3/4 lg:w-full'>
                  <img
                    src={sortedBooks[1].image}
                    alt={sortedBooks[1].title}
                    className='w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-105'
                  />
                </div>
                <div className="w-1/3 sm:w-full">
                  <h2 className='text-xl font-bold mb-2'>{sortedBooks[1].title}</h2>
                  <p className='text-gray-600 mb-2'>{sortedBooks[1].author}</p>
                  <div className='flex items-center mb-2'>
                    <div className='text-yellow-500 mr-2'>★★★★★</div>
                    <span className='text-gray-600'>{sortedBooks[1].rating}</span>
                  </div>
                  <p className='m-0 text-red-500 text-lg font-bold'>{sortedBooks[1].price}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='hidden lg:block w-1/4 lg:w-1/3 xl:w-1/4'>
            {sortedBooks.slice(6, 10).map((book) => (
              <div key={book.title} className='mt-2'>
                <div className='bg-white p-3 rounded-lg transition duration-500 ease-in-out hover:shadow-lg mb-3'>
                  <div className='flex'>
                    <img className='w-1/3 rounded-lg' src={book.image} alt={book.title} />
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
        </div>
      </div>
    </div>
  );
}
