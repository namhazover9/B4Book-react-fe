import { axiosClient } from '../ApiConfig/apiConfig';
import constants from '../constants/constants';

const ADMIN_API_URL = '/admin';

const adminApi = {
  getUser: ({ role, status }) => {
    const queryParams = new URLSearchParams({
      ...(role && { role }),
      ...(status && { status })
    }).toString();
    const url = `${ADMIN_API_URL}/showAllUser?${queryParams}`;
    return axiosClient.get(url);
  },

  activeOrDeactiveUser: (id, status) => {
    const url = `${ADMIN_API_URL}/activeorDeactive?id=${id}&status=${status}`;
    return axiosClient.put(url); // Sử dụng axiosClient để gọi API
  },

 searchAccount: (keyword) => {
    const url = `${ADMIN_API_URL}/search?keyword=${keyword}`; // Chỉnh lại URL đúng format
    return axiosClient.get(url);
  },

  getAllRegisterShop: () => {
    const url = `${ADMIN_API_URL}/showAllRegisterForm`;
    return axiosClient.get(url,{});
  },

  postApproveShop: (id) => {
    const url = `${ADMIN_API_URL}/approveShop/${id}`;
    return axiosClient.put(url);
  },

  getAllRegisterProducts: () => {
    const url = `${ADMIN_API_URL}/showAllProductRegister`;
    return axiosClient.get(url,{});
  },

  postApproveProduct: (id) => {
    const url = `${ADMIN_API_URL}/approvedProduct/${id}`;
    return axiosClient.put(url);
  },

  getAllWithdrawals: (status) => {
    const queryParams = new URLSearchParams({
      status: status // Truyền sort dưới dạng status (nếu API yêu cầu)
    }).toString();

    const url = `${ADMIN_API_URL}/allWithdrawals?${queryParams}`;
    return axiosClient.get(url);
  },

  updateWithdrawRequest: (requestId, status) => {
    const url = `${ADMIN_API_URL}/withdrawals/update`;
    return axiosClient.patch(url, { requestId, status }); // Gửi yêu cầu PATCH với dữ liệu body
  },
};

export default adminApi;
