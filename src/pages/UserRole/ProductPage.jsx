import React, { useState } from 'react';
import { BarsOutlined, QrcodeOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Checkbox, Menu, Pagination, Select, Slider, Switch } from 'antd';

import pic1 from '../../assets/images/BestSelling/32.jpg';
import pic2 from '../../assets/images/BestSelling/33.jpg';
import pic3 from '../../assets/images/FavouriteBook/26.jpg';
import pic4 from '../../assets/images/FavouriteBook/27.jpg';
import pic5 from '../../assets/images/FavouriteBook/30.jpg';
import pic6 from '../../assets/images/BestSelling/29.jpg';
import pic7 from '../../assets/images/FavouriteBook/31.jpg';
import pic8 from '../../assets/images/BestSelling/28.jpg';
import pic9 from '../../assets/images/FavouriteBook/34.jpg';
import pic10 from '../../assets/images/FavouriteBook/35.jpg';
import pic11 from '../../assets/images/FavouriteBook/36.jpg';
import bookNotImage from '../../assets/images/FavouriteBook/VuHoangNam.jpg';

const book_list = [
  {
    title: 'The Great Gatsby',
    description: 'A novel about the American dream',
    price: 45.99,
    author: 'F. Scott Fitzgerald',
    publisher: 'Scribner',
    ISBN: 9780743273565,
    language: 'English',
    publicDate: '2004-09-30',
    stock: 120,
    imageUrl: pic1,
    category: ['Classic', 'Fiction'],
  },
  {
    title: 'To Kill a Mockingbird',
    description: 'A story about racial inequality and moral growth',
    price: 20.99,
    author: 'Harper Lee',
    publisher: 'J.B. Lippincott & Co.',
    ISBN: 9780061120084,
    language: 'English',
    publicDate: '1960-07-11',
    stock: 80,
    imageUrl: pic2,
    category: ['Classic', 'Historical', 'Drama'],
  },
  {
    title: '1984',
    description: 'A dystopian social science fiction novel',
    price: 29.99,
    author: 'George Orwell',
    publisher: 'Secker & Warburg',
    ISBN: 9780451524935,
    language: 'English',
    publicDate: '1949-06-08',
    stock: 150,
    imageUrl: pic3,
    category: ['Dystopian', 'Classic', 'Political Fiction'],
  },
  {
    title: 'Pride and Prejudice',
    description: 'A romantic novel that critiques the British landed gentry',
    price: 9.99,
    author: 'Jane Austen',
    publisher: 'T. Egerton, Whitehall',
    ISBN: 9780141199078,
    language: 'English',
    publicDate: '1813-01-28',
    stock: 100,
    imageUrl: pic4,
    category: ['Classic', 'Romance'],
  },
  {
    title: 'Moby Dick',
    description: 'A novel about the voyage of the whaling ship Pequod',
    price: 8.5,
    author: 'Herman Melville',
    publisher: 'Harper & Brothers',
    ISBN: 9781503280786,
    language: 'English',
    publicDate: '1851-10-18',
    stock: 50,
    imageUrl: pic5,
    category: ['Adventure', 'Classic'],
  },
  {
    title: 'The Catcher in the Rye',
    description: 'A story about adolescent alienation and rebellion',
    price: 12.09,
    author: 'J.D. Salinger',
    publisher: 'Little, Brown and Company',
    ISBN: 9780316769488,
    language: 'English',
    publicDate: '1951-07-16',
    stock: 90,
    imageUrl: pic5,
    category: ['Classic', 'Young Adult'],
  },
  {
    title: 'War and Peace',
    description: 'A historical novel that intertwines stories of several families',
    price: 19.99,
    author: 'Leo Tolstoy',
    publisher: 'The Russian Messenger',
    ISBN: 9781853260629,
    language: 'English',
    publicDate: '1869-01-01',
    stock: 60,
    imageUrl: pic7,
    category: ['Classic', 'Historical'],
  },
  {
    title: 'The Hobbit',
    description: 'A fantasy novel and prelude to The Lord of the Rings',
    price: 14.99,
    author: 'J.R.R. Tolkien',
    publisher: 'George Allen & Unwin',
    ISBN: 9780547928227,
    language: 'English',
    publicDate: '1937-09-21',
    stock: 200,
    imageUrl: pic8,
    category: ['Fantasy', 'Adventure'],
  },
  {
    title: 'Jane Eyre',
    description: 'A novel following the experiences of its eponymous heroine',
    price: 10.5,
    author: 'Charlotte Brontë',
    publisher: 'Smith, Elder & Co.',
    ISBN: 9780141441146,
    language: 'English',
    publicDate: '1847-10-16',
    stock: 75,
    imageUrl: pic9,
    category: ['Classic', 'Romance'],
  },
  {
    title: 'The Odyssey',
    description: 'An epic poem attributed to Homer',
    price: 13.0,
    author: 'Homer',
    publisher: 'Ancient Greece',
    ISBN: 9780140268867,
    language: 'English',
    publicDate: '-800-01-01',
    stock: 130,
    imageUrl: pic10,
    category: ['Epic', 'Classic', 'Mythology'],
  },
  {
    title: 'Brave New World',
    description: 'A dystopian novel that explores futuristic society',
    price: 12.49,
    author: 'Aldous Huxley',
    publisher: 'Chatto & Windus',
    ISBN: 9780060850524,
    language: 'English',
    publicDate: '1932-08-01',
    stock: 95,
    imageUrl: pic4,
    category: ['Dystopian', 'Science Fiction', 'Classic'],
  },
  {
    title: 'Wuthering Heights',
    description: 'A story of intense, tragic love',
    price: 10.99,
    author: 'Emily Brontë',
    publisher: 'Thomas Cautley Newby',
    ISBN: 9780141439556,
    language: 'English',
    publicDate: '1847-12-01',
    stock: 85,
    imageUrl: pic11,
    category: ['Classic', 'Romance', 'Drama'],
  },
  {
    title: 'Great Expectations',
    description: 'The story of an orphan named Pip',
    price: 8.5,
    author: 'Charles Dickens',
    publisher: 'Chapman & Hall',
    ISBN: 9780141439563,
    language: 'English',
    publicDate: '1861-08-01',
    stock: 110,
    imageUrl: pic7,
    category: ['Classic', 'Bildungsroman'],
  },
  {
    title: 'Frankenstein',
    description:
      "A story about the consequences of scientific overreach. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    price: 9.99,
    author: 'J.R.R. Tolkien 99999999999999999999999999999999999999',
    publisher: 'Lackington, Hughes, Harding, Mavor & Jones',
    ISBN: 9780486282114,
    language: 'English',
    publicDate: '1818-01-01',
    stock: 140,
    imageUrl: undefined,
    category: ['Classic', 'Horror', 'Science Fiction 99999999999999999999999999999999'],
  },
];

