import { axiosClient } from "../ApiConfig/apiConfig";

const ACCOUNT_API_ENDPOINT = '/shop';

const shopApi = {
  // fn: get all shop
  getAllShop: ({ name, page = 1, limit = 10 }) => {
    // Tạo chuỗi query từ các tham số
    const queryParams = new URLSearchParams({
      name,
      page,
      limit,
    }).toString();

    const url = `${ACCOUNT_API_ENDPOINT}?${queryParams}`;
    return axiosClient.get(url);
  },

  // Tìm kiếm sản phẩm theo keyword
  searchShop: (keyword) => {
    const url = `/shop/search?keyword=${keyword}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url);
  },

  getDetailShop: (id) => {
    const url = `/showDetailShop/${id}`; 
    return axiosClient.get(url);
  },

  getWithdrawalByShopId: () => {
    const url = `/shop/withdrawals`; 
    return axiosClient.get(url);
  },

  searchWithdrawal: (keyword) => {
    const url = `/shop/withdrawals/search?keyword=${keyword}`; 
    return axiosClient.get(url);
  },
 

  totalShop: () => {
    const url = `/shop/totalShop`; 
    return axiosClient.get(url);
  },
 
  totalRevenue: () => {
    const url = `/shop/totalRevenue`; 
    return axiosClient.get(url);
  },
  
  getMonthlyRevenue: () => {
    const url = `/shop/monthlyRevenue`; 
    return axiosClient.get(url);
  },

  getTotalRevenueForShop: (id) => {
    const url = `/shop/totalRevenueForShop/${id}`; 
    return axiosClient.get(url);
  },

  getMonthlyRevenueForShop: (id) => {
    const url = `/shop/monthlyRevenue/${id}`; 
    return axiosClient.get(url);
  },
  // Tạo yêu cầu rút tiền
  createWithdrawRequest: (amount) => {
    const url = `/shop/withdraws`;
    return axiosClient.post(url, { amount });
  },

  shopInfo: () => {
    const url = `/shop/shopInfo`; 
    return axiosClient.get(url);
  },

  // API cập nhật thông tin cửa hàng
  updateShopInfo: (formData) => {
    const url = `${ACCOUNT_API_ENDPOINT}/updateShopInfo`;
    // Gửi request PUT với dữ liệu FormData
    return axiosClient.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  newAddress: (newAddress) => {
    return axiosClient.post('/shop/address/add', newAddress,{
      headers: {
        'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
      },
    }); // Gửi yêu cầu POST đến endpoint registerShop
  },
  updateAddress: (addressId, updatedAddress) => {
    return axiosClient.put(`/shop/address/update/${addressId}`, updatedAddress, {
      headers: {
        'Content-Type': 'application/json', // Gửi dữ liệu dưới dạng JSON
      },
    });
  },
  deleteAddress: (addressId) => {
    return axiosClient.delete(`/shop/address/delete/${addressId}`, {
      headers: {
        'Content-Type': 'application/json', // Đảm bảo dữ liệu gửi đi đúng định dạng
      },
    });
  },
};


export default shopApi;
