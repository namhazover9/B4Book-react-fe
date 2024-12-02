import React, { useState } from 'react';
import { Formik, Field, Form as FormikForm } from 'formik';
import { Table, notification, Radio, Button, Modal, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import vnp from '../../assets/images/vnpay.jpg';
import stripe2 from '../../assets/images/vnpay.jpg';


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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardOption, setCardOption] = useState("");
    const [selectedAddressId, setSelectedAddressId] = useState(addresses.find(addr => addr.default)?.id || null);
    const [isAddAddressModalVisible, setIsAddAddressModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "" });



    const handleStoreChange = (storeIndex) => {
        setStores((prevStores) =>
            prevStores.map((store, index) => {
                if (index === storeIndex) {
                    const newChecked = !store.checked;
                    return {
                        ...store,
                        checked: newChecked,
                        products: store.products.map((product) => ({
                            ...product,
                            checked: newChecked,
                        })),
                    };
                }
                return store;
            })
        );
    };
    const handleProductChange = (storeIndex, productIndex) => {
        setStores((prevStores) =>
            prevStores.map((store, index) => {
                if (index === storeIndex) {
                    return {
                        ...store,
                        products: store.products.map((product, pIndex) => {
                            if (pIndex === productIndex) {
                                return {
                                    ...product,
                                    checked: !product.checked,
                                };
                            }
                            return product;
                        }),
                    };
                }
                return store;
            })
        );
    };
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
            ],
            shipcost: 20000
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
                { code: "DISCOUNT15", description: "15% off on your order", discountRate: 0.15 }
            ],
            shipcost: 30000
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
        let totalShippingCost = 0;

        stores.forEach((store, storeIndex) => {
            const storeTotal = store.products.reduce((sum, product) => {
                return sum + (product.price * product.quantity);
            }, 0);

            // Apply discount for the store if any
            const voucherCode = voucherCodes[storeIndex];
            const selectedVoucher = store.vouchers.find(voucher => voucher.code === voucherCode);
            const storeDiscount = selectedVoucher ? storeTotal * selectedVoucher.discountRate : 0;

            totalPrice += storeTotal;
            totalDiscount += storeDiscount;

            // Add shipping cost for each store
            totalShippingCost += shippingCost;
        });

        return totalPrice - totalDiscount + totalShippingCost;
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
                    Apply Voucher
                </Button>
            ),
        },
    ];

    const handlePlaceOrder = () => {
        if (selectedStore === null) {
            notification.error({
                message: "Please select a store",
                description: "You need to select a store to continue.",
            });
            return;
        }

        // Tạo dữ liệu đơn hàng
        const orderData = {
            address: addresses.find((addr) => addr.id === selectedAddressId), // Địa chỉ đã chọn
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
            totalAmount: calculateTotalAmount(),
            shippingCost: shippingCost,
            discount: discount,
        };

        console.log("Complete Order Data:", orderData);

        notification.success({
            message: "Order placed successfully",
            description: `Your order has been processed successfully.`,
        });
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

                                    <div className="bg-gray-100 p-5 rounded-lg">
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
                                                        )}
                                                    </Field>
                                                </div>

                                            )}
                                        </div>
                                        <h2 className="text-xl font-semibold">Order Summary</h2>
                                        <p className="mt-3">Shipping Cost: 30000$</p>
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
            {/* Voucher Modal */}
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

        </div>
    );
};

export default Checkout;

