import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
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
import productsApi from '../../hooks/useProductsApi';
import TextArea from 'antd/es/input/TextArea';
import { Field, Form, Formik } from 'formik';

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

export default function SellerPage() {
  const id = useParams().id;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({}); // Dữ liệu sản phẩm mặc định
  const [searchKeyword, setSearchKeyword] = useState(''); // State for the search keyword

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productsApi.getProductByShop(id, {
        page: currentPage,
        limit: productsPerPage,
      });

      const data = response.data; // Dữ liệu trả về từ API

      // Kiểm tra xem data.products có phải là mảng không
      if (Array.isArray(data.data.products)) {
        setProductList(data.data.products); // Cập nhật state sản phẩm
      } else {
        setProductList([]); // Trường hợp không phải mảng, trả về mảng rỗng
        console.error('Dữ liệu API không phải là mảng sản phẩm.');
      }

      // Cập nhật tổng số trang
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductList([]); // Đảm bảo luôn có mảng
    } finally {
      setLoading(false);
    }
  };

  // Fetch sản phẩm khi page hoặc sản phẩm mỗi trang thay đổi
  useEffect(() => {
    fetchProducts();
  }, [currentPage, productsPerPage, id]); // Đảm bảo fetch lại dữ liệu khi các tham số này thay đổi

  // Handle thay đổi trang khi người dùng chuyển trang

  const handleExportFile = async () => {
    try {
      const response = await productsApi.exportFileProducts();

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'products.xlsx';
      link.click();
    } catch (error) {
      console.error('Error exporting file:', error);
    }
  };

  const searchProducts = async (keyword) => {
    setLoading(true);
    try {
      const response = await productsApi.searchProducts(keyword);
      const data = await response.data;
      setProductList(data);
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
      fetchProducts();
    } else {
      // Fetch products based on the search keyword
      searchProducts(keyword);
    }
  };
  const handleDeleteProduct = async (productId) => {
    console.log(productId);
    try {
      await productsApi.deleteProduct(productId);

      message.success('Delete product successfully');
      fetchProducts();
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
      width: 150,
      dataIndex: 'image',
      key: 'image',
      ...alignCenter,
      render: (text, record, index) => (
        <div>
          <img src={text} alt='...' className='w-full h-auto' />
        </div>
      ),
    },
    {
      title: 'Title',
      width: 175,
      dataIndex: 'title',
      key: 'title',
      ...alignCenter,
      // fixed: 'left',
      render: (text, record) => <span className='text-red-500'>{text}</span>,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 150,
      ...alignCenter,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      ...alignCenter,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: 75,
      ...alignCenter,
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Sales Number',
      dataIndex: 'salesNumber',
      key: 'salesNumber',
      width: 150,
      ...alignCenter,
      sorter: (a, b) => a.salesNumber - b.salesNumber,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 75,
      ...alignCenter,
      sorter: (a, b) => a.price - b.price,
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
            <EditOutlined
              onClick={() => {
                console.log('Product ID for Edit:', record.key); // Kiểm tra giá trị của _id
                handleEditClick(record.key);
              }}
            />
          </button>
          <Popconfirm
            title='Delete the Product'
            description='Are you sure to delete this task?'
            onConfirm={() => {
              handleDeleteProduct(record.key);
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

  // Add Product
  const [visibleAdd, setVisibleAdd] = useState(false);
  const handleCancelAdd = () => {
    setVisibleAdd(false);
  };

  const { TextArea } = Input;
  const normFileAddProduct = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    price: Yup.number()
      .typeError('Enter numbers only')
      .positive('Enter positive numbers only')
      .required('Price is required'),
    description: Yup.string().required('Description is required'),
    author: Yup.string().required('Author is required'),
    publisher: Yup.string().required('Publisher is required'),
    language: Yup.string().required('Language is required'),
    ISBN: Yup.number()
      .typeError('Enter numbers only')
      .positive('Enter positive numbers only')
      .integer('Enter integers only')
      .required('ISBN is required'),
    stock: Yup.number()
      .typeError('Enter numbers only')
      .positive('Enter positive numbers only')
      .integer('Enter integers only')
      .required('Stock is required'),
    category: Yup.array()
      .min(1, 'At least one category is required')
      .required('Category is required'),
    uploadImage: Yup.array().min(1, 'At least one image is required').required('Image is required'),
  });

  // Edit Product
  const [visibleEdit, setVisibleEdit] = useState(false);

  const handleEditClick = (productId) => {
    // console.log('Product ID:', productId); // Kiểm tra giá trị của productId
    // console.log('Product List:', productList); // Kiểm tra nội dung của productList

    const selectedProduct = productList.find((product) => product._id === productId);
    console.log('Selected Product:', selectedProduct); // Kiểm tra xem đã tìm thấy sản phẩm chưa
    console.log('Selected Product Upload Image:', selectedProduct?.uploadImage);

    if (selectedProduct) {
      setProduct(selectedProduct); // Chỉ set giá trị khi tìm thấy sản phẩm
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
          <Breadcrumb.Item>All Shop</Breadcrumb.Item>
          <Breadcrumb.Item>Name Shop</Breadcrumb.Item>
        </Breadcrumb>
        <div className='p-4 min-h-96 bg-white rounded-lg'>
          <div className='header-shop-page px-5 flex items-center justify-between'>
            <h1 className='text-3xl font-semibold hidden lg:block'>Products</h1>
            <div className='w-full lg:w-4/5 flex flex-col lg:flex-row items-center justify-between'>
              <Input
                onChange={handleSearchChange}
                placeholder='Search Book ...'
                className='w-full lg:w-2/3 py-3'
              />
              <div className='w-full lg:ml-4 lg:w-1/3 mt-5 lg:mt-0 flex items-center justify-between lg:justify-between'>
                <button
                  className='flex items-center hover:bg-slate-200 duration-300 py-2 px-4 rounded-full'
                  onClick={handleExportFile}
                >
                  <CloudDownloadOutlined className='text-3xl' />
                  <span className='ml-2 text-lg text-bold'>Export</span>
                </button>
                <button
                  className='text-base bg-green-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-green-600'
                  type='primary'
                  onClick={() => setVisibleAdd(true)}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
          <div className='data-shop-page my-4 lg:my-6'>
            <Table
              className='text-center'
              columns={columns}
              dataSource={
                Array.isArray(productList)
                  ? productList.map((product) => ({
                      key: product._id,
                      image: product.images[0],
                      title: product.title,
                      author: product.author,
                      category: product.category,
                      stock: product.stock,
                      salesNumber: product.salesNumber,
                      price: product.price,
                    }))
                  : []
              }
              loading={loading}
              pagination={{
                pageSize: 5, // Số lượng sản phẩm mỗi trang
              
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
        title='Add New Product'
        onCancel={handleCancelAdd}
        footer={null}
      >
        <Formik
          initialValues={{
            title: '',
            price: 0,
            description: '',
            author: '',
            publisher: '',
            language: '',
            ISBN: '',
            stock: 0,
            category: [],
            uploadImage: [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              // Preparing form data to match the API expected format (if necessary)
              const formData = new FormData();
              formData.append('title', values.title);
              formData.append('price', values.price);
              formData.append('description', values.description);
              formData.append('author', values.author);
              formData.append('publisher', values.publisher);
              formData.append('language', values.language);
              formData.append('ISBN', values.ISBN);
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
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Title</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='title' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.title && errors.title && (
                      <div className='error text-red-500 ml-1'>{errors.title}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Price</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field
                    name='price'
                    as={Input}
                    className='w-full py-2'
                    type='number'
                    step='0.01'
                  />
                  <div className='h-8 py-1'>
                    {touched.price && errors.price && (
                      <div className='error text-red-500 ml-1'>{errors.price}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd truncate'>Description</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='description' as={TextArea} rows={4} className='w-full py-1' />
                  <div className='h-8 py-1'>
                    {touched.description && errors.description && (
                      <div className='error text-red-500 ml-1'>{errors.description}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Author</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='author' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.author && errors.author && (
                      <div className='error text-red-500 ml-1'>{errors.author}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Publisher</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='publisher' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.publisher && errors.publisher && (
                      <div className='error text-red-500 ml-1'>{errors.publisher}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Language</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='language' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.language && errors.language && (
                      <div className='error text-red-500 ml-1'>{errors.language}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>ISBN</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='ISBN' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.ISBN && errors.ISBN && (
                      <div className='error text-red-500 ml-1'>{errors.ISBN}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Stock</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='stock' as={Input} className='w-full py-2' type='number' />
                  <div className='h-8 py-1'>
                    {touched.stock && errors.stock && (
                      <div className='error text-red-500 ml-1'>{errors.stock}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd truncate'>Category</label>
                {/* <Field
                                    name="category"
                                    as={Input}
                                    className="w-2/3 py-2"
                                /> */}
                <div className='w-2/3 flex flex-col items-start'>
                  <Select
                    className='w-4/5'
                    mode='multiple'
                    placeholder='Select categories'
                    style={{
                      flex: 1,
                    }}
                    onChange={(value) => setFieldValue('category', value)}
                  >
                    <Select.Option value='Comedy'>Comedy</Select.Option>
                    <Select.Option value='Drama'>Drama</Select.Option>
                    <Select.Option value='Horror'>Horror</Select.Option>
                  </Select>
                  <div className='h-8 py-1'>
                    {touched.category && errors.category && (
                      <div className='error text-red-500 ml-1'>{errors.category}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex items-flex-start justify-flex-start'>
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
              </div>
              <button
                className='text-end text-base bg-green-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-green-600'
                type='submit'
                disabled={isSubmitting} // Disable button while submitting
              >
                Add
              </button>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Edit Product */}
      <Modal
        open={visibleEdit}
        className='text-center'
        title='Edit Product'
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Formik
          enableReinitialize={true}
          initialValues={{
            title: product?.title || '', // Sử dụng optional chaining và giá trị mặc định
            price: product?.price || 0,
            description: product?.description || '',
            author: product?.author || '',
            publisher: product?.publisher || '',
            language: product?.language || '',
            ISBN: product?.ISBN || '',
            stock: product?.stock || 0,
            category: product?.category || [],
            uploadImage: product?.images || [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const formData = new FormData();
              formData.append('title', values.title);
              formData.append('price', values.price);
              formData.append('description', values.description);
              formData.append('author', values.author);
              formData.append('publisher', values.publisher);
              formData.append('language', values.language);
              formData.append('ISBN', values.ISBN);
              formData.append('stock', values.stock);
              formData.append('category', values.category);
              values.uploadImage.forEach((file) => formData.append('images', file));

              console.log('Form Data:', Object.fromEntries(formData));
              const response = await productsApi.updateProduct(product._id, formData);
              message.success('Product updated successfully!');
              handleCancelEdit();
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
                <label className='label-input-tnvd'>Title</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='title' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.title && errors.title && (
                      <div className='error text-red-500 ml-1'>{errors.title}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Price</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='price' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.price && errors.price && (
                      <div className='error text-red-500 ml-1'>{errors.price}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd truncate'>Description</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='description' as={TextArea} rows={4} className='w-full py-1' />
                  <div className='h-8 py-1'>
                    {touched.description && errors.description && (
                      <div className='error text-red-500 ml-1'>{errors.description}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Author</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='author' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.author && errors.author && (
                      <div className='error text-red-500 ml-1'>{errors.author}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Publisher</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='publisher' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.publisher && errors.publisher && (
                      <div className='error text-red-500 ml-1'>{errors.publisher}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Language</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='language' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.language && errors.language && (
                      <div className='error text-red-500 ml-1'>{errors.language}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>ISBN</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='ISBN' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.ISBN && errors.ISBN && (
                      <div className='error text-red-500 ml-1'>{errors.ISBN}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd'>Stock</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Field name='stock' as={Input} className='w-full py-2' />
                  <div className='h-8 py-1'>
                    {touched.stock && errors.stock && (
                      <div className='error text-red-500 ml-1'>{errors.stock}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-input-tnvd'>
                <label className='label-input-tnvd truncate'>Category</label>
                {/* <Field
                                    name="category"
                                    as={Input}
                                    className="w-2/3 py-2"
                                /> */}
                <div className='w-2/3 flex flex-col items-start'>
                  <Select
                    className='w-4/5'
                    mode='multiple'
                    placeholder='Select categories'
                    style={{
                      flex: 1,
                    }}
                    value={values.category}
                    onChange={(value) => setFieldValue('category', value)}
                  >
                    <Select.Option value='Comedy'>Comedy</Select.Option>
                    <Select.Option value='Drama'>Drama</Select.Option>
                    <Select.Option value='Horror'>Horror</Select.Option>
                  </Select>
                  <div className='h-8 py-1'>
                    {touched.category && errors.category && (
                      <div className='error text-red-500 ml-1'>{errors.category}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex items-flex-start justify-flex-start'>
                <label className='label-input-tnvd truncate'>Upload Image</label>
                <div className='w-2/3 flex flex-col items-start'>
                  <Upload
                    listType='picture-card'
                    fileList={values.uploadImage
                      .filter((file) => file) // Loại bỏ các giá trị undefined hoặc null trong mảng
                      .map((file, index) => {
                        console.log('Processing file:', file); // Kiểm tra giá trị của từng phần tử

                        // Kiểm tra xem file có phải là URL (String) hay không
                        if (typeof file === 'string') {
                          return {
                            uid: index, // Tạo UID duy nhất cho mỗi ảnh
                            name: 'Unknown', // Không có name cho URL
                            status: 'done',
                            url: file, // Nếu là URL thì sử dụng trực tiếp
                          };
                        }

                        // Kiểm tra nếu là đối tượng File
                        return {
                          uid: index,
                          name: file?.name || 'Unknown', // Đảm bảo file có name, nếu không gán 'Unknown'
                          status: 'done',
                          url: file instanceof File ? URL.createObjectURL(file) : file,
                        };
                      })}
                    onChange={(info) => {
                      // Kết hợp các file hiện tại và file mới
                      const updatedFileList = [
                        ...values.uploadImage.filter((file) => file instanceof File), // Giữ lại các file cũ là đối tượng File
                        ...info.fileList.map((file) => file.originFileObj), // Thêm các file mới
                      ];

                      setFieldValue('uploadImage', updatedFileList); // Cập nhật danh sách ảnh trong state
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
                className='text-end text-base bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-blue-500'
                type='submit'
                disabled={isSubmitting} // Disable button while submitting
              >
                Edit Product
              </button>
              {/* Đoạn useEffect sẽ cập nhật các giá trị trong form nếu có selectedProduct */}
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
