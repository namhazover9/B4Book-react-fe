import { CloudDownloadOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Input, message, Select, Table, Modal, Button } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { text } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import adminApi from '../../hooks/useAdminApi';
import shopApi from '../../hooks/useShopApi';

export default function withdrawalA() {
  const [withdrawals, setWithdrawals] = useState([]); // Dữ liệu bảng
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const id = useParams().id;
  const shopName = useParams().name;
  const [selectedStatus, setSelectedStatus] = useState('All Withdrawals');
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái modal
  const [currentRecord, setCurrentRecord] = useState(null); // Lưu thông tin dòng hiện tại

  const handleEdit = (record) => {
    setCurrentRecord(record); // Lưu dòng được chọn
    setIsModalVisible(true); // Mở modal
  };

  const handleUpdateStatus = async (status) => {
    if (!currentRecord) return;
    try {
      await adminApi.updateWithdrawRequest(currentRecord.id, status); // Gọi API
      message.success(`Withdrawal request ${status.toLowerCase()} successfully`);
      setIsModalVisible(false); // Đóng modal
      fetchWithdrawals(); // Làm mới dữ liệu
    } catch (error) {
      console.error('Error updating withdrawal:', error);
      message.error('Failed to update withdrawal');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Đóng modal
  };

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getAllWithdrawals(selectedStatus);

      const withdrawalList = response.data.withdrawRequests || []; // Kiểm tra để đảm bảo `orders` là mảng
      setWithdrawals(
        withdrawalList.map((withdrawal, index) => ({
          key: index + 1,
          id: withdrawal._id,
          name: withdrawal.shop?.shopName || 'Unknown',
          email: withdrawal.shop?.shopEmail || 'N/A',
          phoneNumber: withdrawal.shop?.phoneNumber || 'N/A',
          status: withdrawal.status || 'Unknown',
          amount: `$${withdrawal.amount || 0}`,
        })),
      );
    } catch (error) {
      console.log(error);
      message.error('No withdrawal found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals(); // Gọi API khi component được mount
  }, [selectedStatus]);

  const searchWithdrawals = async (keyword) => {
    setLoading(true);
    try {
      const response = await shopApi.searchWithdrawal(keyword);
      const data = response.data?.withdrawals || []; // Đảm bảo data là mảng

      setWithdrawals(data);
    } catch (error) {
      console.error('Error searching withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSearchClick = () => {
  //   // Điều hướng đến route chi tiết đơn hàng với các tham số
  //   navigate(`/shop/${shopName}/orders/order-detail/${orderId}`);
  // };

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() === '') {
      // Nếu từ khóa tìm kiếm trống, gọi lại fetchOrders để lấy tất cả các đơn hàng
      fetchWithdrawals();
    } else {
      // Nếu từ khóa không trống, gọi searchOrders với từ khóa tìm kiếm
      searchWithdrawals(keyword);
    }
  };

  const handleStatusChange = (value) => {
    const { status } = value.split('-');
    setSelectedStatus(status);
  };

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
      title: 'Shop Name',
      width: 175,
      dataIndex: 'name',
      key: 'name',
      // fixed: 'left',
      ...alignCenter,
      render: (text, record) => <span className='text-red-500'>{text}</span>,
    },
    {
      title: 'Shop Email',
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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amonut',
      width: 75,
      ...alignCenter,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      ...alignCenter,
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => {
        const isDisabled = record.status === 'Rejected' || record.status === 'Paid';
        return (
          <EditOutlined
            onClick={() => {
              if (!isDisabled) handleEdit(record); // Chỉ gọi handleEdit nếu nút không bị disabled
            }}
            size='small'
            type='primary'
            style={{
              color: isDisabled ? '#d9d9d9' : '#1890ff',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }}
          />
        );
      },
    },
    
  ];

  const onChange = (sorter) => {
    console.log('params', sorter);
  };

  return (
    <Content style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Input
          placeholder='Search by keyword...'
          value={searchKeyword}
          onChange={handleSearchChange} // Gọi hàm handleSearchChange tại đây
          style={{ width: '300px', marginRight: '10px' }}
        />

        <Select
          defaultValue='Default sorting'
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value)} // Cập nhật selectedSort
          className='w-52 mr-2'
          options={[
            { value: 'All Withdrawals', label: 'All Withdrawals' },
            { value: 'Pending', label: 'Pending' },
            { value: 'Paid', label: 'Paid' },
            { value: 'Rejected', label: 'Rejected' },
          ]}
        />
      </div>
      <div className='data-shop-page my-4 lg:my-6'>
        <Table
          columns={columns}
          dataSource={withdrawals}
          onChange={onChange}
          scroll={{
            x: 'max-content',
            y: 500,
          }}
        />
      </div>
      <Modal
        title='Update Withdrawal Request'
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key='reject' onClick={() => handleUpdateStatus('Rejected')}>
            Reject
          </Button>,
          <Button key='approve' type='primary' onClick={() => handleUpdateStatus('Paid')}>
            Approve
          </Button>,
        ]}
      >
        <p>Do you want to approve or reject this request?</p>
      </Modal>
    </Content>
  );
}
