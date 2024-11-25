import { axiosClient } from '../ApiConfig/apiConfig';

const ACCOUNT_API_ENDPOINT = '/products';

const productsApi = {
  // Lấy tất cả sản phẩm
  getAllProducts: () => {
    const url = ACCOUNT_API_ENDPOINT;
    return axiosClient.get(url);
  },

  // Hàm để tạo URL với các bộ lọc nối lại với nhau
  buildFilterUrl: (filters) => {
    let url = `${ACCOUNT_API_ENDPOINT}/filter?`;
    const filterParams = [];

    // Kiểm tra các filter và thêm vào filterParams
    if (filters.category) {
      filterParams.push(`category=${filters.category}`);
    }
    if (filters.author) {
      filterParams.push(`author=${filters.author}`);
    }
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      filterParams.push(`minPrice=${filters.minPrice}&&maxPrice=${filters.maxPrice}`);
    }

    // Nếu có bộ lọc, nối các tham số vào URL
    if (filterParams.length > 0) {
      url += `${filterParams.join('&&')}`;
    }

    return url;
  },

  // Lọc sản phẩm theo các điều kiện động
  getFilteredProducts: (filters) => {
    const url = productsApi.buildFilterUrl(filters);
    return axiosClient.get(url);
  },
};

export default productsApi;
