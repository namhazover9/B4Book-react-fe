import { useState, useEffect } from 'react';
import { Table, Button, Divider, InputNumber, Input } from 'antd';
import 'antd/dist/reset.css';

const Cart = ({ onTotalPriceChange, onCartItemsChange, showUI }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      shop: 'Shop A',
      name: 'Product A',
      price: 100,
      quantity: 2,
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      shop: 'Shop A',
      name: 'Product B',
      price: 150,
      quantity: 1,
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 3,
      shop: 'Shop B',
      name: 'Product C',
      price: 200,
      quantity: 3,
      image: 'https://via.placeholder.com/50',
    },
  ]);

  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] = useState(0);

  useEffect(() => {
    const calculatedTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    setTotalPriceBeforeDiscount(calculatedTotal);

    if (onTotalPriceChange) {
      onTotalPriceChange(calculatedTotal);
    }

    if (onCartItemsChange) {
      onCartItemsChange(cartItems);
    }
  }, [cartItems, onTotalPriceChange, onCartItemsChange]);

  const totalPriceAfterDiscount = totalPriceBeforeDiscount - discount;

  const handleDelete = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item,
      ),
    );
  };

  const handleUpdateItems = () => {
    console.log('Updating items:', cartItems);
    alert('Cart updated successfully!');
  };

  const handleApplyVoucher = () => {
    if (voucherCode === 'DISCOUNT10') {
      const discountAmount = totalPriceBeforeDiscount * 0.1;
      setDiscount(discountAmount);
    } else {
      alert('Invalid Voucher Code');
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt='Product' className='w-12 h-12 object-cover' />,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => `$${record.price * record.quantity}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type='danger' onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const groupedItems = cartItems.reduce((groups, item) => {
    if (!groups[item.shop]) groups[item.shop] = [];
    groups[item.shop].push(item);
    return groups;
  }, {});

  if (!showUI)
    return (
      <div className='min-h-screen bg-gray-100 p-4 flex flex-col items-center'>
        <h1 className='text-2xl font-bold mb-4'>Shopping Cart</h1>
        <div className='w-full max-w-4xl bg-white p-4 shadow-md rounded-lg'>
          {Object.keys(groupedItems).map((shop, index) => (
            <div key={index}>
              <div className='flex justify-between items-center mb-2'>
                <h2 className='text-lg font-bold'>{shop}</h2>
              </div>
              <Table
                dataSource={groupedItems[shop]}
                columns={columns}
                rowKey='id'
                pagination={false}
                bordered
              />
              {index < Object.keys(groupedItems).length - 1 && <Divider />}
            </div>
          ))}
          <div className='container flex justify-between items-center'>
            <Button
              type='primary'
              onClick={handleUpdateItems}
              className='bg-red-500 hover:bg-red-600 m-4'
            >
              Update Cart
            </Button>
            <div className='flex items-center m-2'>
              <Input
                placeholder='Enter Voucher Code'
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className='mr-2'
              />
              <Button
                type='primary'
                onClick={handleApplyVoucher}
                className='bg-red-500 hover:bg-red-600'
              >
                Apply Voucher
              </Button>
            </div>
            <div className='flex justify-between items-center mt-4'>
              {discount > 0 && (
                <h3 className='text-xl font-bold text-red-500'>
                  Discount Applied: -${discount.toFixed(2)}
                </h3>
              )}
            </div>
          </div>
          <div className='flex justify-between items-center mt-4'>
            <h2 className='text-xl font-bold'>
              Total Price: ${totalPriceAfterDiscount.toFixed(2)}
            </h2>
            <Button type='primary' className='bg-red-500 hover:bg-red-600' onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    );
};

export default Cart;
