import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { Button, message, Tooltip } from 'antd';
import { FastField, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../reducers/carts';
import { getUserRequest } from '../../reducers/user';

import CheckboxField from '../../components/Field/CheckboxField';
import InputField from '../../components/Field/InputField';
import LoginGoogle from '../../components/LoginGoogle';
import constants from '../../constants/constants';
import loginApi from '../../hooks/useLogin';
import { setIsAuth } from '../../reducers/auth';
import LoginFacebook from '../../components/LoginFacebook';

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

  const onLoginSuccess = async (data) => {
    try {
      setIsSubmitting(false);
      message.success('Login successful!');
      localStorage.setItem(constants.REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);
      dispatch(setIsAuth(true));
    } catch (error) {
      message.error('Login error!.');
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
          message.error('Login attempts exceeded.\nCheck email or click "Forgot Password"', 4);
          setIsDisableLogin(true);
        } else {
          message.error(messageError);
        }
      } else {
        message.error('Login failed!');
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
    email: Yup.string().trim().required('* Enter your email !').email('* Email invalid !'),
    password: Yup.string().trim().required('* Enter your password !'),
  });

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#e6dbcd] to-transparent" 
    >
      <div className="flex flex-col md:flex-row w-11/12 max-w-lg md:max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden mx-auto">
        {/* Left Section */}
        <div
          className="hidden md:flex w-full md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/ddhuhnzd2/image/upload/v1733796557/jaredd-craig-HH4WBGNyltc-unsplash_jcjovt.jpg')`,
          }}
        ></div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col p-6 sm:p-8 md:p-12 bg-gradient-to-tl from-[#e6dbcd] to-transparent">
         
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
                      className="w-full px-4 py-2 border rounded-xl"
                      placeholder="Email *"
                      size="large"
                      suffix={
                        <Tooltip title="Enter your email!">
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
                      className="w-full px-4 py-2 border rounded-xl"
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
                      className="text-blue-700 text-sm font-medium hover:opacity-80 mt-2 sm:mt-0"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <button
                    className="w-full py-2 mb-4 bg-[#679089] hover:bg-[#5c8f86] text-white rounded-xl"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={isDisableLogin}
                    loading={isSubmitting}
                  >
                    Sign In
                  </button>

                  {/* Divider */}
                  <div className="text-center text-gray-500 mb-4">Or</div>

                  {/* Google & Facebook Login */}
                  <LoginGoogle
                    className='rounded-xl'
                    title={windowWidth > 375 ? 'Sign in with Google' : 'Google'}
                  />
                  <LoginFacebook
                    className="mt-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl"
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
