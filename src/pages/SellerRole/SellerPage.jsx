import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  message,
  Modal,
  Pagination,
  Popconfirm,
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
import { createStyles } from 'antd-style';

import TextArea from 'antd/es/input/TextArea';
import productsApi from '../../hooks/useProductsApi';
import { useParams } from 'react-router-dom';

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
  const productId = null;
  const id = useParams().id;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

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
  const handlePageChange = (page) => {
    setCurrentPage(page); // Cập nhật trang
  };

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
            <EditOutlined onClick={showModalEditProduct} />
          </button>
          <Popconfirm
            title='Delete the Product'
            description='Are you sure to delete this task?'
            onConfirm={() => { handleDeleteProduct(record.key)}}
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

  // Add Product
  const [isModalOpenAddProduct, setIsModalOpenAddProduct] = useState(false);
  const showModalAddProduct = () => {
    setIsModalOpenAddProduct(true);
  };
  const handleOkAddProduct = () => {
    setIsModalOpenAddProduct(false);
  };
  const handleCancelAddProduct = () => {
    setIsModalOpenAddProduct(false);
  };

  const { TextArea } = Input;
  const normFileAddProduct = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // Edit Product
  const [isModalOpenEditProduct, setIsModalOpenEditProduct] = useState(false);
  const showModalEditProduct = () => {
    setIsModalOpenEditProduct(true);
  };
  const handleOkEditProduct = () => {
    setIsModalOpenEditProduct(false);
  };
  const handleCancelEditProduct = () => {
    setIsModalOpenEditProduct(false);
  };

  const normFileEditProduct = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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

  const renderAddEditProductFields = (fileHandler) => (
    <>
      <div className='flex-input-tnvd'>
        <label className='label-input-tnvd'>Title</label>
        <Input className='w-2/3 py-2' />
      </div>
      <div className='flex-input-tnvd'>
        <label className='label-input-tnvd'>Price</label>
        <InputNumber className='w-1/4 py-1' />
      </div>
      <div className='flex-input-tnvd'>
        <label className='label-input-tnvd truncate'>Description</label>
        <TextArea rows={4} className='w-2/3 lg:w-3/4 py-1' />
      </div>
      <div className='flex-input-tnvd'>
        <label className='label-input-tnvd'>Author</label>
        <Input className='w-2/3 py-2' />
      </div>
      <div className='flex-input-tnvd'>
        <label className='label-input-tnvd'>Publisher</label>
        <Input className='w-2/3 py-2' />
      </div>
      <div className='flex-input-tnvd'>
        <label className='label-input-tnvd'>ISBN</label>
        <InputNumber className='w-1/4 py-1' />
      </div>
      <div className='flex-input-tnvd'>
        <label className='label-input-tnvd'>Stock</label>
        <InputNumber className='w-1/4 py-1' />
      </div>
      <div className='flex-input-tnvd'>
        <label className='label-input-tnvd'>Category</label>
        <Input className='w-2/3 py-2' />
      </div>
      <div
        className='flex items-center justify-flex-start'
        valuePropName='fileList'
        getValueFromEvent={fileHandler}
      >
        <label className='label-input-tnvd truncate'>Upload Image</label>
        <Upload action='/upload.do' listType='picture-card'>
          <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </div>
    </>
  );
  return (
    <div className=''>
      <Content className='mx-2 lg:mx-5'>
        <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base'>
          <Breadcrumb.Item>All Shop</Breadcrumb.Item>
          <Breadcrumb.Item>Name Shop</Breadcrumb.Item>
        </Breadcrumb>
        <div className='p-4 min-h-96 bg-white rounded-lg'>
          {/* Header Section */}
          <div className='header-shop-page px-5 flex items-center justify-between'>
            <h1 className='text-3xl font-semibold hidden lg:block'>Products</h1>
            <div className='w-full lg:w-4/5 flex flex-col lg:flex-row items-center justify-between'>
              <Input placeholder='Search Book ...' className='w-full lg:w-2/3 py-3' />
              <div className='w-full lg:ml-4 lg:w-1/3 mt-5 lg:mt-0 flex items-center justify-between'>
                <button className='flex items-center hover:bg-slate-200 duration-300 py-2 px-4 rounded-full'>
                 <div onClick={handleExportFile}>
                 <CloudDownloadOutlined className='text-3xl'  />
                 <span className='ml-2 text-lg font-bold'>Export</span>
                 </div>
                </button>
                <button
                  className='text-base bg-green-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-green-600'
                  type='primary'
                  onClick={showModalAddProduct}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
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
              // Thay vì gọi `handlePageChange(currentPage)` trực tiếp, bạn chỉ cần truyền hàm:
              scroll={{
                x: 'max-content',
                y: 420,
              }}
              
            />
          </div>
        </div>
      </Content>

      {/* Add Product Modal */}
      <Modal
        width={600}
        className='text-center'
        title='New Product'
        open={isModalOpenAddProduct}
        onOk={handleOkAddProduct}
        onCancel={handleCancelAddProduct}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 750 }}
          className='mt-5'
        >
          {/* Input Fields for Add Product */}
          {renderAddEditProductFields(normFileAddProduct)}
        </Form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        title='Edit Product'
        className='text-center'
        open={isModalOpenEditProduct}
        onOk={handleOkEditProduct}
        onCancel={handleCancelEditProduct}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 750 }}
          className='mt-5'
        >
          {/* Input Fields for Edit Product */}
          {renderAddEditProductFields(normFileEditProduct)}
        </Form>
      </Modal>
    </div>
  );
}
