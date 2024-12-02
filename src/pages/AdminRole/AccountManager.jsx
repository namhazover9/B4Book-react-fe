import React, { useState } from 'react';
import { Layout, message, Modal, Table, Upload, Input, Button, Select } from 'antd';
import { Formik, Field, Form } from 'formik';
import { PlusOutlined, CloudDownloadOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import * as Yup from 'yup';

const { Content } = Layout;
const { Option } = Select;

const AccountManager = () => {
    const alignCenter = {
        onHeaderCell: () => ({
            style: { textAlign: 'center', fontSize: '18px' },
        }),
        onCell: () => ({
            style: { textAlign: 'center' },
        }),
    };

    const toggleLock = (key) => {
        setDataSource((prevDataSource) => {
            const updatedDataSource = prevDataSource.map((item) => {
                if (item.key === key) {
                    const newLockStatus = !item.isLocked;
                    message.success(`${newLockStatus ? 'Unlocked' : 'Locked'} account for ${item.username}`);
                    return { ...item, isLocked: newLockStatus };
                }
                return item;
            });

            setFilteredDataSource(updatedDataSource);
            return updatedDataSource;
        });
    };

    const columns = [
        {
            title: 'Avatar',
            width: 100,
            dataIndex: 'avatar',
            key: 'avatar',
            ...alignCenter,
            render: (text) => <img src={text} alt="Avatar" className='w-full h-auto' />,
        },
        {
            title: 'Email',
            width: 175,
            dataIndex: 'email',
            key: 'email',
            ...alignCenter,
            render: (text) => <span className="text-red-500 text-lg">{text}</span>,
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            width: 150,
            ...alignCenter,
            render: (text) => <span className="text-lg">{text}</span>,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 150,
            ...alignCenter,
            render: (text) => <span className="text-lg">{text}</span>,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
            width: 75,
            ...alignCenter,
            render: (text) => <span className="text-lg">{text}</span>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 75,
            ...alignCenter,
            sorter: (a, b) => a.role - b.role,
            render: (text) => <span className="text-lg">{text}</span>,
        },
        {
            title: 'Action',
            key: 'operation',
            width: 150,
            ...alignCenter,
            render: (text, record) => (
                <button
                    className={`text-lg px-4 py-2 rounded-full text-white transition duration-300 ${record.isLocked
                        ? 'bg-green-600 hover:bg-green-400'
                        : 'bg-red-600 hover:bg-red-400'}`}
                    onClick={() => toggleLock(record.key)}
                >
                    {record.isLocked ? (
                        <>
                            <UnlockOutlined className="mr-2" /> Unlock
                        </>
                    ) : (
                        <>
                            <LockOutlined className="mr-2" /> Lock
                        </>
                    )}
                </button>
            ),
        }
    ];

    const [dataSource, setDataSource] = useState(
        Array.from({ length: 50 }).map((_, i) => ({
            key: i,
            avatar: 'https://via.placeholder.com/50',
            email: `user${i + 1}@example.com`,
            username: `User ${i + 1}`,
            address: `Address ${i + 1}`,
            phonenumber: `12345678${i}`,
            role: i % 2 === 0 ? 'Seller' : 'User',
            isLocked: false,
        }))
    );

    const [filteredDataSource, setFilteredDataSource] = useState(dataSource);

    const handleFilterChange = (value) => {
        if (value === 'all') {
            setFilteredDataSource(dataSource);
        } else {
            const isLocked = value === 'locked';
            setFilteredDataSource(dataSource.filter((account) => account.isLocked === isLocked));
        }
    };

    const [isModalOpenAddProduct, setIsModalOpenAddProduct] = useState(false);
    const showModalAddProduct = () => setIsModalOpenAddProduct(true);
    const handleCancelAddProduct = () => setIsModalOpenAddProduct(false);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        price: Yup.number().required('Price is required').positive(),
        description: Yup.string().required('Description is required'),
        author: Yup.string().required('Author is required'),
        publisher: Yup.string().required('Publisher is required'),
        isbn: Yup.string().required('ISBN is required'),
        stock: Yup.number().required('Stock is required').min(0),
        category: Yup.string().required('Category is required'),
    });

    return (
        <div className="overflow-x-hidden px-2 md:px-4 lg:px-6">
            <Content className="mx-2 lg:mx-5">
                <br />
                <div className="p-4 min-h-screen bg-white rounded-lg">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="text-xl lg:text-3xl font-semibold">Account Manager</h1>
                        <div className="w-full lg:w-4/5 flex flex-col md:flex-row items-center gap-4">
                            {/* Thanh tìm kiếm */}
                            <Input placeholder="Search Account ..." className="w-full md:w-2/3 py-2 md:py-3" />

                            {/* Phần các nút Export, Filter và Add Product */}
                            <div className="flex flex-wrap gap-4 w-full md:w-auto justify-between md:justify-start">
                                <button className="flex items-center hover:bg-slate-200 duration-300 py-2 px-4 rounded-full">
                                    <CloudDownloadOutlined className="text-2xl md:text-3xl" />
                                    <span className="ml-2 text-sm md:text-lg font-bold">Export</span>
                                </button>

                                {/* Filter Select */}
                                <Select
                                    defaultValue="all"
                                    style={{ width: '150px' }}
                                    onChange={handleFilterChange}
                                    className="w-full md:w-32"
                                >
                                    <Option value="all">All Accounts</Option>
                                    <Option value="locked">Locked</Option>
                                    <Option value="unlocked">Unlocked</Option>
                                </Select>

                                <Button
                                    className="text-sm md:text-base bg-green-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 hover:text-green-600 duration-300"
                                    onClick={showModalAddProduct}
                                >
                                    Add Product
                                </Button>
                            </div>
                        </div>
                    </div>

                    <br />
                    <Table
                        columns={columns}
                        dataSource={filteredDataSource}
                        scroll={{ x: 'max-content', y: 600 }}
                    />

                    <Modal
                        title="Add Product"
                        open={isModalOpenAddProduct}
                        onCancel={handleCancelAddProduct}
                        footer={[
                            <Button key="cancel" onClick={() => {
                                handleCancelAddProduct();
                                resetForm();
                            }} className="bg-gray-500 text-white">
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" htmlType="submit" className="bg-blue-500 text-white">
                                Submit
                            </Button>,
                        ]}
                        width={600}
                    >
                        <Formik
                            initialValues={{
                                title: '',
                                price: '',
                                description: '',
                                author: '',
                                publisher: '',
                                isbn: '',
                                stock: '',
                                category: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log(values);
                                message.success('Product added successfully!');
                                setIsModalOpenAddProduct(false);
                            }}
                        >
                            {({ errors, touched, resetForm }) => (
                                <Form>
                                    {['title', 'price', 'description', 'author', 'publisher', 'isbn', 'stock', 'category'].map((field) => (
                                        <div key={field} className="mb-4">
                                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                            <Field name={field} className="w-full p-2 border" />
                                            {errors[field] && touched[field] && (
                                                <div className="text-red-500">{errors[field]}</div>
                                            )}
                                        </div>
                                    ))}
                                    <Upload listType="picture-card">
                                        <Button icon={<PlusOutlined />}>Upload</Button>
                                    </Upload>
                                </Form>
                            )}
                        </Formik>
                    </Modal>
                </div>
            </Content>
        </div>
    );
};

export default AccountManager;
