import { axiosClient } from '../ApiConfig/apiConfig';

const ACCOUNT_API_ENDPOINT = '/products';

const productsApi = {
  // Lấy tất cả sản phẩm với các tham số tìm kiếm
  getAllProducts: ({ category, minPrice, maxPrice, author, page = 1, limit = 10, sort }) => {
    // Tạo chuỗi query từ các tham số
    const queryParams = new URLSearchParams({
      category,
      minPrice,
      maxPrice,
      author,
      page,
      limit,
      sort,
    }).toString();

    const url = `${ACCOUNT_API_ENDPOINT}?${queryParams}`;
    return axiosClient.get(url);
  },

  // Tìm kiếm sản phẩm theo keyword
  searchProducts: (keyword) => {
    const url = `${ACCOUNT_API_ENDPOINT}/search?keyword=${keyword}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url);
  },

  getProductByShop: (id,{page = 1, limit = 10 }) => {
    const queryParams = new URLSearchParams({
      page,
      limit,
    }).toString();
    const url = `${ACCOUNT_API_ENDPOINT}/getProductByShop/${id}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url);
  },

  exportFileProducts: () => {
    const url =`${ACCOUNT_API_ENDPOINT}/exportFile`; // Chỉnh lại URL đúng format
    return axiosClient.get(url,{ responseType: 'blob' });
  },

  postCreateProduct: (data) => {
    const url = `${ACCOUNT_API_ENDPOINT}/create`;
    return axiosClient.post(url,{}, data);
  },

  deleteProduct: (id) => {
    const url = `${ACCOUNT_API_ENDPOINT}/${id}`;
    return axiosClient.delete(url,{});
  },
};

export default productsApi;
