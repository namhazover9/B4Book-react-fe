import { CloudDownloadOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Form, Input, message, Modal, Select, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { address, text } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import orderApi from '../../hooks/useOrderApi';
import adminApi from '../../hooks/useAdminApi';
import { Field, Formik } from 'formik';
export default function ApprovedShop() {
  const [forms, setForms] = useState([]); // Dữ liệu bảng
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [currentShop, setCurrentShop] = useState(null); // Lưu shop hiện tại
  const fetchForms = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getAllRegisterShop();
      const forms = response.data?.shops || []; // Kiểm tra để đảm bảo `shops` là mảng
      setForms(
        forms.map((shop, index) => {
          const address =
            Array.isArray(shop.address) && shop.address.length > 0
              ? shop.address[0] // Lấy phần tử đầu tiên trong mảng address
              : null;

          return {
            key: index + 1,
            id: shop._id,
            shopName: shop?.shopName || 'Unknown',
            shopEmail: shop?.shopEmail || 'N/A',
            phoneNumber: shop?.phoneNumber || 'N/A',
            address: address ? `${address.street}, ${address.city}, ${address.country}` : 'Unknown',
            description: shop?.description || 'N/A',
            images: shop?.images || [],
            documents: shop?.documents || [],
          };
        }),
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms(); // Gọi API khi component được mount
  }, []);

  const handleApprove = (shop) => {
    setCurrentShop(shop); // Set dữ liệu shop cần chỉnh sửa
    setVisibleEdit(true); // Mở modal
  };

  // Biến cấu hình để căn giữa
  const alignCenter = {
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
  };
  const handleApproveShop = async (shopId) => {
    try {
      // Gọi API để duyệt shop
      console.log(currentShop);
      const response = await adminApi.postApproveShop(shopId);
      message.success('Shop approved successfully!');
      fetchForms(); // Tải lại dữ liệu sau khi duyệt
      setVisibleEdit(false); 
    } catch (error) {
      message.error('Error approving shop');
    }
  };

  const handleDownloadDocument = async (fileUrl) => {
    try {
      console.log(fileUrl);
      const response = await fetch(fileUrl); // Gửi yêu cầu tải file từ URL
      if (!response.ok) throw new Error('Failed to fetch document');
  
      const blob = await response.blob(); // Chuyển dữ liệu thành Blob
      const downloadUrl = window.URL.createObjectURL(blob); // Tạo URL tạm thời
  
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'shop_document.pdf'; // Tên file khi tải xuống
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(downloadUrl); // Giải phóng bộ nhớ sau khi tải xong
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };
  
  

  const handleCancelEdit = () => {
    setVisibleEdit(false); // Close the modal
  };
  const columns = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: 'id',
      ...alignCenter,
    },
    {
      title: 'Full Name',
      width: 175,
      dataIndex: 'shopName',
      key: 'shopName',
      // fixed: 'left',
      ...alignCenter,
      render: (text, record) => <span className='text-red-500'>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'shopEmail',
      key: 'shopEmail',
      width: 150,
      ...alignCenter,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 125,
      ...alignCenter,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 100,
      ...alignCenter,
    },
    {
      title: 'Action',
      key: 'operation',
      // fixed: 'right',
      width: 100,
      ...alignCenter,
      render: (text, record) => (
        <div className='flex items-center justify-center'>
          <button
            className='text-base bg-teal-400 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-teal-400'
            onClick={() => handleApprove(record)}
          >
            <SearchOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className=''>
      <Content className='mx-2 lg:mx-5'>
        <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base'>
          <Breadcrumb.Item>Admin Page</Breadcrumb.Item>
          <Breadcrumb.Item>Register Forms</Breadcrumb.Item>
        </Breadcrumb>
        <div className='p-4 min-h-96 bg-white rounded-lg'>
          <div className='header-shop-page px-5 flex items-center justify-between'>
            <h1 className='lg:text-2xl xl:text-3xl font-semibold hidden lg:block'>Form List</h1>
            <div className='w-full lg:w-4/5 flex flex-col items-start lg:flex-row lg:items-center justify-between'></div>
          </div>
          <div className='data-shop-page my-4 lg:my-6'>
            <Table
              columns={columns}
              dataSource={forms}
              scroll={{
                x: 'max-content',
                y: 500,
              }}
            />
          </div>
        </div>
      </Content>

      <Modal
        open={visibleEdit}
        className='text-center'
        title='Register Form'
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Formik
          enableReinitialize={true}
          initialValues={{
            shopName: currentShop?.shopName || '',
            shopEmail: currentShop?.shopEmail || '',
            phoneNumber: currentShop?.phoneNumber || '',
            address: currentShop?.address || '',
            description: currentShop?.description || '',
            uploadImage: currentShop?.images
              ? [
                  {
                    uid: '1',
                    name: 'Image',
                    status: 'done',
                    url: currentShop.images,
                  },
                ]
              : [],
          }}
        >
          {({ setFieldValue, errors, touched, values, isSubmitting }) => (
            <Form className='mt-5'>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Shop Name</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='shopName' as={Input} className='w-full py-2' disabled />
                </div>
              </div>

              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Shop Email</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='shopEmail' as={Input} className='w-full py-2' disabled />
                </div>
              </div>

              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Phone Number</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='phoneNumber' as={Input} className='w-full py-2' disabled />
                </div>
              </div>

              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Address</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='address' as={Input} className='w-full py-2' disabled />
                </div>
              </div>

              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Description</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='description' as={Input} className='w-full py-2' disabled />
                </div>
              </div>


              {/* Display Image */}
              <div className='w-2/3 flex flex-col items-start'>
                {values.uploadImage[0]?.url && (
                  <img src={values.uploadImage[0]?.url} alt='Shop Image' className='w-full py-2' />
                )}
              </div>

              {/* Approve Button */}
              <div className='flex justify-end'>
                <Button
                  type='primary'
                  onClick={() => handleApproveShop(currentShop?.id)} // Handle approve logic
                  className='mr-2'
                >
                  Approve
                </Button>

                {/* Download CV Button */}
                <Button
                  type='default'
                  onClick={() => handleDownloadDocument(currentShop?.documents)} // Handle file download logic
                >
                  Download CV
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
