import React, { useState } from 'react';
import { BarsOutlined, EyeOutlined, HeartOutlined, QrcodeOutlined, ReadOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Checkbox, Menu, Pagination, Select, Slider, Switch } from 'antd';
import { useEffect } from 'react';

export default function ProductPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [bookList, setBookList] = useState([]);
  const booksPerPage = 8;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://b4book-node-be.onrender.com/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBookList(data);
        setFilterBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Filter Category
  const uniqueCategories = bookList.reduce((categories, book) => {
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
  const uniqueAuthors = bookList.reduce((authors, book) => {
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
    const filteredBooks = bookList.filter((book) => {

      // Kiểm tra Category
      const categoryMatch = categories.length
        ? categories.some((category) => {
          return Array.isArray(book.category)
            ? book.category.some((cat) => cat.includes(category))
            : book.category.includes(category);
        })
        : true;

      // Kiểm tra Author
      const authorMatch = authors.length ? authors.includes(book.author) : true;

      // Kiểm tra Price
      const priceMatch = book.price >= price[0] && book.price <= price[1];

      return categoryMatch && authorMatch && priceMatch;
    });

    console.log('Filtered Books:', filteredBooks);

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
                max={200000}
                onChange={handleSliderChange}
                onChangeComplete={handleSliderAfterChange}
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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                  {currentBooks.map((book, index) => {
                    const imageUrl = book.images[0] ? book.images[0] : 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732181350/VuHoangNam_wbngk0.jpg';

                    return (
                      <div className='flex justify-between items-center' key={index}>
                        <div
                          id={index}
                          className='bg-white w-full h-auto p-3 rounded-lg transition duration-500 ease-in-out hover:shadow-md mb-4'
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
                          <p className='text-2xl font-bold mb-2 truncate'>{book.title}</p>
                          <div className="flex justify-between mb-2 items-center mr-5">
                            <p className='text-lg text-gray-600 truncate'>{book.author}</p>
                            <p className='text-md text-gray-600 italic truncate'>{book.category}</p>
                          </div>
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
                    const imageUrl = book.images[0] ? book.images[0] : 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732181350/VuHoangNam_wbngk0.jpg';

                    return (
                      <div className='mx-6'>
                        <div
                          className='flex items-center w-3/4 rounded-lg transition-all hover:shadow-md duration-500 ease-in-out'
                          key={index}
                        >
                          <div className='relative group overflow-hidden w-1/3 m-3'>
                            <img
                              src={imageUrl}
                              alt={book.title}
                              // className='w-full h-auto object-cover transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg'
                              className='w-full h-auto object-cover'
                            />
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
