import { axiosClient } from '../ApiConfig/apiConfig';
import constants from '../constants/constants';

const USER_API_URL = '/user';

const userApi = {
  getUser: () => {
    const url = USER_API_URL;
      return axiosClient.get(url);
  },
  putUpdateUser: (userId = '', value = {}) => {
    const url = USER_API_URL + '/update';
    return axiosClient.put(url, { userId, value });
  },
};

export default userApi;
