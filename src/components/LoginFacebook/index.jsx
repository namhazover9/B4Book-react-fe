import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import constants from '../../constants/constants';
import loginApi from '../../hooks/useLogin';
import FacebookLogin from 'react-facebook-login';
import { setIsAuth } from '../../reducers/auth';

function LoginFacebook({ title = 'Facebook', className = '' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user.role[0]?.name);
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const responseFacebook = async (response) => {
    try {
      const res = await loginApi.postLoginWithFacebook({
        access_token: response.accessToken,
      });

      const { status, data } = res;
      if (status === 200) {
        message.success('Đăng nhập thành công');
        localStorage.setItem(constants.REFRESH_TOKEN, data.refreshToken);
        localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);

        dispatch(setIsAuth(true));
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };
  // Xử lý điều hướng khi `userRole` thay đổi và `isAuth` là true
  useEffect(() => {
    if (isAuth && userRole) {
      if (userRole === 'Admin') {
        window.location.href = '/admin';
      } else if (userRole === 'Customer') {
        window.location.href = '/';
      }
    }
  }, [isAuth, userRole]);

  return (
    <FacebookLogin
      appId={import.meta.env.VITE_FACEBOOK_APP_ID}
      fields='name,email,picture'
      callback={responseFacebook}
      cssClass={`flex w-full items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md shadow-lg cursor-pointer ${className}`}
      icon='fa-facebook'
      textButton={title}
    />
  );
}

LoginFacebook.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default LoginFacebook;