export default function ProductPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [filterBooks, setFilterBooks] = useState(book_list);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const booksPerPage = 8;

  // Filter Category
  const uniqueCategories = book_list.reduce((categories, book) => {
    book.category.forEach((cat) => {
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    });
    return categories;
  }, []);

  const categoryItems = uniqueCategories.map((category, index) => ({
    key: `category-${index}`,
    label: (
      <Checkbox
        checked={selectedCategories.includes(category)}
        onChange={(e) => onCategoryChange(e, category)}
        className='truncate'
      >
        {category}
      </Checkbox>
    ),
  }));

  const categorys = [
    {
      key: 'sub1',
      label: 'Category',
      icon: <ReadOutlined />,
      children: categoryItems,
    },
  ];

  // Filter Author
  const uniqueAuthors = book_list.reduce((authors, book) => {
    if (!authors.includes(book.author)) {
      authors.push(book.author);
    }
    return authors;
  }, []);

  const authorItems = uniqueAuthors.map((author, index) => ({
    key: `author-${index}`,
    label: (
      <Checkbox
        checked={selectedAuthors.includes(author)}
        onChange={(e) => onAuthorChange(e, author)}
        className='truncate'
      >
        {author}
      </Checkbox>
    ),
  }));

  const authors = [
    {
      key: 'sub1',
      label: 'Author',
      icon: <UserOutlined />,
      children: authorItems,
    },
  ];

  const onCategoryChange = (e, category) => {
    if (e.target && e.target.checked !== undefined) {
      const { checked } = e.target;
      setSelectedCategories((prevCategories) => {
        const updatedCategories = checked
          ? [...prevCategories, category]
          : prevCategories.filter((cat) => cat !== category);

        filterBooksList(updatedCategories, selectedAuthors);
        return updatedCategories;
      });
    }
  };

  const onAuthorChange = (e, author) => {
    if (e.target && e.target.checked !== undefined) {
      const { checked } = e.target;
      setSelectedAuthors((prevAuthors) => {
        const updatedAuthors = checked
          ? [...prevAuthors, author]
          : prevAuthors.filter((cat) => cat !== author);

        filterBooksList(selectedCategories, updatedAuthors);
        return updatedAuthors;
      });
    }
  };

  const filterBooksList = (categories, authors, price = priceRange) => {
    const filteredBooks = book_list.filter((book) => {
      const categoryMatch = categories.length
        ? categories.some((category) => book.category.includes(category))
        : true;

      const authorMatch = authors.length ? authors.includes(book.author) : true;

      const priceMatch = book.price >= price[0] && book.price <= price[1];

      return categoryMatch && authorMatch && priceMatch;
    });

    setFilterBooks(filteredBooks);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current page books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filterBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Filter by Price
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked) => {
    setDisabled(checked);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const handleSliderAfterChange = (value) => {
    filterBooksList(selectedCategories, selectedAuthors, value);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // View Change
  const [viewMode, setViewMode] = useState('block');

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div>
      <div className='header my-5 bg-slate-200 p-10 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>List Books</h1>
        <div className='w-1/12 flex justify-between items-center'>
          <a href='/#' className='m-0 underline transition duration-200 hover:text-red-500'>
            Home
          </a>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-6 mx-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
            />
          </svg>
          <span>Books</span>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='list-books w-1/6 flex flex-col'>
          <div className='genre'>
            <Menu
              className='h-80 overflow-y-auto'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode='inline'
              items={categorys}
              onClick={onCategoryChange}
            />
          </div>
          <br />
          <br />
          <div className='author'>
            <Menu
              className='h-80 overflow-y-auto'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode='inline'
              items={authors}
              onClick={onAuthorChange}
            />
          </div>
          <br />
          <br />
          <div className='price'>
            <Card
              title='💲Filter by Price'
              className='h-auto overflow-y-auto bg-gray-50'
              bordered={false}
            >
              <Slider
                range
                defaultValue={priceRange}
                max={50}
                onChange={handleSliderChange}
                onAfterChange={handleSliderAfterChange}
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
        </div>
        <div className='all-books w-5/6 ml-4'>
          <div className='header-all-books flex justify-between items-center mx-4'>
            <div className='option-form-left'>
              <QrcodeOutlined
                className={`mr-2 choice-icon-tnvd ${viewMode === 'block' ? 'text-blue-500' : ''}`}
                onClick={() => handleViewModeChange('block')}
              />
              <BarsOutlined
                className={`choice-icon-tnvd ${viewMode === 'line' ? 'text-blue-500' : ''}`}
                onClick={() => handleViewModeChange('line')}
              />
            </div>
            <div className='options-right flex justify-between items-center'>
              <div className='option-show'>
                <Select
                  defaultValue='Default sorting'
                  className='w-44 mr-2'
                  onChange={handleChange}
                  options={[
                    {
                      value: 'Default sorting',
                      label: 'Default sorting',
                    },
                    {
                      value: 'Sort by popularity',
                      label: 'Sort by popularity',
                    },
                    {
                      value: 'Sort by average rating',
                      label: 'Sort by average rating',
                    },
                    {
                      value: 'Sort by latest',
                      label: 'Sort by latest',
                    },
                    {
                      value: 'Sort by price: low to high',
                      label: 'Sort by price: low to high',
                    },
                    {
                      value: 'Sort by price: high to low',
                      label: 'Sort by price: high to low',
                    },
                  ]}
                />
              </div>
              <div className='option-number-books-show'>
                <Select
                  defaultValue='Show 10'
                  className='w-28'
                  onChange={handleChange}
                  options={[
                    {
                      value: 'Show 10',
                      label: 'Show 10',
                    },
                    {
                      value: 'Show 20',
                      label: 'Show 20',
                    },
                    {
                      value: 'Show 50',
                      label: 'Show 50',
                    },
                    {
                      value: 'Show 100',
                      label: 'Show 100',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className='horizontal-line bg-slate-200 h-px w-11/12 my-2 mx-10'></div>
          {viewMode === 'block' ? (
            <div className='list-by-block'>
              {currentBooks.length === 0 ? (
                <div className='not-found'>
                  <h2 className='text-center my-20'>
                    No books found matching the selected filters.
                  </h2>
                </div>
              ) : (
                <div className='grid grid-cols-4'>
                  {currentBooks.map((book, index) => {
                    const imageUrl = book.imageUrl ? book.imageUrl : bookNotImage;

                    return (
                      <div className='flex justify-between items-center' key={index}>
                        <div
                          id={index}
                          className='bg-white w-full h-auto p-3 rounded-lg transition duration-500 ease-in-out hover:shadow-md mb-4'
                        >
                          <div className='overflow-hidden rounded-lg mb-4'>
                            <img
                              src={imageUrl}
                              alt={book.title}
                              className='w-full h-auto object-cover transform transition-transform duration-500 ease-in-out hover:scale-105'
                            />
                          </div>
                          <p className='text-xl font-bold mb-2 truncate'>{book.title}</p>
                          <p className='text-gray-600 mb-2 truncate'>{book.author}</p>
                          <div className='flex items-center mb-2'>
                            <div className='text-yellow-500 mr-2'>★★★★★</div>
                            <span className='text-gray-600 truncate'>{book.stock}</span>
                          </div>
                          <p className='text-red-500 text-lg font-bold truncate'>$ {book.price}</p>
                        </div>
                        <div className='jamb bg-slate-200 w-px h-4/5 mx-2'></div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className='list-by-line'>
              {currentBooks.length === 0 ? (
                <div className='not-found'>
                  <h2 className='text-center my-20'>
                    No books found matching the selected filters.
                  </h2>
                </div>
              ) : (
                <div className='flex flex-col'>
                  {currentBooks.map((book, index) => {
                    const imageUrl = book.imageUrl ? book.imageUrl : bookNotImage;

                    return (
                      <div className='mx-6'>
                        <div
                          className='flex items-center w-3/4 rounded-lg transition-all hover:shadow-md duration-500 ease-in-out'
                          key={index}
                        >
                          <div className='overflow-hidden w-1/3 m-3'>
                            <img
                              src={imageUrl}
                              alt={book.title}
                              className='w-full h-auto object-cover transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg'
                            />
                          </div>
                          <div id={index} className='w-3/4 ml-2 flex flex-col justify-center'>
                            <p className='text-xl font-bold mb-2 truncate'>{book.title}</p>
                            <div className='flex items-center mb-2'>
                              <div className='text-yellow-500 mr-2'>★★★★★</div>
                              <span className='text-gray-600 truncate'>{book.stock}</span>
                            </div>
                            <p className='text-gray-400 text-sm mb-2 truncate'>{book.author}</p>
                            <p className='text-gray-600 text-sm mb-2 mr-4 text-balance'>
                              {book.description}
                            </p>
                            <p className='text-red-500 text-2xl font-bold truncate'>
                              $ {book.price}
                            </p>
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
          <Pagination
            current={currentPage}
            className='flex justify-center my-4'
            total={filterBooks.length}
            pageSize={booksPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}
