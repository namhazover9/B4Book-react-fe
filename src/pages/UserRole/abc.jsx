import React, { useState, useEffect } from 'react';
import {
  BarsOutlined,
  EyeOutlined,
  HeartOutlined,
  QrcodeOutlined,
  ReadOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Card, Checkbox, Menu, Pagination, Select, Slider, Switch } from 'antd';
import productsApi from '../../hooks/useProductsApi';
import LoadingSpinner from '../../components/loading';

export default function ProductPage() {
  const [filterBooks, setFilterBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [bookList, setBookList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  const booksPerPage = 10; // Can adjust based on select options or need
  const hardcodedCategories = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Biography', 'Fantasy', 'Romance', 'History',
  ];

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
      setFilterBooks(data.data);
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
      const data = response.data;
      setBookList(data.data);
      setFilterBooks(data.data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchBooks when the component first loads
  useEffect(() => {
    fetchBooks();
  }, [currentPage, priceRange, selectedCategories, selectedAuthors, selectedSort]);

  // Search input change
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    if (keyword.trim() === '') {
      fetchBooks();
    } else {
      searchBooks(keyword);
    }
  };

  // Categories & Authors management
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedSort, setSelectedSort] = useState('default');

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
  };

  const handleAuthorChange = (checkedValues) => {
    setSelectedAuthors(checkedValues);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const uniqueCategories = bookList.reduce((categories, book) => {
    book.category.forEach((cat) => {
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    });
    return categories;
  }, []);

  const uniqueAuthors = bookList.reduce((authors, book) => {
    if (!authors.includes(book.author)) {
      authors.push(book.author);
    }
    return authors;
  }, []);

  // For price range
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked) => setDisabled(checked);

  return (
    <div className='container mx-auto'>
      <div className='header my-5 bg-slate-200 p-5 sm:p-10 flex justify-center sm:justify-between items-center'>
        <h1 className='hidden sm:block text-2xl text-red-500 font-medium'>
          <span className='text-lg text-black sm:hidden md:block'>Welcome to</span> Products Page!
        </h1>
        <div className='flex w-4/5 py-1 sm:w-1/2 md:w-2/3 items-center border rounded-full px-2 sm:px-3 sm:py-3 bg-gray-100'>
          <input
            type='text'
            value={searchKeyword}
            onChange={handleSearchChange}
            placeholder='Search products...'
            className='flex-grow outline-none bg-transparent text-sm sm:text-base text-gray-700 px-2'
          />
          <SearchOutlined className='text-white cursor-pointer text-lg sm:text-xl bg-red-500 p-2 rounded-full transition-transform duration-300 transform hover:scale-110' />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row justify-between md:items-center lg:items-start'>
        <div className='mx-5 lg:mx-0 list-books lg:w-1/6 flex flex-col md:w-11/12 md:mx-52'>
          <div className='genre'>
            <Menu
              className='h-80 overflow-y-auto'
              mode='inline'
              onSelect={handleCategoryChange}
              multiple
              items={uniqueCategories.map((category, index) => ({
                key: `category-${index}`,
                label: <Checkbox>{category}</Checkbox>,
              }))}
            />
          </div>

          <div className='price'>
            <Card
              title='Filter by Price'
              className='h-auto overflow-y-auto bg-gray-50'
              bordered={false}
            >
              <Slider range value={priceRange} max={200000} onChange={setPriceRange} disabled={disabled} />
              <div className='flex justify-between mt-2'>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <div className='my-5'>
                Disabled:{' '}
                <Switch size='small' checked={disabled} onChange={onChange} />
              </div>
            </Card>
          </div>
        </div>

        <div className='all-books w-full md:w-11/12 lg:w-5/6 lg:ml-4 sm:flex flex-col items-center'>
          {loading ? (
            <div className='flex justify-center items-center h-screen'>
              <LoadingSpinner />
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
              {bookList.map((book, index) => {
                const imageUrl = book.images[0] || '';
                return (
                  <div className='flex flex-col sm:flex-row justify-between items-center' key={index}>
                    <Card
                      hoverable
                      cover={<img alt={book.title} src={imageUrl} />}
                    >
                      <p className='text-xl font-bold mb-2'>{book.title}</p>
                      <p className='text-md'>{book.author}</p>
                      <p className='text-lg text-red-500'>${book.price}</p>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}

          <Pagination
            current={currentPage}
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
