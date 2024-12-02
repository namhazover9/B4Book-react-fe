import { CloudDownloadOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Breadcrumb, Input, Select, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { text } from "framer-motion/client";
import React from "react";
export default function OrderPageOfSeller() {
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
            title: 'ID',
            width: 50,
            dataIndex: 'id',
            key: 'id',
            ...alignCenter,
        },
        {
            title: 'Full Name',
            width: 175,
            dataIndex: 'name',
            key: 'name',
            // fixed: 'left',
            ...alignCenter,
            render: (text, record) => (
                <span className="text-red-500">{text}</span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 75,
            ...alignCenter,
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: 100,
            ...alignCenter,
        },
        {
            title: 'Action',
            key: 'operation',
            // fixed: 'right',
            width: 100,
            ...alignCenter,
            render: () => <div className="flex items-center justify-center">
                <button className='text-base bg-teal-400 text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-teal-400'><SearchOutlined /></button>
            </div>,
        },
    ];
    const dataSource = Array.from({
        length: 50,
    }).map((_, i) => ({
        key: '1',
        id: i + 1,
        name: 'Truong Nguyen Viet Duc',
        email: 'vietduc2811@gmail.com',
        phoneNumber: '0905050550',
        status: 'Pending',
        totalPrice: '$1000',
    }));
    const onChange = (sorter) => {
        console.log('params', sorter);
    };
    return (
        <div className=''>
            <Content className='mx-2 lg:mx-5'>
                <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base'>
                    <Breadcrumb.Item>Shop Page</Breadcrumb.Item>
                    <Breadcrumb.Item>Order Product</Breadcrumb.Item>
                </Breadcrumb>
                <div className='p-4 min-h-96 bg-white rounded-lg'>
                    <div className="header-shop-page px-5 flex items-center justify-between">
                        <h1 className='lg:text-2xl xl:text-3xl font-semibold hidden lg:block'>Orders List</h1>
                        <div className="w-full lg:w-4/5 flex flex-col items-start lg:flex-row lg:items-center justify-between">
                            <Input placeholder="Search Order ..." className='w-full lg:w-2/3 py-3' />
                            <div className='mt-4 lg:mt-0 option-show lg:ml-5'>
                                <Select
                                    defaultValue='All Order'
                                    className='lg:w-48 xl:w-52 mr-2 lg:mr-0'
                                    // onChange={handleChange}
                                    options={[
                                        {
                                            value: 'All Order',
                                            label: 'All Order',
                                        },
                                        {
                                            value: 'Approved',
                                            label: 'Approved',
                                        },
                                        {
                                            value: 'Completed',
                                            label: 'Completed',
                                        },
                                        {
                                            value: 'Payment Pending',
                                            label: 'Payment Pending',
                                        },
                                        {
                                            value: 'In Process',
                                            label: 'In Process',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="data-shop-page my-4 lg:my-6">
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            onChange={onChange}
                            scroll={{
                                x: 'max-content',
                                y: 500,
                            }}
                        />
                    </div>
                </div>
            </Content>
        </div>
    )
}