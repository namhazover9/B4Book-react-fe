import React from 'react';
import PropTypes from 'prop-types';
import { useGoogleLogin } from '@react-oauth/google';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import constants from '../../constants/constants';
import loginApi from '../../hooks/useLogin';
import ggIcon from '../../assets/images/gg-icon.png';
import { setIsAuth } from '../../reducers/auth';

function LoginGoogle({ title = 'Google+', className = '' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Xử lý khi đăng nhập thành công
  const onLoginSuccess = async (data) => {
    try {
      message.success('Đăng nhập thành công');
      localStorage.setItem(constants.REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);
      // if (import.meta.env.MODE === 'production') {
      //   localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);
      // }
      navigate('/');
      dispatch(setIsAuth(true));

      // setTimeout(() => {
      //   navigate(-1);
      // }, constants.DELAY_TIME);
    } catch (error) {
      message.error('Lỗi đăng nhập.');
      console.log(error, 'error');
    }
  };

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await loginApi.postLoginWithGoogle({
          access_token: tokenResponse.access_token,
        });

        const { status, data } = response;

        if (status === 200) {
          onLoginSuccess(data);
        }
      } catch (error) {
        if (error.response) {
          message.error(error.response.data.message);
        } else {
          message.error('Đăng nhập thất bại, thử lại');
        }
      }
    },
    onError: (error) => {
      message.error('Đăng nhập thất bại. Vui lòng thử lại.');
      console.error(error);
    },
  });

  return (
    <div
      onClick={handleLogin}
      className={`flex items-center justify-between px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md shadow-lg cursor-pointer ${className}`}
    >
      <img src={ggIcon} alt="Google Icon" className="h-6 w-6" />
      <span className="text-white text-center flex-grow ml-[-40px]">{title}</span>
    </div>
  );
}

LoginGoogle.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default LoginGoogle;
