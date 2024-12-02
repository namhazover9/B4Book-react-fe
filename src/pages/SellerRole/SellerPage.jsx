import React, { useState } from 'react';
import { Breadcrumb, Button, Input, InputNumber, Layout, Menu, message, Modal, Popconfirm, Select, Table, theme, Upload } from 'antd';
import { CloudDownloadOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
import * as Yup from 'yup';
import { createStyles } from 'antd-style';
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
                    <img src={text} alt="..." className='w-full h-auto' />
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
            render: (text, record) => (
                <span className="text-red-500">{text}</span>
            ),
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
            render: () => <div className="flex items-center justify-center">
                <button className='text-base bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-blue-600'><EditOutlined onClick={() => setVisibleEdit(true)} /></button>
                <Popconfirm
                    title="Delete the Product"
                    description="Are you sure to delete this task?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className='text-base bg-red-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-red-600 ml-3' danger><DeleteOutlined /></button>
                </Popconfirm>
            </div>,
        },
    ];

    const dataSource = Array.from({
        length: 50,
    }).map((_, i) => ({
        key: '1',
        image: 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732164414/h6_cat3_tiz7yl.png',
        title: 'Anh hen em Pickerball',
        author: 'Vu Hoang Nam',
        stock: 100,
        category: ['Comedy', 'Drama'],
        salesNumber: 1000,
        price: 5000,
        address: 'New York No. 1 Lake Park',
    }));

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
        isbn: Yup.number()
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
        uploadImage: Yup.array()
            .min(1, 'At least one image is required')
            .required('Image is required'),
    });

    // Edit Product
    const [visibleEdit, setVisibleEdit] = useState(false);
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
                    <div className="header-shop-page px-5 flex items-center justify-between">
                        <h1 className='text-3xl font-semibold hidden lg:block'>Products</h1>
                        <div className="w-full lg:w-4/5 flex flex-col lg:flex-row items-center justify-between">
                            <Input placeholder="Search Book ..." className='w-full lg:w-2/3 py-3' />
                            <div className="w-full lg:ml-4 lg:w-1/3 mt-5 lg:mt-0 flex items-center justify-between lg:justify-between">
                                <button className='flex items-center hover:bg-slate-200 duration-300 py-2 px-4 rounded-full'>
                                    <CloudDownloadOutlined className='text-3xl' />
                                    <span className='ml-2 text-lg text-bold'>Export</span>
                                </button>
                                <button className='text-base bg-green-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-green-600' type="primary" onClick={() => setVisibleAdd(true)}>
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="data-shop-page my-4 lg:my-6">
                        <Table
                            // className={styles.customTable}
                            className='text-center'
                            columns={columns}
                            dataSource={dataSource}
                            // scroll={{
                            //     x: 'max-content',
                            //     y: 55 * 5,
                            // }}
                            onChange={onChange}
                            scroll={{
                                x: 'max-content',
                                y: 500,
                            }}
                        />
                    </div>
                </div>
            </Content>
            {/* Add Product */}
            <Modal open={visibleAdd} className='text-center' title="Add New Product" onCancel={handleCancelAdd} footer={null}>
                <Formik
                    initialValues={{
                        title: '',
                        price: '',
                        description: '',
                        author: '',
                        publisher: '',
                        isbn: '',
                        stock: '',
                        category: [],
                        uploadImage: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log('Form Values:', values);
                    }}
                >
                    {({ setFieldValue, errors, touched }) => (
                        <Form className="mt-5">
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">Title</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="title"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.title && errors.title && <div className="error text-red-500 ml-1">{errors.title}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">Price</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="price"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.price && errors.price && <div className="error text-red-500 ml-1">{errors.price}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd truncate">Description</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="description"
                                        as={TextArea}
                                        rows={4}
                                        className="w-full py-1"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.description && errors.description && <div className="error text-red-500 ml-1">{errors.description}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">Author</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="author"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.author && errors.author && <div className="error text-red-500 ml-1">{errors.author}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">Publisher</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="publisher"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.publisher && errors.publisher && <div className="error text-red-500 ml-1">{errors.publisher}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">ISBN</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="isbn"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.isbn && errors.isbn && <div className="error text-red-500 ml-1">{errors.isbn}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">Stock</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="stock"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.stock && errors.stock && <div className="error text-red-500 ml-1">{errors.stock}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd truncate">Category</label>
                                {/* <Field
                                    name="category"
                                    as={Input}
                                    className="w-2/3 py-2"
                                /> */}
                                <div className="w-2/3 flex flex-col items-start">
                                    <Select
                                        className="w-4/5"
                                        mode="multiple"
                                        placeholder="Select categories"
                                        style={{
                                            flex: 1,
                                        }}
                                        onChange={(value) => setFieldValue('category', value)}
                                    >
                                        <Select.Option value="Comedy">Comedy</Select.Option>
                                        <Select.Option value="Drama">Drama</Select.Option>
                                        <Select.Option value="Horror">Horror</Select.Option>
                                    </Select>
                                    <div className="h-8 py-1">
                                        {touched.category && errors.category && (
                                            <div className="error text-red-500 ml-1">{errors.category}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-flex-start justify-flex-start">
                                <label className="label-input-tnvd truncate">Upload Image</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Upload
                                        action="/upload.do"
                                        listType="picture-card"
                                        onChange={(info) => {
                                            setFieldValue(
                                                'uploadImage',
                                                info.fileList.map((file) => file.originFileObj)
                                            );
                                        }}
                                    >
                                        <Button
                                            type="button"
                                            style={{
                                                border: 0,
                                                background: 'none',
                                            }}
                                        >
                                            <PlusOutlined />
                                            <div>Upload</div>
                                        </Button>
                                    </Upload>
                                    <div className="h-8 py-1">
                                        {touched.uploadImage && errors.uploadImage && (
                                            <div className="error text-red-500 ml-1">{errors.uploadImage}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button className='text-end text-base bg-green-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-green-600' type="primary">
                                Add Product
                            </button>
                        </Form>
                    )}
                </Formik>
            </Modal>
            {/* Edit Product */}
            <Modal open={visibleEdit} className='text-center' title="Edit Product" onCancel={handleCancelEdit} footer={null}>
                <Formik
                    initialValues={{
                        title: '',
                        price: '',
                        description: '',
                        author: '',
                        publisher: '',
                        isbn: '',
                        stock: '',
                        category: [],
                        uploadImage: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log('Form Values:', values);
                    }}
                >
                    {({ setFieldValue, errors, touched }) => (
                        <Form className="mt-5">
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">Title</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="title"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.title && errors.title && <div className="error text-red-500 ml-1">{errors.title}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">Price</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="price"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.price && errors.price && <div className="error text-red-500 ml-1">{errors.price}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd truncate">Description</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="description"
                                        as={TextArea}
                                        rows={4}
                                        className="w-full py-1"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.description && errors.description && <div className="error text-red-500 ml-1">{errors.description}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">Author</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="author"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.author && errors.author && <div className="error text-red-500 ml-1">{errors.author}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">Publisher</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="publisher"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.publisher && errors.publisher && <div className="error text-red-500 ml-1">{errors.publisher}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">ISBN</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="isbn"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.isbn && errors.isbn && <div className="error text-red-500 ml-1">{errors.isbn}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd">Stock</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Field
                                        name="stock"
                                        as={Input}
                                        className="w-full py-2"
                                    />
                                    <div className="h-8 py-1">
                                        {touched.stock && errors.stock && <div className="error text-red-500 ml-1">{errors.stock}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-input-tnvd">
                                <label className="label-input-tnvd truncate">Category</label>
                                {/* <Field
                                    name="category"
                                    as={Input}
                                    className="w-2/3 py-2"
                                /> */}
                                <div className="w-2/3 flex flex-col items-start">
                                    <Select
                                        className="w-4/5"
                                        mode="multiple"
                                        placeholder="Select categories"
                                        style={{
                                            flex: 1,
                                        }}
                                        onChange={(value) => setFieldValue('category', value)}
                                    >
                                        <Select.Option value="Comedy">Comedy</Select.Option>
                                        <Select.Option value="Drama">Drama</Select.Option>
                                        <Select.Option value="Horror">Horror</Select.Option>
                                    </Select>
                                    <div className="h-8 py-1">
                                        {touched.category && errors.category && (
                                            <div className="error text-red-500 ml-1">{errors.category}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-flex-start justify-flex-start">
                                <label className="label-input-tnvd truncate">Upload Image</label>
                                <div className="w-2/3 flex flex-col items-start">
                                    <Upload
                                        action="/upload.do"
                                        listType="picture-card"
                                        onChange={(info) => {
                                            setFieldValue(
                                                'uploadImage',
                                                info.fileList.map((file) => file.originFileObj)
                                            );
                                        }}
                                    >
                                        <Button
                                            type="button"
                                            style={{
                                                border: 0,
                                                background: 'none',
                                            }}
                                        >
                                            <PlusOutlined />
                                            <div>Upload</div>
                                        </Button>
                                    </Upload>
                                    <div className="h-8 py-1">
                                        {touched.uploadImage && errors.uploadImage && (
                                            <div className="error text-red-500 ml-1">{errors.uploadImage}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button className='text-end text-base bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-blue-500' type="primary">
                                Edit Product
                            </button>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}
