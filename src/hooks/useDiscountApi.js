import { axiosClient } from '../ApiConfig/apiConfig';

const VOUCHER_API_ENDPOINT = '/shop';

const vouchersApi = {
  // Lấy tất cả voucher với các tham số tìm kiếm


  getVoucherByShop: (id,status) => {
    const url = `${VOUCHER_API_ENDPOINT}/getAllVoucherForShop/${id}?sort=${status}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url,{});
  },
  // Tìm kiếm sản phẩm theo keyword
  searchVouchers: (name,id) => {
    const url = `${VOUCHER_API_ENDPOINT}/searchVoucher?shop=${id}&name=${name}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url);
  },

  postCreateVoucher: (formData) => {
    const url = `${VOUCHER_API_ENDPOINT}/createVoucher`;
    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Quan trọng cho dữ liệu FormData
      },
    });

  },

    // Cập nhật sản phẩm
    updateVoucher: (id, formData) => {
      const url = `${VOUCHER_API_ENDPOINT}/updateVoucher/${id}`;
      return axiosClient.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Quan trọng cho dữ liệu FormData
        },
      });
    },
  
  
  deleteVoucher: (id) => {
    const url = `${VOUCHER_API_ENDPOINT}/deleteVoucher/${id}`;
    return axiosClient.put(url,{});
  },
};

export default vouchersApi;
