import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  DatePicker,
  Input,
  InputNumber,
  Layout,
  Menu,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
  theme,
  Upload,
} from 'antd';
import {
  CloudDownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
import * as Yup from 'yup';
import { createStyles } from 'antd-style';
import TextArea from 'antd/es/input/TextArea';
import { Field, Form, Formik } from 'formik';
import vouchersApi from '../../hooks/useDiscountApi';
import moment from 'moment';
import { image, use } from 'framer-motion/client';
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

export default function DiscountPage() {
  const id = useParams().id;
  const shopName = useParams().name;
  const [loading, setLoading] = useState(true);
  const [voucherList, setVoucherList] = useState([]);
  const [voucher, setVoucher] = useState({}); // Dữ liệu sản phẩm mặc định
  const [searchKeyword, setSearchKeyword] = useState(''); // State for the search keyword
  const [selectedSort, setSelectedSort] = useState('All Vouchers');
  const fetchVouchers = async () => {
    setLoading(true);
    try {
      // Gọi API với id và selectedSort
      const response = await vouchersApi.getVoucherByShop(id, selectedSort);

      // Đảm bảo dữ liệu trả về tồn tại
      const data = response?.data || [];

      // Định dạng lại dữ liệu để khớp với yêu cầu của bảng
      const formattedVouchers = data.map((voucher) => ({
        key: voucher._id, // Bắt buộc phải có key
        image: voucher.image[0],
        name: voucher.name || 'N/A', // Giá trị mặc định nếu thiếu dữ liệu
        code: voucher.code || 'N/A',
        value: voucher.value || 0,
        expired: voucher.expired ? new Date(voucher.expired).toLocaleDateString() : 'N/A',
        validDate: voucher.validDate ? new Date(voucher.validDate).toLocaleDateString() : 'N/A',
        isActive: voucher.isActive ? 'Active' : 'Inactive',
      }));

      // Cập nhật danh sách voucher
      setVoucherList(formattedVouchers);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      setVoucherList([]); // Đảm bảo luôn trả về mảng rỗng nếu lỗi
    } finally {
      setLoading(false);
    }
  };

  // Fetch sản phẩm khi page hoặc sản phẩm mỗi trang thay đổi
  useEffect(() => {
    fetchVouchers();
  }, [id, selectedSort]); // Đảm bảo fetch lại dữ liệu khi các tham số này thay đổi

  // Handle thay đổi trang khi người dùng chuyển trang

    const searchVouchers = async (name, id) => {
      setLoading(true);
      try {
        const response = await vouchersApi.searchVouchers(name, id);
        const data = await response.data;
        setVoucherList(data);
      } catch (error) {
        console.error('Error searching books:', error);
      } finally {
        setLoading(false);
      }
    };
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() === '') {
      // If search keyword is empty, fetch all products
      fetchVouchers();
    } else {
      // Fetch products based on the search keyword
      searchVouchers(keyword, id);
    }
  };
  const handleDeleteVoucher = async (voucherId) => {
    try {
      await vouchersApi.deleteVoucher(voucherId);
      message.success('Delete product successfully');
      fetchVouchers();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const { styles } = useStyle();

  // Biến cấu hình để căn giữa
  const alignCenter = {
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      ...alignCenter,
      width: 150,
      key: 'image',
      render: (text, record) => (
        <img
          src={record.image} // Sử dụng đường dẫn ảnh từ dữ liệu
          alt={record.name || 'Voucher Image'} // Hiển thị tên voucher nếu có
          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '5px', margin: '0 auto' }} // Thiết lập style cho ảnh
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ...alignCenter,
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      ...alignCenter,
      key: 'code',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: 75,
      ...alignCenter,
      key: 'value',
    },
    {
      title: 'Valid Date',
      dataIndex: 'validDate',
      ...alignCenter,
      key: 'validDate',
    },
    {
      title: 'Expired Date',
      dataIndex: 'expired',
      ...alignCenter,
      key: 'expired',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      ...alignCenter,
      key: 'isActive',
    },
    {
      title: 'Action',
      key: 'operation',
      // fixed: 'right',
      width: 100,
      ...alignCenter,
      render: (text, record) => (
        <div className='flex items-center justify-center'>
          <button className='text-base bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-blue-600'>
            {
              <EditOutlined
                onClick={() => {
                  console.log('Voucher ID for Edit:', record.key); // Kiểm tra giá trị của _id
                  handleEditClick(record.key);
                }}
              />
            }
          </button>
          <Popconfirm
            title='Delete the Product'
            description='Are you sure to delete this task?'
            onConfirm={() => {
              handleDeleteVoucher(record.key);
            }}
            onCancel={cancel}
            okText='Yes'
            cancelText='No'
          >
            <button
              className='text-base bg-red-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-red-600 ml-3'
              danger
            >
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onChange = (sorter) => {
    console.log('params', sorter);
  };

  // Add Voucher
  const [visibleAdd, setVisibleAdd] = useState(false);
  const handleCancelAdd = () => {
    setVisibleAdd(false);
  };

  const { TextArea } = Input;
  const normFileAddVoucher = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    value: Yup.number()
      .typeError('Enter numbers only')
      .positive('Enter positive numbers only')
      .min(0, 'Value must be at least 0') // Ràng buộc giá trị tối thiểu là 0
      .max(100, 'Value must be at most 100') // Ràng buộc giá trị tối đa là 100
      .required('Price is required'),
    expired: Yup.date().required('Description is required'),
    valid: Yup.date().required('Author is required'),
    uploadImage: Yup.array().min(1, 'At least one image is required').required('Image is required'),
  });

  // Edit Product
  const [visibleEdit, setVisibleEdit] = useState(false);

  const handleEditClick = (voucherId) => {
    console.log(voucherList);
    const selectedVoucher = voucherList.find((voucher) => voucher.key === voucherId);
    console.log('Selected Voucher:', selectedVoucher); // Kiểm tra xem đã tìm thấy sản phẩm chưa
    console.log('Selected Product Upload Image:', selectedVoucher?.image);

    if (selectedVoucher) {
      setVoucher(selectedVoucher); // Chỉ set giá trị khi tìm thấy sản phẩm
    } else {
      console.log('No product found with the given ID');
    }
    setVisibleEdit(true);
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };

  // Delete Product
  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  return (
    <div className=''>
      <Content className='mx-2 lg:mx-5'>
        <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base'>
          <Breadcrumb.Item>Your Vouchers</Breadcrumb.Item>
          <Breadcrumb.Item className='text-[#f18966] font-bold'>{shopName} 👋🏻</Breadcrumb.Item>
        </Breadcrumb>
        <div className='p-4 min-h-96 bg-white rounded-lg'>
          <div className='header-shop-page px-5 flex items-center justify-between'>
            <h1 className='text-3xl font-semibold hidden lg:block text-[#679089]'>Voucher List</h1>
            <div className='w-full lg:w-4/5 flex flex-col lg:flex-row items-center justify-between'>
              <Input
                onChange={handleSearchChange}
                placeholder='Search voucher ...'
                className='w-full lg:w-2/3 py-3'
              />
              <div className='w-full lg:ml-4 lg:w-1/3 mt-5 lg:mt-0 flex items-center justify-between lg:justify-between'>
                <Select
                  defaultValue='All Vouchers'
                  value={selectedSort}
                  onChange={(value) => setSelectedSort(value)} // Cập nhật selectedSort
                  className='w-52 mr-2'
                  options={[
                    { value: 'All Vouchers', label: 'All Vouchers' },
                    { value: 'Active', label: 'Active Vouchers' },
                    { value: 'Deactive', label: 'Deactive Vouchers' },
                    { value: 'No delete', label: 'No Delete' },
                    { value: 'Deleted', label: 'Deleted' },
                  ]}
                />

                <button
                  className='text-base bg-[#679089] text-white px-4 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-[#679089]'
                  type='primary'
                  onClick={() => setVisibleAdd(true)}
                >
                  New
                </button>
              </div>
            </div>
          </div>
          <div className='data-shop-page my-4 lg:my-6'>
            <Table
              className='text-center'
              columns={columns}
              dataSource={voucherList}
              loading={loading}
              pagination={{
                pageSize: 5,
              }}
              scroll={{
                x: 'max-content',
                y: 420,
              }}
            />
          </div>
        </div>
      </Content>
      {/* Add Product */}
      <Modal
        open={visibleAdd}
        className='text-center'
        title={
          <h2 className="text-2xl font-bold text-[#f18966]  animate-slideIn">
            Add New Voucher
          </h2>
        }
        onCancel={handleCancelAdd}
        footer={null}
      >
        <Formik
          initialValues={{
            name: '',
            value: 0,
            valid: null, // Thay đổi thành null hoặc một giá trị mặc định nếu cần
            expired: null, // Thay đổi thành null hoặc một giá trị mặc định nếu cần
            uploadImage: [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              // Thực hiện các thao tác khác khi gửi form
              const formData = new FormData();
              formData.append('name', values.name);
              formData.append('value', values.value);
              formData.append('expired', values.expired);
              formData.append('valid', values.valid);
              values.uploadImage.forEach((file) => formData.append('image', file));

              // API call để tạo sản phẩm mới
              const response = await vouchersApi.postCreateVoucher(formData);
              message.success('Product added successfully!');
              handleCancelAdd(); // Đóng modal
              fetchVouchers();
            } catch (error) {
              console.error('Error adding product:', error);
              message.error('An error occurred while adding the product.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, errors, touched, isSubmitting }) => (
            <Form className='mt-5'>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Name:</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='name' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.name && errors.name && (
                      <div className='error text-red-500 ml-1'>{errors.name}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Value:</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field
                    name='value'
                    as={Input}
                    className='w-full py-2'
                    type='number'
                    step='0.01'
                  />
                  <div className='h-8 py-1'>
                    {touched.value && errors.value && (
                      <div className='error text-red-500 ml-1'>{errors.value}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Expired Date:</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='expired'>
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        format='YYYY-MM-DD'
                        className='w-full py-2'
                        onChange={(date, dateString) => setFieldValue('expired', dateString)}
                        value={field.value ? moment(field.value) : null}
                      />
                    )}
                  </Field>
                  <div className='h-8 py-1'>
                    {touched.expired && errors.expired && (
                      <div className='error text-red-500 ml-1'>{errors.expired}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Valid Date:</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='valid'>
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        format='YYYY-MM-DD'
                        className='w-full py-2'
                        onChange={(date, dateString) => setFieldValue('valid', dateString)}
                        value={field.value ? moment(field.value) : null}
                      />
                    )}
                  </Field>
                  <div className='h-8 py-1'>
                    {touched.valid && errors.valid && (
                      <div className='error text-red-500 ml-1'>{errors.valid}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex items-start justify-center'>
                <label className='label-input-tnvd truncate'>Image:</label>
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
              </div>

              <button
                className='text-end text-base bg-[#679089] text-white px-6 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-[#679089]'
                type='submit'
                disabled={isSubmitting}
              >
                Save Details
              </button>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Edit Voucher */}
      <Modal
        open={visibleEdit}
        className='text-center'
        title={
          <h2 className="text-2xl font-bold text-[#f18966]  animate-slideIn">
            Edit Voucher
          </h2>
        }
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: voucher?.name || '',
            value: voucher?.value || 0,
            expired: voucher?.expired || null,
            valid: voucher?.validDate || null,
            isActive: voucher?.isActive,
            uploadImage: voucher?.image
              ? [
                  {
                    uid: '1',
                    name: 'Image',
                    status: 'done',
                    url: voucher.image, // Chuyển đổi URL ảnh thành đối tượng
                  },
                ]
              : [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const formData = new FormData();
              formData.append('name', values.name);
              formData.append('value', values.value);
              formData.append('expired', values.expired);
              formData.append('valid', values.valid);
              formData.append('isActive', values.isActive);
              values.uploadImage.forEach((file) => formData.append('image', file));
              console.log('Form Data:', Object.fromEntries(formData));
              console.log(values.isActive);
              const response = await vouchersApi.updateVoucher(voucher.key, formData);
              message.success('Voucher updated successfully!');
              handleCancelEdit();
              fetchVouchers();
            } catch (error) {
              console.error('Error updating product:', error);
              message.error('An error occurred while updating the product.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, errors, touched, values, isSubmitting }) => (
            <Form className='mt-5'>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Name:</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='name' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.name && errors.name && (
                      <div className='error text-red-500 ml-1'>{errors.name}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Value:</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field
                    name='value'
                    as={Input}
                    className='w-full py-2'
                    type='number'
                    step='0.01'
                  />
                  <div className='h-8 py-1'>
                    {touched.value && errors.value && (
                      <div className='error text-red-500 ml-1'>{errors.value}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Expired Date:</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='expired'>
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        format='YYYY-MM-DD'
                        className='w-full py-2'
                        onChange={(date, dateString) => setFieldValue('expired', dateString)}
                        value={field.value ? moment(field.value) : null}
                      />
                    )}
                  </Field>
                  <div className='h-8 py-1'>
                    {touched.expired && errors.expired && (
                      <div className='error text-red-500 ml-1'>{errors.expired}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Valid Date:</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='valid'>
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        format='YYYY-MM-DD'
                        className='w-full py-2'
                        onChange={(date, dateString) => setFieldValue('valid', dateString)}
                        value={field.value ? moment(field.value) : null}
                      />
                    )}
                  </Field>
                  <div className='h-8 py-1'>
                    {touched.valid && errors.valid && (
                      <div className='error text-red-500 ml-1'>{errors.valid}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Name:</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='name' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.name && errors.name && (
                      <div className='error text-red-500 ml-1'>{errors.name}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd -mt-5'>
                <label className='label-input-tnvd'>Status:</label>
                <div className='w-2/3 flex  items-start'>
                  <button
                    type='button'
                    name='isActive'
                    onClick={() => {
                      setFieldValue('isActive', !values.isActive); // Đảo trạng thái isActive
                    }}
                    className={`px-4 py-2 rounded-full ${
                      values.isActive ? ' text-red-600 font-bold' : ' text-green-600 font-bold' 
                    }`}
                  >
                    {values.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>

              <div className='flex items-start justify-center mt-5'>
                <label className='label-input-tnvd truncate'>Image:</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Upload
                    listType='picture-card'
                    fileList={(values.uploadImage || []).map((file, index) => {
                      if (typeof file === 'string') {
                        return {
                          uid: `url-${index}`,
                          name: `Image-${index + 1}`,
                          status: 'done',
                          url: file,
                        };
                      }

                      if (file instanceof File) {
                        return {
                          uid: `file-${index}`,
                          name: file.name,
                          status: 'done',
                          url: URL.createObjectURL(file),
                        };
                      }

                      return file; // Nếu đã đúng định dạng thì trả về trực tiếp
                    })}
                    onChange={(info) => {
                      const updatedFileList = info.fileList.map((file) => {
                        // Nếu là file mới upload
                        if (file.originFileObj) {
                          return file.originFileObj;
                        }

                        // Nếu là URL (ảnh cũ)
                        return file;
                      });

                      setFieldValue('uploadImage', updatedFileList);
                    }}
                    beforeUpload={() => false} // Ngừng upload tự động, ta sẽ xử lý khi submit form
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
              </div>
              <button
                className='text-end text-base bg-[#679089] text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-[#679089]'
                type='submit'
                disabled={isSubmitting} // Disable button while submitting
              >
                Update Details
              </button>
              {/* Đoạn useEffect sẽ cập nhật các giá trị trong form nếu có selectedProduct */}
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
