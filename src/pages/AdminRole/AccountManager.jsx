import React, { useEffect, useState } from 'react';
import { Layout, message, Table, Input, Button, Select } from 'antd';
import { CloudDownloadOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import adminApi from '../../hooks/useAdminApi';

const { Content } = Layout;
const { Option } = Select;

const AccountManager = () => {
  const [userList, setUserList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Truyền giá trị role và status cho API
      // const response = await adminApi.getUser({
      //   role: selectedRole !== 'all' ? selectedRole : '', // Truyền role hoặc để trống
      //   status: selectedStatus !== 'all' ? selectedStatus : '', // Truyền status hoặc để trống
      // });

      const { total, customers, shops, users } = response.data;

      // Cập nhật danh sách user theo role
      if (selectedRole === 'Customer') {
        setUserList(customers || []);
      } else if (selectedRole === 'Shop') {
        setUserList(shops || []);
      } else {
        setUserList(users || []);
      }

      setTotalUsers(total || 0); // Cập nhật tổng số lượng user
    } catch (error) {
      console.error('Error fetching users:', error);
      setUserList([]); // Làm trống danh sách khi có lỗi
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await adminApi.activeOrDeactiveUser(id, status);
      if (response.data.success) {
        alert('Status updated successfully');
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('An error occurred while updating the status');
    }
    fetchUsers();
  };

  const searchAccounts = async (keyword) => {
    setLoading(true);
    try {
      const response = await adminApi.searchAccount(keyword);
      const data = response.data;

      // Kiểm tra nếu dữ liệu trả về có các thuộc tính users hoặc shops
      if (data.users && Array.isArray(data.users)) {
        setUserList(data.users);
      } else if (data.shops && Array.isArray(data.shops)) {
        setUserList(data.shops);
      } else {
        console.error('Dữ liệu trả về không đúng định dạng:', data);
      }
    } catch (error) {
      console.error('Error searching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() === '') {
      // Nếu từ khóa tìm kiếm rỗng, fetch tất cả người dùng
      fetchUsers();
    } else {
      // Nếu có từ khóa tìm kiếm, gọi hàm tìm kiếm
      searchAccounts(keyword);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedRole, selectedStatus]);

  const handleRoleChange = (value) => {
    const [role, status] = value.split('-');
    setSelectedRole(role);
    setSelectedStatus(status);
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avartar',
      key: 'avartar',
      render: (text, record) => {
        const imageSrc = record.images && record.images.length > 0 ? record.images[0] : text; // Hiển thị ảnh shop nếu có
        return (
          <img src={imageSrc} alt='Avatar' style={{ width: 50, height: 50, borderRadius: '50%' }} />
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => (
        // Kiểm tra nếu có shopEmail thì hiển thị, nếu không thì hiển thị email của người dùng
        <span>{record.shopEmail ? record.shopEmail : text}</span>
      ),
    },
    {
      title: 'Name',
      // Kiểm tra nếu có shopName thì hiển thị, nếu không thì hiển thị userName
      dataIndex: 'shopName',
      key: 'shopName',
      render: (text, record) => text || record.userName, // hiển thị shopName nếu có, nếu không hiển thị userName
    },
    {
      title: 'Address',
      dataIndex: 'shopAddress',
      key: 'shopAddress',
      render: (text, record) => {
        if (text) {
          return text; // If shopAddress exists, return it.
        }
        // Check if record.address is an array and not undefined.
        return Array.isArray(record.address) ? record.address.join(',') : 'No address available';
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (roles) =>
        Array.isArray(roles) && roles.length > 0 ? (
          roles.map((role, index) => (
            <span key={role._id}>
              {role.name}
              {index < roles.length - 1 && ', '}
            </span>
          ))
        ) : (
          <span>Shop</span> // Hoặc giá trị mặc định khác nếu không có roles
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type={record.isLocked ? 'danger' : 'primary'}
          onClick={() => handleStatusChange(record._id, !record.isActive)}
        >
          {record.isActive ? <LockOutlined /> : <UnlockOutlined />}
          {record.isActive ? ' Lock' : ' Unlock'}
        </Button>
      ),
    },
  ];

  return (
    <Content style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Input
          placeholder='Search by keyword...'
          value={searchKeyword}
          onChange={handleSearchChange} // Gọi hàm handleSearchChange tại đây
          style={{ width: '300px', marginRight: '10px' }}
        />
        <Select defaultValue='' style={{ width: '200px' }} onChange={handleRoleChange}>
          <Option value=''>All Accounts</Option>
          <Option value='Shop-'>Shop</Option>
          <Option value='Shop-false'>Shop Locked</Option>
          <Option value='Shop-true'>Shop Unlocked</Option>
          <Option value='Customer-'>Customer</Option>
          <Option value='Customer-false'>Customer Locked</Option>
          <Option value='Customer-true'>Customer Unlocked</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={Array.isArray(userList) ? userList : []}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </Content>
  );
};

export default AccountManager;
