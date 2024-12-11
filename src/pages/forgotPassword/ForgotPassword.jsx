import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { Button, message, Tooltip } from 'antd';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Change Redirect to Navigate
import * as Yup from 'yup';
import InputField from '../../components/Field/InputField';
import Delay from '../../components/Delay';
import constants from '../../constants/constants';
import accountApi from '../../hooks/useAccountApi';

function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [verifyToken, setVerifyToken] = useState('');
  const emailRef = useRef('');
  const onSendCode = async () => {
    const email = emailRef.current;
    if (!email) {
      message.error('Email is required');
      return;
    }
  
    try {
      setIsSending(true);
      const result = await accountApi.postSendCodeForgotPW(email); // Truyền email vào API
      setVerifyToken(result.data.verify);
      if (result.status === 200) {
        message.success('Gửi thành công, kiểm tra email');
      } else {
        message.error('Gửi thất bại, thử lại');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Gửi thất bại, thử lại');
    } finally {
      setIsSending(false);
    }
  };
  useEffect(() => {
  }, [verifyToken]); // Mỗi khi verifyToken thay đổi, useEffect sẽ được gọi

  const initialValue = {
    email: '',
    newPassword: '',
    verifyCode: '',
  };

  const onChangePassword = async (values) => {
    const account = {
      ...values,
      verifyToken: verifyToken, 
    };
    console.log('Verify Token:', verifyToken);
    try {
      setIsSubmitting(true);
      const result = await accountApi.postResetPassword(account);
      if (result.status === 200) {
        setIsSubmitting(false);
        setIsSuccess(true);
        message.success('Thay đổi mật khẩu thành công.');
        Navigate(constants.ROUTES.LOGIN);
      } else {
        throw new Error(result.message || 'Không thành công');
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      message.error(error.response?.data?.message || 'Cập nhật thất bại. Thử lại');
    }
  };
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('* Your Email ?')
      .email('* Invalid Email !'),
    newPassword: Yup.string()
      .trim()
      .required('* Your Password ?'),
    verifyCode: Yup.string()
      .trim()
      .required('* Enter OTP')
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tl from-[#eee5da] to-transparent">
      {isSuccess && (
        <Delay wait={constants.DELAY_TIME}>
          {/* Use Navigate instead of Redirect */}
          <Navigate to={constants.ROUTES.LOGIN} />
        </Delay>
      )}
      <div className="w-full max-w-md bg-gradient-to-tl from-[#eee5da] to-transparent shadow-lg rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold mb-6 text-[#f18966]">Change Password</h1>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={onChangePassword}>
          {(formikProps) => {
            emailRef.current = formikProps.values.email;
            const suffixColor = 'rgba(0, 0, 0, 0.25)';
            return (
              <Form className="space-y-4">
                {/* Email */}
                <FastField
                  name="email"
                  component={InputField}
                  className="w-full"
                  placeholder="Email *"
                  size="large"
                  suffix={
                    <Tooltip title="Your Email">
                      <InfoCircleOutlined style={{ color: suffixColor }} />
                    </Tooltip>
                  }
                />
                {/* Mật khẩu */}
                <FastField
                  name="newPassword"
                  component={InputField}
                  className="w-full"
                  type="password"
                  placeholder="New Password *"
                  size="large"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                {/* Mã xác nhận và Gửi mã */}
                <div className="flex gap-4">
                  <FastField
                    name="verifyCode"
                    component={InputField}
                    className="flex-1"
                    placeholder="Verified Code *"
                    size="large"
                    suffix={
                      <Tooltip title="Click gửi mã để nhận mã qua email">
                        <InfoCircleOutlined style={{ color: suffixColor }} />
                      </Tooltip>
                    }
                  />
                  <Button
                    className="w-full bg-[#679089] text-white font-semibold"

                    size="large"
                    onClick={onSendCode}
                    loading={isSending}>
                    Send OTP
                  </Button>
                </div>
                {/* Nút Submit */}
                <Button
                  className="w-full bg-[#679089] text-white font-semibold py-2 rounded hover:bg-[#679089]"
                  size="large"

                  htmlType="submit"
                  loading={isSubmitting}>
                  Confirm Change
                </Button>
                <div className="text-center text-gray-600">
                  Back to <Link to={constants.ROUTES.LOGIN} className="text-blue-500">Login</Link>
                  &nbsp; or &nbsp;
                  <Link to={constants.ROUTES.SIGNUP} className="text-blue-500">Sign up</Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
