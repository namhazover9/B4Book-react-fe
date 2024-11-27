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
    const url = `/products/search?keyword=${keyword}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url);
  },
};

export default productsApi;
