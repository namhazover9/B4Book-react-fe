import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { Button, message, Tooltip } from 'antd';
import { FastField, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../reducers/carts';

import CheckboxField from '../../components/Field/CheckboxField';
import InputField from '../../components/Field/InputField';
import LoginGoogle from '../../components/LoginGoogle';
import constants from '../../constants/constants';
import loginApi from '../../hooks/useLogin';
import { setIsAuth } from '../../reducers/auth';
import LoginFacebook from '../../components/LoginFacebook';
import { u } from 'framer-motion/client';

function Login() {
  const navigate = useNavigate();
  const windowWidth = window.screen.width;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisableLogin, setIsDisableLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();

  // Retrieve the role from Redux in the main function

  const userRole = useSelector((state) => state.user.role[0]?.name);;
  const isAuth = useSelector((state) => state.authenticate.isAuth);

  const onLoginSuccess = async (data, role) => {
    try {
      setIsSubmitting(false);
      message.success('Đăng nhập thành công');

      localStorage.setItem(constants.REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);
      dispatch(setIsAuth(true));
      window.location.reload();

    } catch (error) {
      message.error('Lỗi đăng nhập.');
    }
  };

  // Xử lý điều hướng khi `userRole` thay đổi và `isAuth` là true
  useEffect(() => {
    if (isAuth && userRole) {
      // Điều hướng sau khi trạng thái xác thực và userRole đã được cập nhật
      if (userRole === 'Admin') {
        window.location.href = '/admin';
      } else if (userRole === 'Customer') {
        window.location.href = '/';
      }
    }
  }, [isAuth, userRole]); // Thêm userRole và isAuth vào dependency array
  

  const onLogin = async (account) => {
    try {
      setIsSubmitting(true);
      const result = await loginApi.postLogin({ account });
      if (result.status === 200) {
        
        onLoginSuccess(result.data, userRole);
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.response) {
        const { failedLoginTimes } = error.response.data;
        const messageError = error.response.data.message;
        if (failedLoginTimes >= constants.MAX_FAILED_LOGIN_TIMES) {
          message.error('Vượt quá số lần đăng nhập.\nKiểm tra email hoặc nhấn "Quên mật khẩu"', 4);
          setIsDisableLogin(true);
        } else {
          message.error(messageError);
        }
      } else {
        message.error('Đăng nhập thất bại');
      }
    }
  };

  // Giá trị khởi tạo cho Formik
  const initialValue = {
    email: '',
    password: '',
    keepLogin: false,
  };

  // Xác thực form bằng Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required('* Email bạn là gì ?').email('* Email không hợp lệ !'),
    password: Yup.string().trim().required('* Mật khẩu của bạn là gì ?'),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f6]">
      <div className="flex flex-col md:flex-row w-11/12 max-w-lg md:max-w-6xl bg-white shadow-2xl rounded-lg overflow-hidden mx-auto">
        {/* Left Section */}
        <div
          className="hidden md:flex w-full md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733796557/jaredd-craig-HH4WBGNyltc-unsplash_jcjovt.jpg')`,
          }}
        ></div>
         
        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col p-6 sm:p-8 md:p-12 bg-[#eee5da]">
         
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center md:text-left text-[#f18966]">
            Welcome to BigFour 👋
          </h1>
           
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 text-center md:text-left">
            Open the door to a world of opportunities with BigFour. Sign in to your account.
          </p>
          
          <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onLogin}>
            {(formikProps) => {
              const suffixColor = 'rgba(0, 0, 0, 0.25)';
              return (
                <Form>
                  {/* Email Input */}
                  <div className="mb-4">
                    <FastField
                      name="email"
                      component={InputField}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Email *"
                      size="large"
                      suffix={
                        <Tooltip title="Email của bạn">
                          <InfoCircleOutlined style={{ color: suffixColor }} />
                        </Tooltip>
                      }
                    />
                  </div>
  
                  {/* Password Input */}
                  <div className="mb-4">
                    <FastField
                      name="password"
                      component={InputField}
                      className="w-full px-4 py-2 border rounded-lg"
                      type="password"
                      placeholder="Password *"
                      size="large"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </div>
  
                  {/* Options */}
                  <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-4">
                    <FastField name="keepLogin" component={CheckboxField}>
                      <b>Keep me logged in</b>
                    </FastField>
                    <Link
                      to={constants.ROUTES.FORGOT_PASSWORD}
                      className="text-blue-500 font-medium mt-2 sm:mt-0"
                    >
                      Forgot Password?
                    </Link>
                  </div>
  
                  {/* Login Button */}
                  <Button
                    className="w-full py-2 mb-4 bg-[#679089] text-white rounded-lg"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={isDisableLogin}
                    loading={isSubmitting}
                  >
                    Sign In
                  </Button>
  
                  {/* Divider */}
                  <div className="text-center text-gray-500 mb-4">Or</div>
  
                  {/* Google & Facebook Login */}
                  <LoginGoogle
                    title={windowWidth > 375 ? 'Sign in with Google' : 'Google'}
                  />
                  <LoginFacebook
                    className="mt-4 bg-blue-600 hover:bg-blue-500 text-white"
                    title={windowWidth > 375 ? 'Sign in with Facebook' : 'Facebook'}
                  />
  
                  {/* Signup Link 
                  <div className="text-center mt-4">
                    Don’t have an account?
                    <Link to={constants.ROUTES.SIGNUP} className="text-blue-500 ml-1">
                      Sign Up
                    </Link>
                  </div>*/}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
  
  
}


export default Login;
