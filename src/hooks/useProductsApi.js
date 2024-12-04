import { axiosClient } from '../ApiConfig/apiConfig';

const PRODUCT_API_ENDPOINT = '/products';

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

    const url = `${PRODUCT_API_ENDPOINT}?${queryParams}`;
    return axiosClient.get(url);
  },

  // Tìm kiếm sản phẩm theo keyword
  searchProducts: (keyword) => {
    const url = `${PRODUCT_API_ENDPOINT}/search?keyword=${keyword}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url);
  },

  getProductByShop: (id,{page = 1, limit = 10 }) => {
    const queryParams = new URLSearchParams({
      page,
      limit,
    }).toString();
    const url = `${PRODUCT_API_ENDPOINT}/getProductByShop/${id}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url);
  },

  exportFileProducts: () => {
    const url =`${ACCOUNT_API_ENDPOINT}/exportFile`; // Chỉnh lại URL đúng format
    return axiosClient.get(url,{ responseType: 'blob' });
  },


  postCreateProduct: (formData) => {
    const url = `${PRODUCT_API_ENDPOINT}/create`;
    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Quan trọng cho dữ liệu FormData
      },
    });

  },

    // Cập nhật sản phẩm
    updateProduct: (id, formData) => {
      const url = `${PRODUCT_API_ENDPOINT}/${id}`;
      return axiosClient.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Quan trọng cho dữ liệu FormData
        },
      });
    },
  
  
  deleteProduct: (id) => {
    const url = `${PRODUCT_API_ENDPOINT}/${id}`;
    return axiosClient.delete(url);
  },
};

export default productsApi;
