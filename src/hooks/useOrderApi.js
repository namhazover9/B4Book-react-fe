import { axiosClient } from "../ApiConfig/apiConfig";

const ORDER_API_ENDPOINT = '/order';

const orderApi = {
  // fn: get all shop
  getAllOrderByShop: (id) => {
    const url = `${ORDER_API_ENDPOINT}/getAllOrderByShop/${id}`;
    return axiosClient.get(url,{});
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
 
};

export default orderApi;
