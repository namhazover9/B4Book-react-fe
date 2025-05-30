import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Button, message, Tooltip } from 'antd';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import CheckboxField from '../../components/Field/CheckboxField';
import InputField from '../../components/Field/InputField';
import LoginGoogle from '../../components/LoginGoogle';
import constants from '../../constants/constants';
import loginApi from '../../hooks/useLogin';
import { setIsAuth } from '../../reducers/auth';

function LoginPopup() {
  const navigate = useNavigate();
  const windowWidth = window.screen.width;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisableLogin, setIsDisableLogin] = useState(false);
  const dispatch = useDispatch();

  // Xử lý khi đăng nhập thành công
  const onLoginSuccess = async (data) => {
    try {
      setIsSubmitting(false);
      message.success('Đăng nhập thành công');
      localStorage.setItem(constants.REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);
      dispatch(setIsAuth(true));
      setTimeout(() => {
        navigate(-1);
      }, constants.DELAY_TIME);
    } catch (error) {
      message.error('Lỗi đăng nhập.');
    }
  };

  // Đăng nhập
  const onLogin = async (account) => {
    try {
      setIsSubmitting(true);
      const result = await loginApi.postLogin({ account });
      if (result.status === 200) {
        onLoginSuccess(result.data);
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.response) {
        const { failedLoginTimes } = error.response.data;
        const messageError = error.response.data.message;
        if (failedLoginTimes >= constants.MAX_FAILED_LOGIN_TIMES) {
          message.error(
            'Vượt quá số lần đăng nhập.\nKiểm tra email hoặc nhấn "Quên mật khẩu"',
            4,
          );
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
    passWord: '',
    keepLogin: false,
  };

  // Xác thực form bằng Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('* Email bạn là gì ?')
      .email('* Email không hợp lệ !'),
    passWord: Yup.string()
      .trim()
      .required('* Mật khẩu của bạn là gì ?'),
  });

  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold underline underline-offset-4 mb-5">Đăng nhập</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onLogin}>
        {(formikProps) => {
          const suffixColor = 'rgba(0, 0, 0, 0.25)';
          return (
            <Form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="mb-4">
                <FastField
                  name="email"
                  component={InputField}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Email *"
                  size="large"
                  suffix={
                    <Tooltip title="Email của bạn">
                      <InfoCircleOutlined
                        style={{
                          color: suffixColor,
                        }}
                      />
                    </Tooltip>
                  }
                />
              </div>
              <div className="mb-4">
                <FastField
                  name="passWord"
                  component={InputField}
                  className="w-full px-3 py-2 border rounded-lg"
                  type="password"
                  placeholder="Mật khẩu *"
                  size="large"
                  autocomplete="on"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <FastField name="keepLogin" component={CheckboxField}>
                  <b>Duy trì đăng nhập</b>
                </FastField>
                <Link
                  to={constants.ROUTES.FORGOT_PASSWORD}
                  className="text-blue-500 font-medium">
                  <b>Quên mật khẩu ?</b>
                </Link>
              </div>
              <Button
                className="w-full py-2 mb-4 bg-blue-500 text-white rounded-lg"
                size="large"
                type="primary"
                htmlType="submit"
                disabled={isDisableLogin}
                loading={isSubmitting}>
                Đăng nhập
              </Button>
              <div className="text-center text-gray-500 mb-4">HOẶC</div>
              <LoginGoogle
                title={windowWidth > 375 ? 'Đăng nhập với Gmail' : 'Gmail'}
              />
              <div className="text-center mt-4">
                Bạn chưa có tài khoản?
                <Link to={constants.ROUTES.SIGNUP} className="text-blue-500 ml-1">
                  Đăng ký
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginPopup;
