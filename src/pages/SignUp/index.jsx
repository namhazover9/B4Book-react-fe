import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Button, Col, message, Row, Tooltip } from 'antd';
import accountApi from 'apis/accountApi';
import DatePickerField from 'components/Custom/Field/DatePickerField';
import InputField from 'components/Custom/Field/InputField';
import SelectField from 'components/Custom/Field/SelectField';
import Delay from 'components/Delay';
import LoginGoogle from 'components/LoginGoogle';
import constants from 'constants/index';
import { FastField, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as Yup from 'yup';

function SignUp() {
  const windowWidth = window.screen.width;

  const [isSending, setIsSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirectLogin, setIsRedirectLogin] = useState(false);

  const emailRef = useRef('');

  const onSendCode = async () => {
    try {
      const email = emailRef.current;
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!regex.test(email)) {
        message.error('Email không hợp lệ !');
        return;
      }

      setIsSending(true);

      const result = await accountApi.postSendVerifyCode({ email });
      if (result.status === 200) {
        message.success('Gửi thành công, kiểm tra email');
        setIsSending(false);
      }
    } catch (error) {
      setIsSending(false);
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error('Gửi thất bại, thử lại');
      }
    }
  };

  const onSignUp = async (account) => {
    try {
      setIsSubmitting(true);
      const result = await accountApi.postSignUp({ account });
      if (result.status === 200) {
        message.success('Đăng ký thành công.', 1);
        setIsSubmitting(false);
        setIsRedirectLogin(true);
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error('Đăng ký thất bại, thử lại');
      }
    }
  };

  const initialValue = {
    email: '',
    verifyCode: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    address: '',
    gender: null,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('* Email bạn là gì ?')
      .email('* Email không hợp lệ !'),
    fullName: Yup.string()
      .trim()
      .required('* Tên bạn là gì ?')
      .matches(
        /[^~!@#%\^&\*()_\+-=\|\\,\.\/\[\]{}'"`]/,
        '* Không được chứa ký tự đặc biệt',
      )
      .max(70, '* Tối đa 70 ký tự'),
    verifyCode: Yup.string()
      .trim()
      .required('* Nhập mã xác nhận')
      .length(
        constants.MAX_VERIFY_CODE,
        `* Mã xác nhận có ${constants.MAX_VERIFY_CODE} ký tự`,
      ),
    password: Yup.string()
      .trim()
      .required('* Mật khẩu của bạn là gì ?')
      .min(6, '* Mật khẩu ít nhất 6 ký tự')
      .max(20, '* Mật khẩu tối đa 20 ký tự')
      .matches(
        /^(?=.*[A-Z])(?=.*[~!@#%\^&\*()_\+-=\|\\,\.\/\[\]{}'"`])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
        'Mật khẩu chứa chữ Hoa,chữ thường, số và ký tự đặc biệt',
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      '* Mật khẩu chưa trùng khớp',
    ),
    birthday: Yup.date()
      .notRequired()
      .min(new Date(1900, 1, 1), '* Năm sinh từ 1900')
      .max(
        new Date(new Date().getFullYear() - parseInt(constants.MIN_AGE), 1, 1),
        `* Tuổi tối thiểu là ${constants.MIN_AGE}`,
      ),
    gender: Yup.boolean().required('* Giới tính của bạn'),
    address: Yup.string()
      .trim()
      .max(100, '* Tối đa 100 ký tự'),
  });

  return (
    <div className="container min-h-screen flex flex-col justify-center py-10 px-4">
      {isRedirectLogin && (
        <Delay wait={constants.DELAY_TIME}>
          <Redirect to={constants.ROUTES.LOGIN} />
        </Delay>
      )}

      <h1 className="text-2xl font-bold text-center underline mb-5 mt-5">
        Đăng ký tài khoản
      </h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onSignUp}>
        {(formikProps) => {
          emailRef.current = formikProps.values.email;
          const suffixColor = 'rgba(0, 0, 0, 0.25)';
          return (
            <Form className="bg-white shadow-md rounded-lg p-6">
              <Row className="space-y-8">
                <Col className="p-0" span={24} md={12}>
                  <h2 className="text-xl">Thông tin tài khoản</h2>
                  <Col span={24}>
                    <FastField
                      name="email"
                      component={InputField}
                      className="input-form-common"
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
                  </Col>
                  <Col span={12}>
                    <FastField
                      name="verifyCode"
                      component={InputField}
                      className="input-form-common"
                      placeholder="Mã xác nhận *"
                      size="large"
                      suffix={
                        <Tooltip title="Click gửi mã để nhận mã qua email">
                          <InfoCircleOutlined
                            style={{ color: suffixColor }}
                          />
                        </Tooltip>
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      type="primary"
                      size="large"
                      onClick={onSendCode}
                      loading={isSending}>
                      Gửi mã
                    </Button>
                  </Col>
                  <Col span={24}>
                    <FastField
                      name="password"
                      component={InputField}
                      className="input-form-common"
                      type="password"
                      placeholder="Mật khẩu *"
                      size="large"
                      autocomplete="on"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Col>
                  <Col span={24}>
                    <FastField
                      name="confirmPassword"
                      component={InputField}
                      className="input-form-common"
                      type="password"
                      placeholder="Xác nhận mật khẩu *"
                      size="large"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Col>
                </Col>

                <Col className="p-0" span={24} md={12}>
                  <h2 className="text-xl">Thông tin chi tiết</h2>
                  <Col span={24}>
                    <FastField
                      name="fullName"
                      component={InputField}
                      className="input-form-common"
                      placeholder="Họ và tên *"
                      size="large"
                      suffix={
                        <Tooltip title="Họ và tên của bạn">
                          <InfoCircleOutlined
                            style={{ color: suffixColor }}
                          />
                        </Tooltip>
                      }
                    />
                  </Col>
                  <Col span={24}>
                    <FastField
                      className="input-form-common"
                      name="birthday"
                      component={DatePickerField}
                      placeholder="Ngày sinh"
                      size="large"
                    />
                  </Col>
                  <Col span={24}>
                    <FastField
                      className="input-form-common"
                      size="large"
                      name="gender"
                      component={SelectField}
                      placeholder="Giới tính *"
                      options={constants.GENDER_OPTIONS}
                    />
                  </Col>
                  <Col span={24}>
                    <FastField
                      name="address"
                      component={InputField}
                      className="input-form-common"
                      placeholder="Địa chỉ"
                      size="large"
                      suffix={
                        <Tooltip title="Địa chỉ của bạn">
                          <InfoCircleOutlined
                            style={{ color: suffixColor }}
                          />
                        </Tooltip>
                      }
                    />
                  </Col>
                </Col>

                <Col span={24}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    loading={isSubmitting}>
                    Đăng ký
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
      <div className="mt-4 text-center">
        <p>
          Bạn đã có tài khoản?{' '}
          <Link to={constants.ROUTES.LOGIN}>Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
