import React, { useState } from 'react';
import { Avatar, Breadcrumb, Button, Form, Input, InputNumber, Layout, Menu, message, Modal, Popconfirm, Table, theme, Upload } from 'antd';
import { CloudDownloadOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
import { createStyles } from 'antd-style';
import TextArea from 'antd/es/input/TextArea';
import { use } from 'framer-motion/client';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';


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

export default function AccountManager() {

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
            title: 'Avatar',
            width: 100,
            dataIndex: 'avatar',
            key: 'avatar',
            ...alignCenter,
            render: (text, record, index) => (
                <div>
                    <img src={text} alt="..." className='w-full h-auto' />
                </div>
            ),
        },
        {
            title: 'Email',
            width: 175,
            dataIndex: 'email',
            key: 'email',
            ...alignCenter,
            // fixed: 'left',
            render: (text, record) => (
                <span className="text-red-500">{text}</span>
            ),
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            width: 150,
            ...alignCenter,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 150,
            ...alignCenter,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
            width: 75,
            ...alignCenter,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 75,
            ...alignCenter,
            sorter: (a, b) => a.role - b.role,
        },
        {
            title: 'Action',
            key: 'operation',
            width: 150,
            ...alignCenter,
            render: (text, record) => (
                <button
                    className={`px-4 py-2 rounded-full text-white transition duration-300 ${record.isLocked
                        ? 'bg-green-600 hover:bg-green-400'
                        : 'bg-red-600 hover:bg-red-400'
                        }`}
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
            avatar: 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1732164414/h6_cat3_tiz7yl.png',
            email: 'Anh hen em Pickerball',
            username: `User ${i + 1}`,
            address: 'New York No. 1 Lake Park',
            phonenumber: '123456789',
            role: 'customer',
            isLocked: false, // Trạng thái khóa ban đầu
        }))
    );

    const toggleLock = (key) => {
        setDataSource(prevData =>
            prevData.map(item =>
                item.key === key ? { ...item, isLocked: !item.isLocked } : item
            )
        );
        const user = dataSource.find(item => item.key === key);
        message.info(user?.isLocked ? `Unlocked ${user.username}` : `Locked ${user.username}`);
    };


    const onChange = (sorter) => {
        console.log('params', sorter);
    };

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

    return (
        <div className=''>
            <Content className='mx-2 lg:mx-5'>
                <br />
                <div className='p-4 min-h-96 bg-white rounded-lg'>
                    <div className="header-shop-page px-5 flex items-center justify-between">
                        <h1 className='text-3xl font-semibold hidden lg:block'>Account Manager</h1>
                        <div className="w-full lg:w-4/5 flex flex-col lg:flex-row items-center justify-between">
                            <Input placeholder="Search Book ..." className='w-full lg:w-2/3 py-3' />
                            <div className="w-full lg:ml-4 lg:w-1/3 mt-5 lg:mt-0 flex items-center justify-between lg:justify-between">
                                <button className='flex items-center hover:bg-slate-200 duration-300 py-2 px-4 rounded-full'>
                                    <CloudDownloadOutlined className='text-3xl' />
                                    <span className='ml-2 text-lg text-bold'>Export</span>
                                </button>
                                <button className='text-base bg-green-600 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-green-600' type="primary" onClick={showModalAddProduct}>
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
            <Modal width={600} className='text-center' title="New Product" open={isModalOpenAddProduct} onOk={handleOkAddProduct} onCancel={handleCancelAddProduct}>
                <>
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        style={{
                            maxWidth: 750,
                        }}
                        className='mt-5'
                    >
                        <div className="flex-input-tnvd">
                            <label className='label-input-tnvd'>Title</label>
                            <Input className='w-2/3 py-2' />
                        </div>
                        <div className="flex-input-tnvd">
                            <label className='label-input-tnvd'>Price</label>
                            <InputNumber className='w-1/4 py-1' />
                        </div>
                        <div className="flex-input-tnvd">
                            <label className='label-input-tnvd truncate'>Description</label>
                            <TextArea rows={4} className='w-2/3 lg:w-3/4 py-1' />
                        </div>
                        <div className="flex-input-tnvd">
                            <label className='label-input-tnvd'>Author</label>
                            <Input className='w-2/3 py-2' />
                        </div>
                        <div className="flex-input-tnvd">
                            <label className='label-input-tnvd'>Publisher</label>
                            <Input className='w-2/3 py-2' />
                        </div>
                        <div className="flex-input-tnvd">
                            <label className='label-input-tnvd'>ISBN</label>
                            <InputNumber className='w-1/4 py-1' />
                        </div>
                        <div className="flex-input-tnvd">
                            <label className='label-input-tnvd'>Stock</label>
                            <InputNumber className='w-1/4 py-1' />
                        </div>
                        <div className="flex-input-tnvd">
                            <label className='label-input-tnvd'>Category</label>
                            <Input className='w-2/3 py-2' />
                        </div>
                        <div className="flex items-center justify-flex-start" valuePropName="fileList" getValueFromEvent={normFileAddProduct}>
                            <label className='label-input-tnvd truncate'>Upload Image</label>
                            <Upload action="/upload.do" listType="picture-card">
                                <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                    }}
                                    type="button"
                                >
                                    <PlusOutlined />
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Upload
                                    </div>
                                </button>
                            </Upload>
                        </div>
                    </Form>
                </>
            </Modal>

        </div>
    );
}
