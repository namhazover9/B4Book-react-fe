import React, { useState } from "react";
import { Input, Button, Form, Modal, Radio, Table, notification } from "antd";

const Checkout = () => {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "Nguyen Dang Hoai",
            phone: "+84 377 713 160",
            address: "125 The Lu, An Hai Bac Ward, Son Tra District, Da Nang",
            default: true,
        },
        {
            id: 2,
            name: "Nguyen Dang Hoai",
            phone: "+84 377 713 160",
            address: "Tien Son Kindergarten, Tien Son, Tien Phuoc District, Quang Nam",
            default: false,
        },
    ]);

    const [selectedAddressId, setSelectedAddressId] = useState(
        addresses.find((addr) => addr.default)?.id || null
    );
    const [voucherCode, setVoucherCode] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddAddressModalVisible, setIsAddAddressModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({
        name: "",
        phone: "",
        address: "",
    });

    const products = [
        {
            key: "1",
            name: "Healthy Book",
            price: 15500,
            quantity: 1,
            total: 15500,
        },
        {
            key: "2",
            name: "Book: Clean Code",
            price: 500000,
            quantity: 1,
            total: 500000,
        },
        {
            key: "3",
            name: "Book: The Pragmatic Programmer",
            price: 450000,
            quantity: 2,
            total: 900000,
        },
        {
            key: "4",
            name: "Book: JavaScript: The Good Parts",
            price: 300000,
            quantity: 1,
            total: 300000,
        },
    ];

    const handleApplyVoucher = () => {
        if (voucherCode === 'DISCOUNT10') {
            const discountAmount = totalPriceBeforeDiscount * 0.1;
            setDiscount(discountAmount);
        } else {
            notification.error({
                message: 'Invalid Voucher Code',
                description: 'The voucher code you entered is not valid. Please try again.',
            });
            setDiscount(0);
        }
    };

    const calculateTotalAmount = () =>
        products.reduce((sum, product) => sum + product.total, 0);

    const handleUpdateDefault = () => {
        setAddresses(
            addresses.map((addr) => ({
                ...addr,
                default: addr.id === selectedAddressId,
            }))
        );
        setIsModalVisible(false);
        notification.success({ message: "Default address updated successfully!" });
    };

    const handlePlaceOrder = () => {
        if (!selectedAddressId) {
            notification.error({
                message: "Please add an address",
                description: "You need to select or add an address to continue.",
            });
            return;
        }
        notification.success({
            message: "Order placed successfully",
            description: "Your order has been processed.",
        });
    };

    const handleAddAddress = () => {
        if (!newAddress.name || !newAddress.phone || !newAddress.address) {
            notification.error({ message: "Please fill in all fields for the new address." });
            return;
        }

        const newAddr = {
            ...newAddress,
            id: addresses.length + 1,
            default: false,
        };
        setAddresses([...addresses, newAddr]);
        setNewAddress({ name: "", phone: "", address: "" });
        setIsAddAddressModalVisible(false);
        setIsModalVisible(true);
        notification.success({ message: "Address added successfully!" });
    };

    const handleEditAddress = () => {
        if (!editingAddress.name || !editingAddress.phone || !editingAddress.address) {
            notification.error({ message: "Please fill in all fields." });
            return;
        }

        setAddresses(
            addresses.map((addr) =>
                addr.id === editingAddress.id ? editingAddress : addr
            )
        );
        setEditingAddress(null);
        notification.success({ message: "Address updated successfully!" });
    };

    const handleSelectAddress = (id) => {
        setSelectedAddressId(id);
    };

    const columns = [
        {
            title: "Product",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <div className="flex items-center">
                    <img
                        src="https://via.placeholder.com/50"
                        alt={record.name}
                        className="w-12 h-12 mr-4 object-cover rounded"
                    />
                    <div>
                        <p>{text}</p>
                    </div>
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => <p>{price}₫</p>,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity) => (
                <div className="flex justify-center items-center">{quantity}</div>
            ),
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (total) => <p>{total}₫</p>,
        },
    ];

    return (
        <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
            <h1 className='text-xl sm:text-2xl font-bold mb-4'>Checkout</h1>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-xl font-semibold mb-4 underline">Address</h2>
                    <div className="flex justify-between items-center">
                        <div>
                            {selectedAddressId ? (
                                <>
                                    <p className="">
                                        {
                                            addresses.find((addr) => addr.id === selectedAddressId)?.name
                                        }{" "}
                                        ({addresses.find((addr) => addr.id === selectedAddressId)?.phone})
                                    </p>
                                    <p>
                                        {addresses.find((addr) => addr.id === selectedAddressId)?.address}
                                    </p>
                                </>
                            ) : (
                                <p className="text-gray-500">
                                    You have not selected a shipping address.
                                </p>
                            )}
                        </div>
                        <Button
                            type="link"
                            onClick={() => setIsModalVisible(true)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Select / Add Address
                        </Button>
                    </div>
                </div>

                {/* <h1 className="text-xl mb-6 underline">Checkout</h1> */}
                <Table
                    columns={columns}
                    dataSource={products}
                    pagination={false}
                    className="mb-6"
                />
                <div className="text-right mb-6">
                    <h2 className="text-lg font-bold">
                        Total Amount: {calculateTotalAmount()}₫
                    </h2>
                </div>
                <div className='flex flex-col sm:flex-row justify-end items-center mb-5 gap-2 w-full sm:w-auto'>
                    <Input
                        placeholder='Enter Voucher Code'
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className='w-full sm:w-48'
                    />
                    <Button
                        type='primary'
                        onClick={handleApplyVoucher}
                        className='bg-red-500 hover:bg-red-600 w-full sm:w-auto'
                    >
                        Apply Voucher
                    </Button>
                </div>
                <Form layout="vertical" onFinish={handlePlaceOrder} className="flex justify-center">
                    <Button type="primary" htmlType="submit" className="w-1/2">
                        Place Order
                    </Button>
                </Form>

            </div>

            {/* Address Modals */}
            <Modal
                title="My Addresses"
                visible={isModalVisible}
                onOk={handleUpdateDefault}
                onCancel={() => setIsModalVisible(false)}
                okText="Confirm"
                cancelText="Cancel"
                width={600}
            >
                <div className="flex flex-col gap-4">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            className="flex items-start justify-between p-3 border border-gray-200 rounded-md"
                        >
                            <div>
                                <p className="font-semibold">
                                    {addr.name} ({addr.phone})
                                </p>
                                <p>{addr.address}</p>
                                {addr.default && (
                                    <span className="text-red-500 text-sm font-bold">Default</span>
                                )}
                            </div>
                            <Button
                                type="link"
                                onClick={() => {
                                    setEditingAddress({ ...addr });
                                    setIsModalVisible(false);
                                }}
                                className="text-blue-500"
                            >
                                Update
                            </Button>
                        </div>
                    ))}
                </div>
                <Button
                    type="dashed"
                    onClick={() => {
                        setIsModalVisible(false);
                        setIsAddAddressModalVisible(true);
                    }}
                    className="mt-4 w-full"
                >
                    + Add New Address
                </Button>
            </Modal>

            <Modal
                title="Add New Address"
                visible={isAddAddressModalVisible}
                onOk={handleAddAddress}
                onCancel={() => setIsAddAddressModalVisible(false)}
                okText="Add"
                cancelText="Cancel"
                width={600}
            >
                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="Full Name"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    />
                    <Input
                        placeholder="Phone Number"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    />
                    <Input
                        placeholder="Shipping Address"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    />
                </div>
            </Modal>
            <Modal
                title="Update Address"
                visible={!!editingAddress}
                onOk={handleEditAddress}
                onCancel={() => setEditingAddress(null)}
                okText="Save"
                cancelText="Cancel"
                width={600}
            >
                <Input
                    placeholder="Recipient Name"
                    value={editingAddress?.name || ""}
                    onChange={(e) =>
                        setEditingAddress({ ...editingAddress, name: e.target.value })
                    }
                    className="mb-3"
                />
                <Input
                    placeholder="Phone Number"
                    value={editingAddress?.phone || ""}
                    onChange={(e) =>
                        setEditingAddress({ ...editingAddress, phone: e.target.value })
                    }
                    className="mb-3"
                />
                <Input
                    placeholder="Address"
                    value={editingAddress?.address || ""}
                    onChange={(e) =>
                        setEditingAddress({ ...editingAddress, address: e.target.value })
                    }
                />
            </Modal>
        </div>
    );
};

export default Checkout;
