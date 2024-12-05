import React, { useState } from 'react';
import { Formik, Field, Form as FormikForm } from 'formik';
import { Table, notification, Radio, Button, Modal, Input, Space } from 'antd';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [addresses, setAddresses] = useState([
        { id: 1, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "125 The Lu, An Hai Bac Ward, Son Tra District, Da Nang", default: true },
        { id: 2, name: "Nguyen Dang Hoai", phone: "+84 377 713 160", address: "Tien Son Kindergarten, Tien Son, Tien Phuoc District, Quang Nam", default: false },
    ]);

    const [voucherCodes, setVoucherCodes] = useState({});
    const [selectedStore, setSelectedStore] = useState(null);
    const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false);
    const [discount, setDiscount] = useState(0);    
    const [shippingCost, setShippingCost] = useState(30000);
    const [shipcost, setShipCost] = useState(30000);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardOption, setCardOption] = useState("");
    const [selectedAddressId, setSelectedAddressId] = useState(addresses.find(addr => addr.default)?.id || null);
    const [isAddAddressModalVisible, setIsAddAddressModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "" });

    const [stores, setStores] = useState([
        {
            name: 'Wear Saka Store',
            checked: false,
            products: [
                {
                    id: 1,
                    name: 'Wear Saka Long Pants',
                    price: 250000,
                    quantity: 1,
                    imageUrl: 'https://via.placeholder.com/80',
                    checked: false,
                },
            ],
            vouchers: [
                { code: "DISCOUNT10", description: "10% off on your order", discountRate: 0.10 },
                { code: "FREESHIP", description: "Free Shipping", discountRate: 0 },
            ]
        },
        {
            name: 'BaiLo Store',
            checked: false,
            products: [
                {
                    id: 1,
                    name: 'VaiLo Pants',
                    price: 250000,
                    quantity: 1,
                    imageUrl: 'https://via.placeholder.com/80',
                    checked: false,
                },
            ],
            vouchers: [
                { code: "DISCOUNT15", description: "15% off on your order", discountRate: 0.15 },
                { code: "DISCOUNT20", description: "15% off on your order", discountRate: 0.2 },

            ]
        },
    ]);

    const handleVoucherChange = (storeIndex, voucherCode) => {
        setVoucherCodes((prevVoucherCode) => ({
            ...prevVoucherCode,
            [storeIndex]: voucherCode,
        }));
    };

    const handleApplyVoucher = () => {
        const selectedVoucherCode = voucherCodes[selectedStore];
        if (selectedVoucherCode) {
            const selectedStoreVouchers = stores[selectedStore].vouchers;
            const selectedVoucher = selectedStoreVouchers.find(voucher => voucher.code === selectedVoucherCode);

            if (selectedVoucher) {
                const totalPrice = stores[selectedStore].products.reduce(
                    (sum, product) => sum + (product.checked ? product.price * product.quantity : 0),
                    0
                );

                if (selectedVoucher.code === 'FREESHIP') {
                    setDiscount(0);
                    setShippingCost(0);
                    notification.success({
                        message: 'Voucher Applied',
                        description: 'Shipping cost has been waived!',
                    });
                    setIsVoucherModalVisible(false);
                    return;
                }

                if (selectedVoucher.discountRate) {
                    const discountAmount = totalPrice * selectedVoucher.discountRate;
                    setDiscount(discountAmount);
                    setShippingCost(30000);
                    notification.success({
                        message: 'Voucher Applied',
                        description: `You received a discount of ${discountAmount.toLocaleString()}$!`,
                    });
                    setIsVoucherModalVisible(false);
                }
            } else {
                notification.error({
                    message: 'Invalid Voucher Code',
                    description: 'The voucher code you entered is not valid. Please try again.',
                });
            }
        } else {
            notification.error({
                message: 'Voucher Code Missing',
                description: 'Please select a valid voucher code.',
            });
        }
    };


    const calculateTotalAmount = () => {
        let totalPrice = 0;
        let totalDiscount = 0;

        stores.forEach((store, storeIndex) => {
            const storeTotal = store.products.reduce((sum, product) => {
                return sum + (product.price * product.quantity);
            }, 0);
            const voucherCode = voucherCodes[storeIndex];
            const selectedVoucher = store.vouchers.find(voucher => voucher.code === voucherCode);
            const storeDiscount = selectedVoucher ? storeTotal * selectedVoucher.discountRate : 0;

            totalPrice += storeTotal;
            totalDiscount += storeDiscount;
        });
        const totalShippingCost = shippingCost * stores.length;

        return totalPrice - totalDiscount + totalShippingCost;
    };
    const totalProducts = () => {
        let totalPrice = 0;
        stores.forEach((store, storeIndex) => {
            const storeTotal = store.products.reduce((sum, product) => {
                return sum + (product.price * product.quantity);
            }, 0);
            totalPrice += storeTotal;
        });

        return totalPrice;
    };

    const columns = (storeName, storeIndex) => [
        {
            title: storeName,
        },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            render: imageUrl => <img src={imageUrl} alt="Product" className="w-12 h-12 object-cover" />,
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: price => `${price.toLocaleString()}$`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Total',
            render: (_, record) => {
                const productTotal = record.price * record.quantity;
                return `${productTotal.toLocaleString()}$`;
            },
        },
        {
            title: () => (
                <Button
                    onClick={() => {
                        setSelectedStore(storeIndex);
                        setIsVoucherModalVisible(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded"
                >
                    Voucher
                </Button>
            ),
        },
    ];

    const handlePlaceOrder = (values) => {
        const { paymentMethod, cardOption } = values;

        if (!selectedAddressId) {
            notification.error({
                message: "Please add an address",
                description: "You need to select or add an address to continue.",
            });
            return;
        }
        if (!paymentMethod || (paymentMethod === "card" && !cardOption)) {
            notification.error({
                message: "Invalid Payment Method",
                description: "Please select a valid payment method.",
            });
            return;
        }

        const orderData = {
            address: addresses.find((addr) => addr.id === selectedAddressId),
            products: stores
                .flatMap(store =>
                    store.products
                        .map(product => ({
                            ...product,
                            storeName: store.name,
                        }))
                ),
            vouchers: stores.map((store, storeIndex) => {
                const voucherCode = voucherCodes[storeIndex];
                const selectedVoucher = store.vouchers.find(voucher => voucher.code === voucherCode);
                return selectedVoucher ? {
                    code: selectedVoucher.code,
                    name: selectedVoucher.description,
                    storeName: store.name
                } : null;
            }).filter(voucher => voucher !== null),
            cardOption,
            paymentMethod,
            totalAmount: calculateTotalAmount(),
            shippingCost: shippingCost * stores.length,
        };

        console.log("Complete Order Data:", orderData);

        notification.success({
            message: "Order placed successfully",
            description: `Your order has been processed successfully.`,
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
        setFieldValue("paymentMethod", e.target.value);
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 sm:px-5 pb-12">
            <div className="flex flex-col md:flex-grow-0 justify-center sm:gap-8 pb-8 my-7 px-5 sm:p-8 bg-white shadow-xl rounded-lg md:w-3/4 overflow-auto w-full max-w-6xl">
                <Formik
                    initialValues={{
                        paymentMethod: 'card',
                        cardOption: '',
                    }}
                    onSubmit={handlePlaceOrder}
                >
                    {({ setFieldValue, values }) => (
                        <FormikForm>
                            <h1 className="flex items-center justify-center text-2xl underline text-red-700 mt-5">Order</h1>
                            <div className="mb-5 p-0">
                                <Link to="/cart">
                                    <Button>Back</Button>
                                </Link>
                            </div>
                            <div className="flex flex-wrap w-full">
                                {/* Left Section */}
                                <div className="w-full md:w-2/3 lg:pr-4">

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

                                    {stores.map((store, storeIndex) => (
                                        <div key={storeIndex} className="mb-5">
                                            <Table
                                                dataSource={store.products}
                                                columns={columns(store.name, storeIndex)}
                                                rowKey="id"
                                                pagination={false}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Right Section */}
                                <div className="w-full md:w-1/3">

                                    {/* Payment Section */}
                                    <div className="flex flex-col space-y-4 h-auto lg:h-80 sm:pt-5">
                                        <div className="text-base sm:text-lg font-bold underline">Payment Method</div>
                                        <Field name="paymentMethod">
                                            {({ field }) => (
                                                <Radio.Group
                                                    {...field}
                                                    onChange={(e) => setFieldValue("paymentMethod", e.target.value)}
                                                    value={field.value}
                                                >
                                                    <Space direction="vertical" className="mt-3">
                                                        <Radio value="cash">Cash on Delivery</Radio>
                                                        <Radio value="card">Credit/Debit Card</Radio>
                                                    </Space>
                                                </Radio.Group>
                                            )}
                                        </Field>

                                        {values.paymentMethod === "card" && (
                                            <div>
                                                <div className="text-base sm:text-lg font-bold underline">
                                                    Select Payment Gateway
                                                </div>
                                                <Field name="cardOption">
                                                    {({ field }) => (
                                                        <Radio.Group
                                                            {...field}
                                                            onChange={(e) => setFieldValue("cardOption", e.target.value)}
                                                            value={values.cardOption}
                                                        >
                                                            <Space direction="vertical" className="mt-3">
                                                                <Radio value="stripe">
                                                                    <div className="flex items-center">
                                                                        <img src={'https://ps.w.org/woocommerce-gateway-stripe/assets/icon-256x256.png?rev=3177277'} className="w-8 h-8 mr-2" alt="Stripe" />
                                                                        Stripe
                                                                    </div>
                                                                </Radio>
                                                                <Radio value="vnpay">
                                                                    <div className="flex items-center">
                                                                        <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s'} className="w-8 h-8 mr-2" alt="VNPay" />
                                                                        VNPay
                                                                    </div>
                                                                </Radio>
                                                            </Space>
                                                        </Radio.Group>
                                                    )}
                                                </Field>
                                            </div>

                                        )}
                                    </div>

                                    <div className="bg-gray-100 p-5 rounded-lg">
                                        <h2 className="text-xl font-semibold">Order Summary</h2>
                                        <p className="mt-3">Shipping Cost: {shipcost * stores.length}$</p>
                                        <p className="mt-3">Total Cost of Goods: {totalProducts().toLocaleString()}$</p>
                                        <p className="mt-3">Total Amount: {calculateTotalAmount().toLocaleString()}$</p>
                                        <div className="mt-3">
                                            <button
                                                type="submit"
                                                className="text-sm bg-red-500 hover:bg-red-400 text-white px-3 py-2 sm:px-4 sm:py-2 rounded"
                                            >
                                                Place Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormikForm>
                    )}
                </Formik>
            </div>
            <Modal
                visible={isVoucherModalVisible}
                onOk={handleApplyVoucher}
                onCancel={() => setIsVoucherModalVisible(false)}
                okText="Apply Voucher"
                cancelText="Cancel"
                width={400}
                footer={stores[selectedStore]?.vouchers.length > 0 ? [
                    <Button key="cancel" onClick={() => setIsVoucherModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="apply"
                        type="primary"
                        onClick={handleApplyVoucher}
                    >
                        Apply Voucher
                    </Button>
                ] : null}
            >
                <p className="underline text-[1.19em]">Apply Voucher</p>
                <div className="flex flex-col gap-4">
                    {stores[selectedStore]?.vouchers.length > 0 ? (
                        <Radio.Group>
                            {stores[selectedStore].vouchers.map((voucher) => (
                                <div key={voucher.code} className="flex items-center justify-between p-3 border border-gray-200 rounded-md space-y-3 m-3">
                                    <Radio
                                        value={voucher.code}
                                        checked={voucherCodes[selectedStore] === voucher.code}
                                        onChange={(e) => handleVoucherChange(selectedStore, e.target.value)}
                                    >
                                        <div>
                                            <p className="font-semibold">{voucher.code}</p>
                                            <p className="text-gray-500">{voucher.description}</p>
                                        </div>
                                    </Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    ) : (
                        <p className="text-gray-500">No voucher for this shop!</p>
                    )}
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
