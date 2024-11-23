import { message } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import constants from '../../constants/constants';
import loginApi from '../../hooks/useLogin';
import authReducers from '../../reducers/auth';
import ggIcon from '../../assets/images/gg-icon.png';

function LoginGoogle(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Xử lý khi đăng nhập thành công
  const onLoginSuccess = async (data) => {
    try {
      message.success('Đăng nhập thành công');
      localStorage.setItem(constants.REFRESH_TOKEN, data.refreshToken);

      // Kiểm tra môi trường và lưu token
      if (import.meta.env.MODE === 'production') {
        localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);
      }

      dispatch(authReducers.setIsAuth(true));

      // Chuyển hướng về trang trước đó sau khi đăng nhập thành công
      setTimeout(() => {
        navigate(-1);
      }, constants.DELAY_TIME);
    } catch (error) {
      message.error('Lỗi đăng nhập.');
    }
  };

  // Đăng nhập bằng Google
  const onLoginWithGoogle = async (res) => {
    try {
      const { accessToken } = res;
      const response = await loginApi.postLoginWithGoogle({
        access_token: accessToken,
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
  };

  return (
    <GoogleLogin
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <div
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className={`flex items-center justify-between px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md shadow-lg cursor-pointer ${props.className}`}
        >
          <img src={ggIcon} alt="Google Icon" className="h-6 w-6" />
          <span className="text-white text-center flex-grow ml-[-40px]">
            {props.title}
          </span>
        </div>
      )}
      onSuccess={onLoginWithGoogle}
      onFailure={onLoginWithGoogle}
      cookiePolicy="single_host_origin"
    />
  );
}

LoginGoogle.defaultProps = {
  title: 'Google+',
  className: '',
};

LoginGoogle.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default LoginGoogle;
