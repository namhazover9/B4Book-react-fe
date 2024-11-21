import React, { useState } from 'react';
import { Table, Button, Divider, InputNumber, Checkbox, Input } from 'antd';
import 'antd/dist/reset.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      shop: 'Shop A',
      name: 'Product A',
      price: 100,
      quantity: 2,
      image: 'https://via.placeholder.com/50',
      selected: false,
    },
    {
      id: 2,
      shop: 'Shop A',
      name: 'Product B',
      price: 150,
      quantity: 1,
      image: 'https://via.placeholder.com/50',
      selected: false,
    },
    {
      id: 3,
      shop: 'Shop B',
      name: 'Product C',
      price: 200,
      quantity: 3,
      image: 'https://via.placeholder.com/50',
      selected: false,
    },
  ]);

  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const totalPriceBeforeDiscount = cartItems
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0);

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

  const handleCheckChange = (id, checked) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, selected: checked } : item)));
  };

  const handleSelectAllInShop = (shop, checked) => {
    setCartItems(
      cartItems.map((item) => (item.shop === shop ? { ...item, selected: checked } : item)),
    );
  };

  const isAllSelectedInShop = (shop) => {
    const shopItems = cartItems.filter((item) => item.shop === shop);
    return shopItems.every((item) => item.selected);
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
    if (totalPriceBeforeDiscount === 0) {
      alert('Please select at least one product for payment!');
      return;
    }
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
      title: 'Select for Payment',
      key: 'select',
      render: (_, record) => (
        <Checkbox
          checked={record.selected}
          onChange={(e) => handleCheckChange(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          <Button type='danger' onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const groupedItems = cartItems.reduce((groups, item) => {
    if (!groups[item.shop]) groups[item.shop] = [];
    groups[item.shop].push(item);
    return groups;
  }, {});

  return (
    <div className='min-h-screen bg-gray-100 p-4 flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-4'>Shopping Cart</h1>
      <div className='w-full max-w-4xl bg-white p-4 shadow-md rounded-lg'>
        {Object.keys(groupedItems).map((shop, index) => (
          <div key={index}>
            <div className='flex justify-between items-center mb-2'>
              <h2 className='text-lg font-bold'>{shop}</h2>
              <Checkbox
                checked={isAllSelectedInShop(shop)}
                onChange={(e) => handleSelectAllInShop(shop, e.target.checked)}
              >
                Select All
              </Checkbox>
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

        <div className='flex items-center mt-4'>
          <Input
            placeholder='Enter Voucher Code'
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            className='mr-4'
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

        <div className='flex justify-between items-center mt-4'>
          <h2 className='text-xl font-bold'>Total Price: ${totalPriceAfterDiscount.toFixed(2)}</h2>
          <Button type='primary' className='bg-red-500 hover:bg-red-600' onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
