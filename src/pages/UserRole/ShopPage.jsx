import {
  BarsOutlined,
  EyeOutlined,
  QrcodeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Pagination, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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

  // Fetch filtered shops based on the search keyword
  const searchShop = async (keyword) => {
    setLoading(true);
    try {
      const response = await shopApi.searchShop(keyword);
      const data = await response.data;
      setShopList(data);
      setFilterShop(data);
    } catch (error) {
      console.error('Error searching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchshops when the component first loads
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
      <div className='header my-5 p-5 sm:p-10 flex justify-center sm:justify-between items-center bg-gradient-to-tl from-[#f8f4ef] to-transparent'>
        <h1 className='hidden sm:block text-2xl text-[#f18966] font-bold'>
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
          <SearchOutlined className='text-white cursor-pointer text-lg sm:text-xl bg-[#679089] p-2 rounded-full transition-transform duration-300 transform hover:scale-110' />
        </div>
      </div>
      <div className=''>
        <div className=''>
          <div className='option-number-shops-show flex justify-end mb-4'>
            <Select
              defaultValue='Show 10'
              value={`Show ${shopsPerPage}`} // Hiển thị số lượng sách đang chọn
              onChange={(value) => setShopsPerPage(parseInt(value.replace('Show ', '')))} // Cập nhật shopsPerPage khi người dùng thay đổi
              className='w-28 mr-5'
              options={[
                { value: 'Show 5', label: 'Show 5' },
                { value: 'Show 10', label: 'Show 10' },
                { value: 'Show 20', label: 'Show 20' },
                { value: 'Show 50', label: 'Show 50' },
              ]}
            />
          </div>
          <div className='horizontal-line bg-slate-200 w-full h-px my-2'></div>
          <div className=''>
            {loading ? (
              <div className='flex justify-center items-center h-screen'>
                <div className='text-center'>
                  <LoadingSpinner />
                </div>
              </div>
            ) : (
              <div className=''>
                <div className='list-by-block mx-auto'>
                  {shopList.length === 0 ? (
                    <div className='not-found'>
                      <h2 className='text-center my-20'>
                        No shops found matching the selected filters.
                      </h2>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:gap-2'>
                      {shopList.map((shop, index) => {
                        const imageUrl = shop.images[0] ? shop.images[0] : 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732181350/VuHoangNam_wbngk0.jpg';
                        return (
                          <div className='' key={index}>
                            <div className="flex sm:flex-col items-start sm:items-center justify-between sm:justify-start md:w-5/6 lg:w-11/12 mx-auto hover:shadow-lg duration-300 ease-in-out rounded-md mb-4 bg-gradient-to-tl from-[#f8f4ef] to-transparent">
                              <div className='relative group overflow-hidden w-1/2 sm:w-11/12 m-2 rounded-lg'>
                                <div className="w-full h-55"> 
                                  <img
                                    src={imageUrl}
                                    alt={shop.avartar}
                                    className='w-full h-full object-cover rounded-lg'
                                  />
                                </div>
                                <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                                  <div className='absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4'>
                                    <button className='flex justify-center items-center px-2 py-3 bg-white rounded-full hover:bg-red-500 hover:text-white transform translate-x-10 group-hover:translate-x-0 duration-300 delay-75 shadow-lg'>
                                      <NavLink to={`/shops/detailShop/${shop._id}`}><EyeOutlined className='w-6 h-4 flex justify-center items-center text-black-500' /></NavLink>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div id={index} className='w-1/2 sm:w-11/12 h-auto m-2'>
                                <div className="">
                                 <Link to={`/shops/detailShop/${shop._id}`}> <p className='text-xl font-bold mb-2 text-wrap text-[#F18966]'>{shop.shopName}</p></Link>
                                  <p className='text-gray-800 text-xs mb-2 truncate font-bold'>Contact: <span className='text-sm text-black-2'>{shop.phoneNumber}</span></p>
                                  <p className="w-11/12 text-gray-600 text-sm mb-2 mr-2 sm:truncate">
                                    {shop.shopAddress}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className='jamb bg-slate-200 h-px my-2 w-11/12 mx-auto'></div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            current={currentPage}
            total={totalPages * shopsPerPage} // Tổng số mục = số trang * số mục mỗi trang
            pageSize={shopsPerPage} // Sử dụng shopsPerPage thay cho pageSize cố định
            onChange={(page) => setCurrentPage(page)} // Cập nhật trang khi người dùng chuyển trang
            className='mt-4 mb-8 flex justify-center'
          />
        </div>
      </div>
    </div>
  );
}