import { CameraOutlined, EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Upload, Input, Checkbox, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import shopApi from '../../hooks/useShopApi';
import { message } from 'antd';
import { use } from 'react';

export default function ProfileOfSeller() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [shop, setShop] = useState({});

  const normFileAddProduct = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await shopApi.shopInfo();
        setShop(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShop();
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    name: Yup.string().required('Shop name is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.number()
      .typeError('Enter numbers only')
      .positive('Enter positive numbers only')
      .integer('Enter integers only')
      .required('Phone number is required'),
    uploadImage: Yup.array().min(1, 'At least one image is required').required('Image is required'),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Content className='mx-2 lg:mx-5'>
        <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base'>
          <Breadcrumb.Item>Shop Page</Breadcrumb.Item>
          <Breadcrumb.Item>Profile of NameShop</Breadcrumb.Item>
        </Breadcrumb>
        <div className='h-screen'>
          <div className='flex flex-col items-center relative mt-5 lg:-mt-8'>
            <div className='absolute avatar z-10 border-4 border-solid border-white rounded-full'>
              <div className='flex justify-center '>
                <label className='text-5xl rounded-full relative cursor-pointer'>
                  <input type='file' accept='image/*' className='none hidden' />
                  <div className='w-full h-auto hover:opacity-50'>
                    <CameraOutlined className='flex justify-center w-full h-full left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2 text-4xl opacity-0 hover:opacity-100' />
                    <img
                      src='https://res.cloudinary.com/dmyfiyug9/image/upload/v1732850370/Screenshot_2024-11-29_101701_xvpbq2.png'
                      alt=''
                      className='w-29 h-29 lg:w-40 lg:h-40 rounded-full'
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className='absolute mt-15 lg:mt-20 lg:mx-auto w-11/12 p-3 min-h-96 bg-white rounded-lg'>
              <div className='pt-15 sm:pt-20 pb-5'>
                <div className='info text-center'>
                  <h1 className='text-xl font-bold text-[#d0a874]'>{shop.shopName}</h1>
                  <p className='text-sm font-normal text-gray-400'>{shop.shopAddress}</p>
                </div>
                <div className='field-info'>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      email: shop.shopEmail || '', // Nếu shop.email không tồn tại, mặc định là chuỗi rỗng
                      name: shop.shopName || '',
                      address: shop.shopAddress || '',
                      phoneNumber: shop.phoneNumber || '',
                      uploadImage: [], // Upload image mặc định trống
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                      try {
                        // Preparing form data to match the API expected format (if necessary)
                        const formData = new FormData();
                        formData.append('email', values.email);
                        formData.append('price', values.price);
                        formData.append('name', values.name);
                        formData.append('address', values.address);
                        formData.append('publisher', values.publisher);
                        formData.append('language', values.language);
                        formData.append('phoneNumber', values.phoneNumber);
                        formData.append('stock', values.stock);
                        formData.append('category', values.category); // If needed
                        values.uploadImage.forEach((file) => formData.append('images', file)); // Assuming 'images' is the field name

                        // Make the API call to post the new product
                        console.log('Form Data:', Object.fromEntries(formData));
                        const response = await productsApi.postCreateProduct(formData);
                        message.success('Product added successfully!');
                        handleCancelAdd(); // Assuming handleCancelAdd closes the modal
                      } catch (error) {
                        // Handle network errors or other unexpected issues
                        console.error('Error adding product:', error);
                        message.error('An error occurred while adding the product.');
                      } finally {
                        setSubmitting(false); // Stop the form submission spinner/loading
                      }
                    }}
                  >
                    {({ setFieldValue, errors, touched, isSubmitting }) => (
                      <Form className='mt-5'>
                        <div className='w-full sm:w-5/6 mx-auto flex justify-end lg:justify-start'>
                          <Checkbox
                            className='mb-5'
                            onChange={(e) => setIsDisabled(e.target.checked)}
                          >
                            Unlock input
                          </Checkbox>
                        </div>
                        <div className='flex flex-col lg:flex-row w-full sm:w-11/12 mx-auto justify-end'>
                          <div className='flex lg:flex-col w-full sm:w-11/12 mx-auto lg:w-full items-baseline'>
                            <label className='label-input-tnvd lg:ml-7 xl:ml-9 font-bold text-[#d0a874] truncate'>
                              Email
                            </label>
                            <div className='w-5/6 flex flex-col items-start justify-center mx-auto'>
                              <Field
                                name='email'
                                as={Input}
                                className='w-full py-2'
                                disabled={!isDisabled}
                              />
                              <div className='h-8 py-1'>
                                {touched.email && errors.email && (
                                  <div className='error text-red-500 ml-1'>{errors.email}</div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='flex lg:flex-col w-full sm:w-11/12 mx-auto lg:w-full items-baseline'>
                            <label className='label-input-tnvd lg:ml-7 xl:ml-9 font-bold text-[#d0a874] truncate'>
                              Shop Name
                            </label>
                            <div className='w-5/6 flex flex-col items-start justify-center mx-auto'>
                              <Field
                                name='name'
                                as={Input}
                                className='w-full py-2'
                                disabled={!isDisabled}
                              />
                              <div className='h-8 py-1'>
                                {touched.name && errors.name && (
                                  <div className='error text-red-500 ml-1'>{errors.name}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col lg:flex-row w-full sm:w-11/12 mx-auto justify-end'>
                          <div className='flex lg:flex-col w-full sm:w-11/12 mx-auto lg:w-full items-baseline'>
                            <label className='label-input-tnvd lg:ml-7 xl:ml-9 font-bold text-[#d0a874] truncate'>
                              Address
                            </label>
                            <div className='w-5/6 flex flex-col items-start justify-center mx-auto'>
                              <Field
                                name='address'
                                as={Input}
                                className='w-full py-2'
                                disabled={!isDisabled}
                              />
                              <div className='h-8 py-1'>
                                {touched.address && errors.address && (
                                  <div className='error text-red-500 ml-1'>{errors.address}</div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='flex lg:flex-col w-full sm:w-11/12 mx-auto lg:w-full items-baseline'>
                            <label className='label-input-tnvd lg:ml-7 xl:ml-9 font-bold text-[#d0a874] truncate'>
                              Phone Number
                            </label>
                            <div className='w-5/6 flex flex-col items-start justify-center mx-auto'>
                              <Field
                                name='phoneNumber'
                                as={Input}
                                className='w-full py-2'
                                disabled={!isDisabled}
                              />
                              <div className='h-8 py-1'>
                                {touched.phoneNumber && errors.phoneNumber && (
                                  <div className='error text-red-500 ml-1'>
                                    {errors.phoneNumber}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=''>
                          {/* <div className='flex items-flex-start justify-flex-start'>
                                                        <label className='label-input-tnvd truncate'>Upload Image</label>
                                                        <div className='w-2/3 flex flex-col items-start'>
                                                            <Upload
                                                                listType='picture-card'
                                                                onChange={(info) => {
                                                                    setFieldValue(
                                                                        'uploadImage',
                                                                        info.fileList.map((file) => file.originFileObj),
                                                                    );
                                                                }}
                                                            >
                                                                <Button
                                                                    type='button'
                                                                    style={{
                                                                        border: 0,
                                                                        background: 'none',
                                                                    }}
                                                                >
                                                                    <PlusOutlined />
                                                                    <div>Upload</div>
                                                                </Button>
                                                            </Upload>
                                                            <div className='h-8 py-1'>
                                                                {touched.uploadImage && errors.uploadImage && (
                                                                    <div className='error text-red-500 ml-1'>{errors.uploadImage}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div> */}
                        </div>
                        <div className='absolute z-10 right-5 top-5'>
                          <button
                            className='animate-bounce bg-blue-500 rounded-xl hover:bg-white border-2 border-white hover:border-blue-500'
                            disabled={isSubmitting}
                          >
                            <EditOutlined className='text-white px-5 py-2 hover:scale-125 hover:text-blue-500 duration-300' />
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className='withdraw-money w-5/6 mx-auto mt-2 lg:mt-5 flex justify-end items-center'>
                  <h4 className='mr-5'>
                    wallet: <span className='text-red-500 font-semibold'>{shop.wallet}$</span>
                  </h4>
                  <button
                    className='px-5 py-2 text-white bg-blue-500 rounded-xl hover:text-blue-500 hover:bg-white border-2 border-white hover:border-blue-500 duration-300 ease-in-out'
                    onClick={showModal}
                  >
                    Withdraw Money
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Modal
        title='Withdraw Money'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Formik
          initialValues={{
            amount: '',
          }}
          validationSchema={Yup.object({
            amount: Yup.number()
              .typeError('Only numbers are allowed')
              .min(1000, 'Amount must be greater than or equal to 1000')
              .required('Amount is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await shopApi.createWithdrawRequest(values.amount);

              message.success(
                `Withdraw request for ${values.amount}$ has been submitted successfully!`,
              );
              handleOk();
            } catch (error) {
              console.error('Error creating withdraw request:', error);
              message.error(
                error?.response?.data?.message ||
                  'An error occurred while processing the withdraw request.',
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className='mb-2'>
                <div className='line h-px bg-gray-300 w-full'></div>
                <div className='amount text-end my-3'>
                  Amount: <span className='text-red-500 font-semibold'>1000$</span>
                </div>
                <div className='flex justify-between items-baseline'>
                  <label htmlFor='amount' className='text-sm font-medium text-gray-700'>
                    Amount to Withdraw
                  </label>
                  <div className='flex flex-col w-2/3'>
                    <Field
                      name='amount'
                      as={Input}
                      placeholder='Enter amount (min: 1000)'
                      className='py-2 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                    <div className='h-8 py-1'>
                      {touched.amount && errors.amount && (
                        <div className='text-red-500 text-sm mt-1'>{errors.amount}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-end'>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={isSubmitting}
                  className='bg-blue-500 text-white'
                >
                  Confirm
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
