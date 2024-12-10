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
 

};

export default shopApi;
