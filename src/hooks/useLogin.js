import { axiosClient } from '../ApiConfig/apiConfig';
import constants from '../constants/constants';

const LOGIN_API_ENDPOINT = '/login';

const loginApi = {
  postLogin: (account) => {
    const url = LOGIN_API_ENDPOINT;
    return axiosClient.post(url, account);
  },
  verifyUser: (account) => {
    const url = LOGIN_API_ENDPOINT + '/verify';
    return axiosClient.post(url, account);
  },
  postLoginWithGoogle: (accessToken) => {
    const url = LOGIN_API_ENDPOINT + '/gg';
    return axiosClient.post(url, accessToken);
  },

  getAuth: () => {
    const url = LOGIN_API_ENDPOINT + '/auth';
      return axiosClient.get(url);
  },

  postRefreshToken: (refreshToken) => {
    const url = LOGIN_API_ENDPOINT + '/refresh_token';
    return axiosClient.post(url, refreshToken);
  },

  postLogout: () => {
    const url = LOGIN_API_ENDPOINT + '/logout';
      return axiosClient.post(url, {
        token: localStorage.getItem(constants.ACCESS_TOKEN_KEY),
      });
  },
};

export default loginApi;
