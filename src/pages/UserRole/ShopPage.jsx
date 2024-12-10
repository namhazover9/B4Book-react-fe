import {
  BarsOutlined,
  EyeOutlined,
  QrcodeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Pagination, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../components/loading';
import shopApi from '../../hooks/useShopApi';

export default function ShopPage() {
  const [filterShop, setFilterShop] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [shopList, setShopList] = useState([]);
  const [shopsPerPage, setShopsPerPage] = useState(10); // Số sách mặc định mỗi trang
  const [searchKeyword, setSearchKeyword] = useState(''); // State for the search keyword
  const [loading, setLoading] = useState(true);
  const [selectedName, setSelectedName] = useState([]);
  const [selectedSort, setSelectedSort] = useState('default');


  const fetchShops = async () => {
    setLoading(true);
    try {
      const response = await shopApi.getAllShop({
        name: selectedName.join(','),
        page: currentPage,
        limit: shopsPerPage,
      });
      const data = response.data;
      setShopList(data.data);
      setFilterShop(data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching shop:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filtered books based on the search keyword
  const searchShop = async (keyword) => {
    setLoading(true);
    try {
      const response = await shopApi.searchShop(keyword);
      const data = await response.data;
      setShopList(data);
      setFilterShop(data);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchBooks when the component first loads
  useEffect(() => {
    fetchShops();
  }, [currentPage, setSelectedName, selectedSort, shopsPerPage]);

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() === '') {
      // If search keyword is empty, fetch all products
      fetchShops();
    } else {
      // Fetch products based on the search keyword
      searchShop(keyword);
    }
  };

  // View Change
  const [viewMode, setViewMode] = useState('block');

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className='container mx-auto'>
      <div className='header my-5 bg-slate-200 p-5 sm:p-10 flex justify-center sm:justify-between items-center'>
        <h1 className='hidden sm:block text-2xl text-red-500 font-medium'>
          <span className='text-lg text-black sm:hidden md:block'>Welcome to</span> Shops Page!
        </h1>
        <div className='flex w-4/5 py-1 sm:w-1/2 md:w-2/3 items-center border rounded-full px-2 sm:px-3 sm:py-3 bg-gray-100'>
          <input
            type='text'
            value={searchKeyword}
            onChange={handleSearchChange} // Handle search input change
            placeholder='Search products...'
            className='flex-grow outline-none bg-transparent text-sm sm:text-base text-gray-700 px-2'
          />
          <SearchOutlined className='text-white cursor-pointer text-lg sm:text-xl bg-red-500 p-2 rounded-full transition-transform duration-300 transform hover:scale-110' />
        </div>
      </div>
      <div className='flex flex-col lg:flex-row justify-between md:items-center lg:items-start'>
        <div className='mx-5 lg:mx-0 list-books lg:w-1/6 flex flex-col md:w-11/12 md:mx-52'>
          <div className='genre'>
            <div className='genre-ipad hidden lg:block'>
       
            </div>
          </div>

          <div className='hidden lg:block'>
            <br />
          </div>

          <div className='price'>
            <div className='price-ipad hidden lg:block'>
            </div>
          </div>
        </div>
        <div className='all-books w-full md:w-11/12 lg:w-5/6 lg:ml-4 sm:flex flex-col items-center'>
          <div className='header-all-books flex justify-between items-center mx-4 my-2 lg:my-0 lg:w-11/12'>
            <div className='option-form-left flex items-center w-1/12 justify-end lg:justify-start'>
              <QrcodeOutlined
                className={`mr-2 choice-icon-tnvd ${viewMode === 'block' ? 'text-blue-500' : ''}`}
                onClick={() => handleViewModeChange('block')}
              />
              <BarsOutlined
                className={`choice-icon-tnvd hidden md:block ${
                  viewMode === 'line' ? 'text-blue-500' : ''
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
                  value={`Show ${shopsPerPage}`} // Hiển thị số lượng sách đang chọn
                  onChange={(value) => setShopsPerPage(parseInt(value.replace('Show ', '')))} // Cập nhật shopsPerPage khi người dùng thay đổi
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
                  <div className='list-by-block sm:w-11/12 xl:w-full'>
                    {shopList.length === 0 ? (
                      <div className='not-found'>
                        <h2 className='text-center my-20'>
                          No shops found matching the selected filters.
                        </h2>
                      </div>
                    ) : (
                      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                        {shopList.map((shop, index) => {
                          const imageUrl = shop.images[0] ? shop.images[0] : '';

                          return (
                            <div
                              className='flex flex-col sm:flex-row justify-between items-center'
                              key={index}
                            >
                              <div
                                id={index}
                                className='bg-white w-11/12 sm:w-full h-auto p-3 rounded-lg transition duration-500 ease-in-out hover:shadow-md sm:mb-4'
                              >
                                <div className='relative group overflow-hidden rounded-lg mb-4'>
                                  <img
                                    src={imageUrl}
                                    alt={shop.avartar}
                                    className='w-full h-96 object-cover'
                                  />
                                  <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                                    <div className='absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4'>
                                      <button className='flex justify-center items-center px-2 py-3 bg-white rounded-full hover:bg-red-500 hover:text-white transform translate-x-10 group-hover:translate-x-0 duration-300 delay-75 shadow-lg'>
                                     <NavLink to={`/shops/detailShop/${shop._id}`}><EyeOutlined  className='w-6 h-6 flex justify-center items-center text-black-500'  /></NavLink>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <p className='text-2xl font-bold mb-2 truncate'>{shop.shopName}</p>
                                <div className='flex justify-between mb-2 items-center mr-5'>
                                  <p className='text-lg text-gray-600 truncate'>{shop.phoneNumber}</p>
                                  <p className='text-md text-gray-600 italic truncate'>
                                    {shop.shopAddress}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='grid-view'>
                    {/* Your grid view content goes here */}
                    {/* For example, you might display the books in a grid layout */}
                    <div className='grid grid-cols-2 gap-4'>
                      {shopList.map((shop, index) => (
                        <div key={index} className='card'>
                          <img src={shop?.avartar[0]} alt={shop.shopName} />
                          <h3>{shop.shopEmail}</h3>
                          <p>{shop.phoneNumber}</p>
                          <p>{shop.shopAddress}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            current={currentPage}
            total={totalPages * shopsPerPage} // Tổng số mục = số trang * số mục mỗi trang
            pageSize={shopsPerPage} // Sử dụng shopsPerPage thay cho pageSize cố định
            onChange={(page) => setCurrentPage(page)} // Cập nhật trang khi người dùng chuyển trang
            className='mt-4 mb-4'
          />
        </div>
      </div>
    </div>
  );
}
