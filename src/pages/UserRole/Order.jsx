import React, { useState } from "react";
import { Input, Button, Form, Modal, Radio, Table, notification, Typography, Space } from "antd";
import { Context } from "react-intl/src/components/injectIntl";
import stripe2 from '../../assets/images/stripe2.jpg';
import vnp from '../../assets/images/vnpay.jpg';

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
    const [voucherCode, setVoucherCode] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddAddressModalVisible, setIsAddAddressModalVisible] = useState(false);
    const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({
        name: "",
        phone: "",
        address: "",
    });
    const [discount, setDiscount] = useState(0);

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

    const vouchers = [
        { code: "DISCOUNT10", description: "10% off on your order", discountRate: 0.009 },
        { code: "FREESHIP", description: "Free Shipping", discountRate: 0 },
        { code: "SAVE20", description: "20% off on orders above 1,000,000₫", discountRate: 0.018 },
    ];
    const [shippingCost, setShippingCost] = useState(32700);

    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardOption, setCardOption] = useState("");

    const calculateTotalAmount = () =>
        products.reduce((sum, product) => sum + product.total, 0) - discount + shippingCost;

    const handleApplyVoucher = () => {
        const selectedVoucher = vouchers.find((voucher) => voucher.code === voucherCode);

        if (selectedVoucher) {
            const totalPrice = products.reduce((sum, product) => sum + product.total, 0);

            if (selectedVoucher.code === "FREESHIP") {
                setDiscount(0);
                notification.success({
                    message: "Voucher Applied",
                    description: "Shipping cost has been waived!",
                });
                setShippingCost(0);
                setIsVoucherModalVisible(false);
                return;
            }

            // Specific logic for "SAVE20"
            if (selectedVoucher.code === "SAVE20" && totalPrice < 1000000) {
                notification.error({
                    message: "Voucher Not Applicable",
                    description: "This voucher is valid for orders above 1,000,000₫ only.",
                });
                return;
            }

            // Apply discount for percentage-based vouchers
            const discountAmount = totalPrice * selectedVoucher.discountRate;
            setDiscount(discountAmount);

            notification.success({
                message: "Voucher Applied",
                description: `You received a discount of ${discountAmount}$!`,
            });
            setIsVoucherModalVisible(false);
        } else {
            notification.error({
                message: "Invalid Voucher Code",
                description: "The voucher code you entered is not valid. Please try again.",
            });
        }
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

    const handlePlaceOrder = (values) => {
        // Validate selected address
        if (!selectedAddressId) {
            notification.error({
                message: "Please add an address",
                description: "You need to select or add an address to continue.",
            });
            return;
        }

        // Validate payment method
        if (!paymentMethod || (paymentMethod === "card" && !cardOption)) {
            notification.error({
                message: "Invalid Payment Method",
                description: "Please select a valid payment method.",
            });
            return;
        }

        // Prepare order data
        const orderData = {
            address: addresses.find((addr) => addr.id === selectedAddressId),
            products: products,
            voucher: voucherCode ? vouchers.find(v => v.code === voucherCode) : null,
            paymentMethod: paymentMethod,
            cardOption: cardOption,
            totalAmount: calculateTotalAmount(),
            shippingCost: shippingCost,
            discount: discount
        };

        // Log or send order data (replace with your actual API call)
        console.log("Complete Order Data:", orderData);

        notification.success({
            message: "Order placed successfully",
            description: `Your order has been processed via ${cardOption || paymentMethod}.`,
        });
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

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
        setCardOption("");
    };

    const handleCardOptionChange = (e) => {
        setCardOption(e.target.value);
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
            render: (price) => <p>{price}$</p>,
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
            render: (total) => <p>{total}$</p>,
        },
    ];

    return (
        <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Checkout</h1>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <Form
                    layout="vertical"
                    onFinish={handlePlaceOrder}
                >
                    {/* Address Section */}
                    <div className="border-b border-gray-200 pb-4 mb-6">
                        <h2 className="text-xl font-semibold mb-4 underline">Address</h2>
                        <div className="flex justify-between items-center">
                            <div>
                                {selectedAddressId ? (
                                    <>
                                        <p>
                                            {
                                                addresses.find((addr) => addr.id === selectedAddressId)
                                                    ?.name
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
                                className="text-gray-800 hover:text-blue-700"
                            >
                                Select / Add Address
                            </Button>
                        </div>
                    </div>

                    {/* Products Table */}
                    <Table
                        columns={columns}
                        dataSource={products}
                        pagination={false}
                        className="mb-6"
                    />

                    {/* Payment Method Section */}
                    <div className="flex flex-col-2 space-x-60 items-center justify-between mb-6">
                        <div>
                            <Form.Item
                                name="paymentMethod"
                                label="Payment Method"
                                required
                            >
                                <Radio.Group
                                    onChange={handlePaymentChange}
                                    value={paymentMethod}
                                >
                                    <Space direction="vertical">
                                        <Radio value="cod">Cash on Delivery</Radio>
                                        <Radio value="card">Credit/Debit Card</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>

                            {paymentMethod === "card" && (
                                <Form.Item
                                    name="cardOption"
                                    label="Select Payment Gateway"
                                    required
                                >
                                    <Radio.Group
                                        onChange={handleCardOptionChange}
                                        value={cardOption}
                                    >
                                        <Space direction="vertical">
                                            <Radio value="stripe" className="flex justify-between">
                                                <img src={stripe2} className="w-10 h-10" alt="Stripe" />Stripe
                                            </Radio>
                                            <Radio value="vnpay" className="flex justify-between">
                                                <img src={vnp} className="w-10 h-10" alt="VNPay" />VNPay
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                            )}
                        </div>

                        {/* Total Cost Section */}
                        <div className="text-right">
                            <p className="text-lg">
                                <span>Total Cost of Goods:</span> {products.reduce((sum, product) => sum + product.total, 0)}$
                            </p>
                            <p className="text-lg">
                                <span>Total Shipping Cost:</span> {shippingCost}$
                            </p>
                            <h2 className="text-lg font-semibold">
                                <span className="underline">Total Payment:</span> {calculateTotalAmount()}$
                            </h2>
                        </div>
                    </div>

                    {/* Voucher Section */}
                    <div className="flex flex-col sm:flex-row justify-end items-center mb-5 gap-2 w-full sm:w-auto">
                        <Typography.Text strong>{voucherCode}</Typography.Text>
                        <Button
                            type="dashed"
                            onClick={() => setIsVoucherModalVisible(true)}
                            className="w-full sm:w-auto"
                        >
                            Select Voucher
                        </Button>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full"
                    >
                        Place Order
                    </Button>
                </Form>
            </div>

            <Modal
                title="Available Vouchers"
                visible={isVoucherModalVisible}
                onOk={handleApplyVoucher}
                onCancel={() => setIsVoucherModalVisible(false)}
                okText="Apply Voucher"
                cancelText="Cancel"
                width={600}
            >
                <div className="flex flex-col gap-4">
                    {vouchers.map((voucher) => (
                        <div
                            key={voucher.code}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                        >
                            <div>
                                <p className="font-semibold">{voucher.code}</p>
                                <p className="text-gray-500">{voucher.description}</p>
                            </div>
                            <Button
                                type="link"
                                onClick={() => setVoucherCode(voucher.code)}
                                className="text-black"
                            >
                                Select
                            </Button>
                        </div>
                    ))}
                </div>
            </Modal>
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
                <Radio.Group
                    onChange={(e) => handleSelectAddress(e.target.value)}
                    value={selectedAddressId}
                    className="flex flex-col gap-4"
                >
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            className="flex items-start justify-between p-3 border border-gray-200 rounded-md"
                        >
                            <Radio value={addr.id}>
                                <div>
                                    <p className="font-semibold">
                                        {addr.name} ({addr.phone})
                                    </p>
                                    <p>{addr.address}</p>
                                    {addr.default && (
                                        <span className="text-red-500 text-sm font-bold">
                                            Default
                                        </span>
                                    )}
                                </div>
                            </Radio>
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
                </Radio.Group>
                <Button
                    type="dashed"
                    onClick={() => {
                        setIsModalVisible(false);
                        setIsAddAddressModalVisible(true);
                    }}
                    className="w-full mt-4"
                >
                    ➕ Add New Address
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