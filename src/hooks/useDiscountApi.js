import { axiosClient } from '../ApiConfig/apiConfig';

const VOUCHER_API_ENDPOINT = '/shop';

const vouchersApi = {
  // Lấy tất cả voucher với các tham số tìm kiếm


  getVoucherByShop: (id,status) => {
    const url = `${VOUCHER_API_ENDPOINT}/getAllVoucherForShop/${id}?sort=${status}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url,{});
  },
  // Tìm kiếm sản phẩm theo keyword
  searchProducts: (keyword) => {
    const url = `${VOUCHER_API_ENDPOINT}/search?keyword=${keyword}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url);
  },



  exportFileProducts: () => {
    const url =`${VOUCHER_API_ENDPOINT}/exportFile`; // Chỉnh lại URL đúng format
    return axiosClient.get(url,{ responseType: 'blob' });
  },


  postCreateProduct: (formData) => {
    const url = `${VOUCHER_API_ENDPOINT}/create`;
    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Quan trọng cho dữ liệu FormData
      },
    });

  },

    // Cập nhật sản phẩm
    updateProduct: (id, formData) => {
      const url = `${ACCOUNT_API_ENDPOINT}/${id}`;
      return axiosClient.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Quan trọng cho dữ liệu FormData
        },
      });
    },
  
  
  deleteProduct: (id) => {
    const url = `${VOUCHER_API_ENDPOINT}/deleteVoucher/${id}`;
    return axiosClient.put(url,{});
  },
};

export default vouchersApi;
