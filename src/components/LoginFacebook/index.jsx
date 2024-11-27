import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import constants from '../../constants/constants';
import loginApi from '../../hooks/useLogin';
import FacebookLogin from 'react-facebook-login';
import { setIsAuth } from '../../reducers/auth';

function LoginFacebook({ title = 'Facebook', className = '' }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(import.meta.env.VITE_FACEBOOK_APP_ID)
    const responseFacebook = async (response) => {
      try {
        const res = await loginApi.postLoginWithFacebook({
          access_token: response.accessToken,
        });
  
        const { status, data } = res;
        if (status === 200) {
          message.success('Đăng nhập thành công');
          localStorage.setItem(constants.REFRESH_TOKEN, data.refreshToken);
          if (import.meta.env.MODE === 'production') {
            localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);
          }
  
          dispatch(setIsAuth(true));
          navigate('/');
        }
      } catch (error) {
        message.error(error.response?.data?.message || 'Đăng nhập thất bại');
      }
    };
  
    return (
      <FacebookLogin
        appId={import.meta.env.VITE_FACEBOOK_APP_ID} 
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass={`flex items-center justify-between px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md shadow-lg cursor-pointer ${className}`}
        icon="fa-facebook"
        textButton={title}
      />
    );
  }
  
  LoginFacebook.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
  };

export default LoginFacebook;
