import { CameraOutlined, EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Upload, Input, Checkbox, Modal, List } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import shopApi from '../../hooks/useShopApi';
import { message } from 'antd';
import { use } from 'react';
import { desc, s, text } from 'framer-motion/client';
import { set } from 'react-hook-form';

export default function ProfileOfSeller() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [shop, setShop] = useState({});
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', country: '' });
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [currentEditAddress, setCurrentEditAddress] = useState({
    street: '',
    city: '',
    country: '',
  });

  const normFileAddProduct = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const addresses = shop?.address || []; // Lấy địa chỉ từ `userInfo`
  const defaultAddress = addresses.length > 0 ? addresses[0] : null;
  {
    addresses.length === 0 && <Text type='secondary'>No addresses available</Text>;
  };
  const handleOpenAddressModal = () => {
    setIsModalAddressOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsModalAddressOpen(false);
  };

  const handleOpenNewAddressModal = () => {
    setNewAddress({ street: '', city: '', country: '' }); // Reset dữ liệu khi mở modal
    setIsNewAddressModalOpen(true);
  };

  const handleCloseNewAddressModal = () => {
    setIsNewAddressModalOpen(false);
  };

  const handleOpenEditAddressModal = (address) => {
    setCurrentEditAddress({ ...address }); // Giữ toàn bộ thông tin địa chỉ, bao gồm cả `_id`
    setIsEditAddressModalOpen(true);
  };

  const handleSaveEditAddress = async () => {
    try {
      if (!currentEditAddress.street || !currentEditAddress.city || !currentEditAddress.country) {
        message.error('All fields are required!');
        return;
      }

      // Gọi API cập nhật địa chỉ
      const response = await shopApi.updateAddress(currentEditAddress._id, currentEditAddress);

      if (response) {
        message.success('Address updated successfully!');

        // Cập nhật địa chỉ trong state
        const updatedAddresses = addresses.map((addr) =>
          addr._id === currentEditAddress._id ? currentEditAddress : addr,
        );
        setShop({ ...shop, address: updatedAddresses });

        setIsEditAddressModalOpen(false); // Đóng modal sau khi lưu
      }
    } catch (error) {
      console.error('Failed to update address:', error);
      message.error('Failed to update address. Please try again.');
    }
  };

  const handleDeleteAddress = async (address) => {
    try {
      // Gọi API xóa địa chỉ
      const response = await shopApi.deleteAddress(address._id);

      if (response) {
        message.success('Address deleted successfully!');

        // Cập nhật state sau khi xóa thành công
        const updatedAddresses = addresses.filter((addr) => addr._id !== address._id);
        setShop({ ...shop, address: updatedAddresses });
      }
    } catch (error) {
      console.error('Failed to delete address:', error);
      message.error('Failed to delete address. Please try again.');
    }
  };

  const confirmDeleteAddress = (address) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: `Do you really want to delete the address: ${address.street}, ${address.city}, ${address.country}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDeleteAddress(address),
    });
  };

  const handleAddNewAddress = async () => {
    //console.log(newAddress);
    try {
      if (!newAddress.street || !newAddress.city || !newAddress.country) {
        message.error('All fields are required!');
        return;
      }
      const response = await shopApi.newAddress(newAddress);

      if (response) {
        message.success('Address added successfully!');

        // Cập nhật địa chỉ mới vào state `userInfo.address`
        setShop((prevUserInfo) => {
          return {
            ...prevUserInfo,
            address: [...prevUserInfo.address, newAddress], // Thêm địa chỉ mới vào danh sách
          };
        });

        handleCloseNewAddressModal(); // Đóng modal sau khi thêm
      }
    } catch (error) {
      console.error('Failed to add new address:', error);
      message.error('Failed to add address. Please try again.');
    }
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

  // Lấy ảnh đầu tiên từ mảng images (nếu có)
  const shopImage = shop.images && shop.images[0] ? shop.images[0] : '';

  const validationSchema = Yup.object().shape({
    shopEmail: Yup.string().email('Invalid email format').required('Email is required'),
    shopName: Yup.string().required('Shop name is required'),
    shopAddress: Yup.string().required('Address is required'),
    phoneNumber: Yup.number()
      .typeError('Enter numbers only')
      .positive('Enter positive numbers only')
      .integer('Enter integers only')
      .required('Phone number is required'),
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
        </Breadcrumb>
        <div className='h-screen'>
          <div className='flex flex-col items-center relative mt-5 lg:-mt-8'>
            <div className='absolute avatar z-10 border-4 border-solid border-white rounded-full'>
              <div className='flex justify-center '>
              <label className='text-5xl rounded-full relative cursor-pointer'>
                  <input type='file' accept='image/*' className='none hidden' />
                  <div className='w-full h-auto hover:opacity-50'>
                    <CameraOutlined className='flex justify-center w-full h-full left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2 text-4xl opacity-0 hover:opacity-100' />
                    {/* Hiển thị ảnh đầu tiên từ mảng images */}
                    <img
                      src={shopImage || 'https://as1.ftcdn.net/v2/jpg/03/58/90/78/1000_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg'} // Nếu không có ảnh thì hiển thị ảnh mặc định
                      alt='Shop Avatar'
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
                      shopEmail: shop.shopEmail || '', // Nếu shop.email không tồn tại, mặc định là chuỗi rỗng
                      shopName: shop.shopName || '',
                      shopAddress: (shop.address && shop.address.length > 0) ? `${shop.address[0].street}, ${shop.address[0].city}, ${shop.address[0].country}` : '', // Hiển thị địa chỉ đầu tiên
                      phoneNumber: shop.phoneNumber || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                      try {
                        // Preparing form data to match the API expected format (if necessary)
                        const formData = new FormData();
                        formData.append('shopEmail', values.shopEmail);
                        formData.append('shopName', values.shopName);
                        formData.append('phoneNumber', values.phoneNumber);
                

                        // Make the API call to post the new product
                        console.log('Form Data:', Object.fromEntries(formData));
                        const response = await shopApi.updateShopInfo(formData);
                        message.success('Shop information updated successfully!');
                      } catch (error) {
                        // Handle network errors or other unexpected issues
                        console.error('Error updating shop info:', error);
                        message.error('An error occurred while updating the shop information.');
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
                                name='shopEmail'
                                as={Input}
                                className='w-full py-2'
                                disabled={!isDisabled}
                              />
                              <div className='h-8 py-1'>
                                {touched.shopEmail && errors.shopEmail && (
                                  <div className='error text-red-500 ml-1'>{errors.shopEmail}</div>
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
                                name='shopName'
                                as={Input}
                                className='w-full py-2'
                                disabled={!isDisabled}
                              />
                              <div className='h-8 py-1'>
                                {touched.shopName && errors.shopName && (
                                  <div className='error text-red-500 ml-1'>{errors.shopName}</div>
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
                                name='shopAddress'
                                as={Input}
                                className='w-full py-2'
                                readOnly
                                disabled={!isDisabled}
                                onClick={handleOpenAddressModal} // Mở modal khi click
                              />
                              <div className='h-8 py-1'>
                                {touched.shopAddress && errors.shopAddress && (
                                  <div className='error text-red-500 ml-1'>{errors.shopAddress}</div>
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
                     
                          
                        <div className='absolute z-10 right-5 top-5'>
                          <button
                            className='animate-bounce bg-blue-500 rounded-xl hover:bg-white border-2 border-white hover:border-blue-500'
                            disabled={!isDisabled || isSubmitting} // Disable button if inputs are locked or if form is submitting
                            >

                            <SaveOutlined className='text-white px-5 py-2 hover:scale-125 hover:text-blue-500 duration-300' />
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
      <Modal
          title='Manage Addresses'
          visible={isModalAddressOpen}
          onCancel={handleCloseAddressModal}
          footer={[
            <Button key='new' type='primary' onClick={handleOpenNewAddressModal}>
              New Address
            </Button>,
          ]}
        >
          <List
            dataSource={addresses}
            renderItem={(address) => (
              <List.Item
                actions={[
                  <Button key='edit' onClick={() => handleOpenEditAddressModal(address)}>
                    Edit
                  </Button>,
                  <Button key='delete' danger onClick={() => confirmDeleteAddress(address)}>
                    Delete
                  </Button>,
                ]}
              >
                {`${address.street}, ${address.city}, ${address.country}`}
              </List.Item>
            )}
          />
        </Modal>

        <Modal
          title='Add New Address'
          visible={isNewAddressModalOpen}
          onCancel={handleCloseNewAddressModal}
          onOk={handleAddNewAddress}
          okText='Add'
        >
          <Input
            placeholder='Street'
            value={newAddress.street}
            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            className='mb-2'
          />
          <Input
            placeholder='City'
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            className='mb-2'
          />
          <Input
            placeholder='Country'
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
          />
        </Modal>

        <Modal
          title='Edit Address'
          visible={isEditAddressModalOpen}
          onCancel={() => setIsEditAddressModalOpen(false)}
          onOk={handleSaveEditAddress}
          okText='Save'
        >
          <Input
            placeholder='Street'
            value={currentEditAddress.street}
            onChange={(e) =>
              setCurrentEditAddress({ ...currentEditAddress, street: e.target.value })
            }
            className='mb-2'
          />
          <Input
            placeholder='City'
            value={currentEditAddress.city}
            onChange={(e) => setCurrentEditAddress({ ...currentEditAddress, city: e.target.value })}
            className='mb-2'
          />
          <Input
            placeholder='Country'
            value={currentEditAddress.country}
            onChange={(e) =>
              setCurrentEditAddress({ ...currentEditAddress, country: e.target.value })
            }
          />
        </Modal>
    </div>
  );
}
