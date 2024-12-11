import { CloudDownloadOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Form, Input, message, Modal, Select, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import adminApi from '../../hooks/useAdminApi';
import { Field, Formik } from 'formik';
import { title } from 'framer-motion/client';
export default function ApproveProduct() {
  const [products, setProducts] = useState([]); // Dữ liệu bảng
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Lưu shop hiện tại
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getAllRegisterProducts();
      const products = response.data;
      setProducts(
        products.map((product, index) => {
          const images =
            Array.isArray(product.images) && product.images.length > 0
              ? product.images[0] 
              : null;
              const category =
              Array.isArray(product.category) && product.category.length > 0
                ? product.category 
                : null;
          return {
            key: index + 1,
            id: product?._id,
            title: product?.title || 'N/A',
            description: product?.description || 'N/A',
            price: product?.price || 'N/A',
            author: product?.author || 'N/A',
            publisher: product?.publisher || 'N/A',
            ISBN: product?.ISBN || 'N/A',
            language: product?.language || 'N/A',
            stock: product?.stock || 'N/A',
            category: category || 'N/A',
            images: images || 'N/A',
          };
        }),
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Gọi API khi component được mount
  }, []);

  const handleApprove = (shop) => {
    setCurrentProduct(shop); // Set dữ liệu shop cần chỉnh sửa
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
  const handleApproveProduct = async (productId) => {
    try {
      // Gọi API để duyệt shop
      console.log(currentProduct);
      const response = await adminApi.postApproveProduct(productId);
      message.success('Shop approved successfully!');
      fetchProducts(); // Tải lại dữ liệu sau khi duyệt
      setVisibleEdit(false); 
    } catch (error) {
      console.log(error);
      message.error('Error approving shop');
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
      title: 'Title',
      width: 175,
      dataIndex: 'title',
      key: 'title',
      // fixed: 'left',
      ...alignCenter,
      render: (text, record) => <span className='text-red-500'>{text}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      ...alignCenter,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 125,
      ...alignCenter,
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher',
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
              dataSource={products}
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
            title: currentProduct?.title || 'N/A',
            description: currentProduct?.description || 'N/A',
            price: currentProduct?.price || 'N/A',
            author: currentProduct?.author || 'N/A',
            publisher: currentProduct?.publisher || 'N/A',
            ISBN: currentProduct?.ISBN || 'N/A',
            language: currentProduct?.language || 'N/A',
            stock: currentProduct?.stock || 'N/A',
            category: currentProduct?.category || 'N/A',
            images: currentProduct?.images || 'N/A'
              ? [
                  {
                    uid: '1',
                    name: 'Image',
                    status: 'done',
                    url: currentProduct?.images,
                  },
                ]
              : [],
          }}
        >
          {({ setFieldValue, errors, touched, values, isSubmitting }) => (
            <Form className='mt-5'>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Title</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='title' as={Input} className='w-full py-2' disabled />
                </div>
              </div>

              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Description</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='description' as={Input} className='w-full py-2' disabled />
                </div>
              </div>

              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Price</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='price' as={Input} className='w-full py-2' disabled />
                </div>
              </div>

              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Author</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='author' as={Input} className='w-full py-2' disabled />
                </div>
              </div>

              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Publisher</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='publisher' as={Input} className='w-full py-2' disabled />
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>ISBN</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='ISBN' as={Input} className='w-full py-2' disabled />
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Language</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='language' as={Input} className='w-full py-2' disabled />
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Stock</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='stock' as={Input} className='w-full py-2' disabled />
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Category</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='category' as={Input} className='w-full py-2' disabled />
                </div>
              </div>
              {/* Display Image */}
              <div className='w-2/3 flex flex-col items-start'>
                {values.images[0]?.url && (
                  <img src={values.images[0]?.url} alt='Shop Image' className='w-full py-2' />
                )}
              </div>

              {/* Approve Button */}
              <div className='flex justify-end'>
                <Button
                  type='primary'
                  onClick={() => handleApproveProduct(currentProduct?.id)} // Handle approve logic
                  className='mr-2'
                >
                  Approve
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      
    </div>
  );
}


