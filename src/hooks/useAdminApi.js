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
};

export default adminApi;
