import { axiosClient } from "../ApiConfig/apiConfig";

const ACCOUNT_API_ENDPOINT = '/accounts';

const accountApi = {
  // fn: gửi mã xác nhận
  postSendVerifyCode: (email) => {
    const url = ACCOUNT_API_ENDPOINT + '/verify';
    return axiosClient.post(url, email);
  },

  // fn: đăng ký
  postSignUp: (account) => {
    const url = ACCOUNT_API_ENDPOINT + '/signup';
    return axiosClient.post(url, account);
  },

  // fn: gửi mã xác nhận lấy lại mật khẩu
  postSendCodeForgotPW: (email) => {
    const url = '/sendVerify';
    return axiosClient.post(url, { email }); // Thêm `email` vào body của request
  },
  

  // fn: reset password
  postResetPassword: (account) => {
    const url = '/resetPassword';
    return axiosClient.put(url, account);
  },
};

export default accountApi;
