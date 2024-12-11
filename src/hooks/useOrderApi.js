import { axiosClient } from "../ApiConfig/apiConfig";

const ORDER_API_ENDPOINT = '/order';

const orderApi = {
  // fn: get all shop
  getAllOrderByShop: (id, sort) => {
    const queryParams = new URLSearchParams({
      status: sort, // Truyền sort dưới dạng status (nếu API yêu cầu)
    }).toString();
  
    const url = `${ORDER_API_ENDPOINT}/getAllOrderByShop/${id}?${queryParams}`;
    return axiosClient.get(url);
  },

  // Tìm kiếm sản phẩm theo keyword
  searchOrder: (keyword) => {
    const url = `${ORDER_API_ENDPOINT}/search?keyword=${keyword}`; 
    return axiosClient.get(url,{});
  },

  getDetailOrder: (orderId) => {
    const url = `${ORDER_API_ENDPOINT}/${orderId}`; 
    return axiosClient.get(url,{});
  },

  getDetailOrderCustomer: (orderId) => {
    const url = `${ORDER_API_ENDPOINT}/getDetailOrder/${orderId}`; 
    return axiosClient.get(url,{});
  },
  updateStatusOrder: (orderId,shopId) => {
    const url = `${ORDER_API_ENDPOINT}/${orderId}/shops/${shopId}/status`; 
    return axiosClient.patch(url,{});
  },

  // Tạo đơn hàng với VNPay
  createVNPayOrder: (orderData) => {
    const url = `${ORDER_API_ENDPOINT}/place-order-vn`; // Endpoint của BE
    return axiosClient.post(url, orderData); // Gửi dữ liệu đơn hàng
  },

  createSTPOrder: (orderData) => {
    const url = `${ORDER_API_ENDPOINT}/place-order-stp`; // Endpoint của BE
    return axiosClient.post(url, orderData); // Gửi dữ liệu đơn hàng
  },

  createPlaceOrder: (orderData) => {
    const url = `${ORDER_API_ENDPOINT}/place-order`; // Endpoint của BE
    return axiosClient.post(url, orderData); // Gửi dữ liệu đơn hàng
  },

  getCustomerOrders: (id) => {
    const url = `${ORDER_API_ENDPOINT}/customer/${id}`;  // Gọi API bằng ID của khách hàng từ localStorage hoặc context nếu có
    return axiosClient.get(url);
  },
  getTotalOrdersInTransit: () => {
    const url = `${ORDER_API_ENDPOINT}/totalOrdersInTransit`; 
    return axiosClient.get(url);
  },

  getTotalOrdersInShop: (id) => {
    const url = `${ORDER_API_ENDPOINT}/totalOrderInShop/${id}`; 
    return axiosClient.get(url);
  },

  getTotalBuyers: (id) => {
    const url = `${ORDER_API_ENDPOINT}/totalBuyers/${id}`; 
    return axiosClient.get(url);
  }
 
};

export default orderApi;
