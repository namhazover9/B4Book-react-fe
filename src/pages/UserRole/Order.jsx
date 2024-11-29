import React, { useState } from "react";
import { Input, Button, Form, Modal, Radio, Table, notification, Space } from "antd";
import stripe2 from '../../assets/images/stripe2.jpg';
import { Link } from 'react-router-dom';
import vnp from '../../assets/images/vnpay.jpg';

const Checkout = () => {
    const [addresses, setAddresses] = useState([
        { id: 1, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "125 The Lu, An Hai Bac Ward, Son Tra District, Da Nang", default: true },
        { id: 2, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "Tien Son Kindergarten, Tien Son, Tien Phuoc District, Quang Nam", default: false },
        { id: 3, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "Tien Son Kindergarten, Tien Son, Tien Phuoc District, Quang Nam", default: false },
        { id: 4, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "Tien Son Kindergarten, Tien Son, Tien Phuoc District, Quang Nam", default: false },
        { id: 5, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "Tien Son Kindergarten, Tien Son, Tien Phuoc District, Quang Nam", default: false },
        { id: 6, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "Tien Son Kindergarten, Tien Son, Tien Phuoc District, Quang Nam", default: false },
        { id: 7, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "Tien Son Kindergarten, Tien Son, Tien Phuoc District, Quang Nam", default: false },
        { id: 8, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "Tien Son Kindergarten, Tien Son, Tien Phuoc District, Quang Nam", default: false },
        { id: 9, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "Tien Son Kindergarten, Tien Son, Tien Phuoc District, Quang Nam", default: false },
    ]);
    const [selectedAddressId, setSelectedAddressId] = useState(addresses.find(addr => addr.default)?.id || null);
    const [voucherCode, setVoucherCode] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddAddressModalVisible, setIsAddAddressModalVisible] = useState(false);
    const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "" });
    const [discount, setDiscount] = useState(0);
    const [shippingCost, setShippingCost] = useState(32700);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardOption, setCardOption] = useState("");

    const [products, setProducts] = useState([
        { id: 1, name: "Healthy Book", price: 15500, quantity: 1, total: 15500 },
        { id: 2, name: "Book: Clean Code", price: 500000, quantity: 1, total: 500000 },
        { id: 3, name: "Book: The Pragmatic Programmer", price: 450000, quantity: 2, total: 900000 },
        { id: 4, name: "Book: JavaScript: The Good Parts", price: 300000, quantity: 1, total: 300000 },
        { id: 5, name: "Book: JavaScript: The Good Parts", price: 300000, quantity: 1, total: 300000 },
        { id: 6, name: "Book: JavaScript: The Good Parts", price: 300000, quantity: 1, total: 300000 },
        { id: 7, name: "Book: JavaScript: The Good Parts", price: 300000, quantity: 1, total: 300000 },
    ]);
    const vouchers = [
        { code: "DISCOUNT10", description: "10% off on your order", discountRate: 0.009 },
        { code: "FREESHIP", description: "Free Shipping", discountRate: 0 },
        { code: "SAVE20", description: "20% off on orders above 1,000,000₫", discountRate: 0.018 },
        { code: "SAVE4", description: "20% off on orders above 1,000,000₫", discountRate: 0.018 },
        { code: "SAVE21", description: "20% off on orders above 1,000,000₫", discountRate: 0.018 },
        { code: "SAVE22", description: "20% off on orders above 1,000,000₫", discountRate: 0.018 },
    ];

    const calculateTotalAmount = () =>
        products.reduce((sum, product) => sum + product.total, 0) - discount + shippingCost;

    const handleApplyVoucher = () => {
        const selectedVoucher = vouchers.find((voucher) => voucher.code === voucherCode);

        if (selectedVoucher) {
            const totalPrice = products.reduce((sum, product) => sum + product.total, 0);

            if (selectedVoucher.code === "FREESHIP") {
                setDiscount(37200);
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

    const handlePlaceOrder = () => {
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
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 pb-12">
            <div className="flex flex-col md:flex-grow-0 justify-center sm:gap-8 pb-8 my-7 sm:p-8 bg-white shadow-xl rounded-lg md:w-3/4 overflow-auto w-full max-w-6xl ">
                <Form layout="vertical" onFinish={handlePlaceOrder}>
                    <h1 className="flex items-center justify-center text-2xl underline text-red-700">Order</h1>
                    <div className="mb-5 p-0">
                        <Link to="/cart" >
                            <Button>Back</Button>
                        </Link>
                    </div>
                    <div className="flex flex-wrap w-full ">
                        {/* Left Section */}
                        <div className="w-full md:w-2/3 lg:pr-4">
                            {/* Address Section */}
                            <div className="border-b border-gray-100 pb-4 mb-4 sm:mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-base sm:text-lg font-semibold underline">Address</h2>
                                    <Button
                                        type="link"
                                        onClick={() => setIsModalVisible(true)}
                                        className="text-gray-800 hover:text-blue-700 underline"
                                    >
                                        Select / Add Address
                                    </Button>
                                </div>
                                {selectedAddressId && (
                                    <div>
                                        <p>
                                            {addresses.find((addr) => addr.id === selectedAddressId)?.name}{" "}
                                            ({addresses.find((addr) => addr.id === selectedAddressId)?.phone})
                                        </p>
                                        <p>{addresses.find((addr) => addr.id === selectedAddressId)?.address}</p>
                                    </div>
                                )}
                            </div>

                            {/* Product List Section */}
                            <div className="space-y-4 max-h-[40vh] sm:max-h-[60vh] overflow-y-auto scrollbar-hide border-y-2 border-gray-500">
                                {products.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
                                    >
                                        <div className="flex items-center w-2/3">
                                            <div className="h-16 sm:h-20 w-16 sm:w-20 mr-2 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={vnp}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-sm sm:text-base truncate max-w-[120px] sm:max-w-[200px]">
                                                    {item.name}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 w-1/3">
                                            <div className="flex items-center border rounded">
                                                <span className="px-1 sm:px-3">{item.quantity}</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm sm:text-base">Price</p>
                                                <p className="font-semibold text-sm sm:text-base">{item.price}</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm sm:text-base">Total</p>
                                                <p className="font-semibold text-sm sm:text-base">{item.total}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="w-full md:w-1/3 pl-0 sm:pl-10 sm:pt-5 lg:border-l sm:border-gray-300">
                            {/* Payment Section */}
                            <div className="flex flex-col space-y-4 h-auto lg:h-80 sm:pt-5">
                                <Form.Item name="paymentMethod" required>
                                    <p className="text-base sm:text-lg font-bold underline">Payment Method</p>
                                    <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
                                        <Space direction="vertical" className="mt-3">
                                            <Radio value="cash">Cash on Delivery</Radio>
                                            <Radio value="card">Credit/Debit Card</Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>

                                {paymentMethod === "card" && (
                                    <Form.Item name="cardOption" required>
                                        <p className="text-base sm:text-lg font-bold underline">
                                            Select Payment Gateway
                                        </p>
                                        <Radio.Group onChange={handleCardOptionChange} value={cardOption}>
                                            <Space direction="vertical" className="mt-3">
                                                <Radio value="stripe">
                                                    <div className="flex items-center">
                                                        <img src={stripe2} className="w-8 h-8 mr-2" alt="Stripe" />
                                                        Stripe
                                                    </div>
                                                </Radio>
                                                <Radio value="vnpay">
                                                    <div className="flex items-center">
                                                        <img src={vnp} className="w-8 h-8 mr-2" alt="VNPay" />
                                                        VNPay
                                                    </div>
                                                </Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                )}
                            </div>

                            {/* Total Cost Section */}
                            <div className="flex-1 text-left space-y-2 mt-6 border-t sm:border-gray-300">
                                <p className="text-sm sm:text-md font-bold mt-2">
                                    <span>Total Cost of Goods:</span> {products.reduce((sum, product) => sum + product.total, 0)}$
                                </p>
                                <p className="text-sm sm:text-md m-0">
                                    <span>Shipping Cost:</span> {shippingCost}$
                                </p>
                                <p className="text-sm sm:text-md m-0">
                                    <span>Discount:</span> {discount}$
                                </p>
                                <p className="text-md sm:text-lg font-bold m-0 underline">
                                    <span>Total Amount:</span> {calculateTotalAmount()}$
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between items-center mt-6 space-x-3 sm:space-x-5">
                                <Button
                                    onClick={() => setIsVoucherModalVisible(true)}
                                    className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded"
                                >
                                    Apply Voucher
                                </Button>
                                <button type="primary"
                                    htmlType="submit"
                                    className='text-sm bg-red-500 hover:bg-red-400 text-white px-3 py-2 sm:px-4 sm:py-2 rounded'>
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>

            {/*Voucher Modals */}
            <Modal
                visible={isVoucherModalVisible}
                onOk={handleApplyVoucher}
                onCancel={() => setIsVoucherModalVisible(false)}
                okText="Apply Voucher"
                cancelText="Cancel"
                width={400}
            >
                {/* Voucher Modal Content */}
                <p className="underline text-[1.19em]">Apply Voucher</p>
                <div className="flex flex-col gap-4">
                    <Radio.Group
                        onChange={(e) => setVoucherCode(e.target.value)}
                        value={voucherCode}
                        className="max-h-60 overflow-y-auto scrollbar-hide"
                    >
                        {vouchers.map((voucher) => (
                            <div
                                key={voucher.code}
                                className="flex items-center justify-between p-3 border border-gray-200 rounded-md space-y-3 m-3"
                            >
                                <Radio key={voucher.code} value={voucher.code}>
                                    <div>
                                        <p className="font-semibold">{voucher.code}</p>
                                        <p className="text-gray-500">{voucher.description}</p>
                                    </div>
                                </Radio>
                            </div>
                        ))}
                    </Radio.Group>
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
                    className="max-h-60 overflow-y-auto scrollbar-hide"
                >
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            className="flex items-start justify-between p-3 border border-gray-200 rounded-md m-3"
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