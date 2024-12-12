import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Input,
  List,
  message,
  Modal,
  Row,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import userApi from '../../hooks/userApi';
import LoadingSpinner from '../../components/loading';

const { Title, Text } = Typography;

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null); // Khởi tạo userInfo null để phân biệt trạng thái đang tải
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [originalUserInfo, setOriginalUserInfo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', country: '' });
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [currentEditAddress, setCurrentEditAddress] = useState({
    street: '',
    city: '',
    country: '',
  });

  const [editingAddress, setEditingAddress] = useState(null);

  const compareWithoutAddress = (obj1, obj2) => {
    const { address: _, ...rest1 } = obj1 || {};
    const { address: __, ...rest2 } = obj2 || {};
    return JSON.stringify(rest1) === JSON.stringify(rest2);
  };

  const hasChanges = !compareWithoutAddress(userInfo, originalUserInfo);

  const handleOpenNewAddressModal = () => {
    setNewAddress({ street: '', city: '', country: '' }); // Reset dữ liệu khi mở modal
    setIsNewAddressModalOpen(true);
  };

  const handleCloseNewAddressModal = () => {
    setIsNewAddressModalOpen(false);
  };

  const handleOpenEditAddressModal = (address) => {
    setCurrentEditAddress({ ...address }); // Giữ toàn bộ thông tin địa chỉ, bao gồm cả `_id`
    setIsEditAddressModalOpen(true);
  };

  const handleSaveEditAddress = async () => {
    try {
      if (!currentEditAddress.street || !currentEditAddress.city || !currentEditAddress.country) {
        message.error('All fields are required!');
        return;
      }

      // Gọi API cập nhật địa chỉ
      const response = await userApi.updateAddress(currentEditAddress._id, currentEditAddress);

      if (response) {
        message.success('Address updated successfully!');

        // Cập nhật địa chỉ trong state
        const updatedAddresses = addresses.map((addr) =>
          addr._id === currentEditAddress._id ? currentEditAddress : addr,
        );
        setUserInfo({ ...userInfo, address: updatedAddresses });

        setIsEditAddressModalOpen(false); // Đóng modal sau khi lưu
      }
    } catch (error) {
      console.error('Failed to update address:', error);
      message.error('Failed to update address. Please try again.');
    }
  };

  const handleDeleteAddress = async (address) => {
    try {
      // Gọi API xóa địa chỉ
      const response = await userApi.deleteAddress(address._id);

      if (response) {
        message.success('Address deleted successfully!');

        // Cập nhật state sau khi xóa thành công
        const updatedAddresses = addresses.filter((addr) => addr._id !== address._id);
        setUserInfo({ ...userInfo, address: updatedAddresses });
      }
    } catch (error) {
      console.error('Failed to delete address:', error);
      message.error('Failed to delete address. Please try again.');
    }
  };

  const confirmDeleteAddress = (address) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: `Do you really want to delete the address: ${address.street}, ${address.city}, ${address.country}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDeleteAddress(address),
    });
  };

  const handleAddNewAddress = async () => {
    //console.log(newAddress);
    try {
      if (!newAddress.street || !newAddress.city || !newAddress.country) {
        message.error('All fields are required!');
        return;
      }
      const response = await userApi.newAddress(newAddress);

      if (response) {
        message.success('Address added successfully!');

        // Cập nhật địa chỉ mới vào state `userInfo.address`
        setUserInfo((prevUserInfo) => {
          return {
            ...prevUserInfo,
            address: [...prevUserInfo.address, newAddress], // Thêm địa chỉ mới vào danh sách
          };
        });

        handleCloseNewAddressModal(); // Đóng modal sau khi thêm
      }
    } catch (error) {
      console.error('Failed to add new address:', error);
      message.error('Failed to add address. Please try again.');
    }
  };

  const handleInputChange = (key, value) => {
    if (key === 'address') {
      setUserInfo({ ...userInfo, [key]: JSON.parse(value) });
    } else {
      setUserInfo({ ...userInfo, [key]: value });
    }
  };

  const addresses = userInfo?.address || []; // Lấy địa chỉ từ `userInfo`
  const defaultAddress = addresses.length > 0 ? addresses[0] : null;
  {
    addresses.length === 0 && <Text type='secondary'>No addresses available</Text>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Gọi API lấy thông tin người dùng
    const fetchUserProfile = async () => {
      try {
        setLoading(true); // Bắt đầu tải
        const response = await userApi.getUserProfile();
        setOriginalUserInfo(response.data); // Lưu dữ liệu gốc
        setUserInfo(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false); // Kết thúc tải
      }
    };

    fetchUserProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const response = await userApi.updateUserProfile(userInfo); // Gửi dữ liệu lên backend
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userInfo) {
    return <div>Error loading user data</div>;
  }

  return (
    <section className='bg-gradient-to-tl from-[#f8f4ef] to-[#f3eade] p-5 sm:p-6 lg:p-10'>
      <div className='max-w-7xl mx-auto'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8} lg={8}>
            <Card className='text-center mb-4 h-80'>
              <img
                src={userInfo.avartar || 'https://via.placeholder.com/150'} // Hiển thị ảnh mặc định nếu không có avatar
                alt='Avatar'
                width={150}
                className='rounded-full mx-auto mb-5'
              />

              <Title level={4} >{userInfo.userName}</Title>
              <Text type='secondary'>Member</Text>
              <br />
              {/* <Text type='secondary'>{userInfo.address}</Text> */}
            </Card>

            <Card className='h-auto'>
              <List
                className='text-right text-xl'
                itemLayout='horizontal'
                dataSource={[
                  {
                    icon: <FacebookOutlined className='text-blue-700' />,
                    text: 'facebook',
                  },
                  {
                    icon: <InstagramOutlined className='text-pink-600' />,
                    text: 'instagram',
                  },
                  {
                    icon: <TwitterOutlined className='text-blue-400' />,
                    text: 'twitter',
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta avatar={item.icon} title={item.text} />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} md={16} lg={16}>
            <Card className='mb-4 lg:h-80 h-100'>
              <Row gutter={[16, 16]} className='mb-8 mt-4'>
                <Col xs={24} sm={8} className='my-px'>
                  <Text strong>Full Name:</Text>
                </Col>
                <Col xs={24} sm={16}>
                  <Input
                    value={userInfo.userName}
                    onChange={(e) => handleInputChange('userName', e.target.value)}
                  />
                </Col>

                <Col xs={24} sm={8} className='my-px'>
                  <Text strong>Email:</Text>
                </Col>
                <Col xs={24} sm={16}>
                  <Input
                    value={userInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </Col>

                <Col xs={24} sm={8} className='my-px'>
                  <Text strong>Phone:</Text>
                </Col>
                <Col xs={24} sm={16}>
                  <Input
                    value={userInfo.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    maxLength={10} // Giới hạn tối đa 10 ký tự
                    onInput={(e) => {
                      // Chỉ cho phép nhập số
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      handleInputChange('phoneNumber', e.target.value);
                    }}
                  />
                </Col>

                <Col xs={24} sm={8} className='my-px'>
                  <Text strong>Address:</Text>
                </Col>
                <Col xs={24} sm={16}>
                  <Input
                    value={
                      defaultAddress
                        ? `${defaultAddress.street}, ${defaultAddress.city}, ${defaultAddress.country}`
                        : ''
                    }
                    readOnly
                    onClick={handleOpenModal} // Mở modal khi click
                  />
                </Col>

                {hasChanges && (
                  <Button type='primary' onClick={handleSaveProfile} loading={saving}>
                    Save
                  </Button>
                )}
              </Row>
            </Card>

            <Card className='mt-4 h-52'>
              <Title level={5}>
                <span className='text-[#f18966] text-3xl'>Achievements 🏆</span>
              </Title>
              <Text strong className='text-base'>
                Expenditure 🤑
              </Text>
            </Card>
          </Col>
        </Row>
        <Modal
          title='Manage Addresses'
          visible={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key='new' type='primary' onClick={handleOpenNewAddressModal}>
              New Address
            </Button>,
          ]}
        >
          <List
            dataSource={addresses}
            renderItem={(address) => (
              <List.Item
                actions={[
                  <Button key='edit' onClick={() => handleOpenEditAddressModal(address)}>
                    Edit
                  </Button>,
                  <Button key='delete' danger onClick={() => confirmDeleteAddress(address)}>
                    Delete
                  </Button>,
                ]}
              >
                {`${address.street}, ${address.city}, ${address.country}`}
              </List.Item>
            )}
          />
        </Modal>

        <Modal
          title='Add New Address'
          visible={isNewAddressModalOpen}
          onCancel={handleCloseNewAddressModal}
          onOk={handleAddNewAddress}
          okText='Add'
        >
          <Input
            placeholder='Street'
            value={newAddress.street}
            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            className='mb-2'
          />
          <Input
            placeholder='City'
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            className='mb-2'
          />
          <Input
            placeholder='Country'
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
          />
        </Modal>

        <Modal
          title='Edit Address'
          visible={isEditAddressModalOpen}
          onCancel={() => setIsEditAddressModalOpen(false)}
          onOk={handleSaveEditAddress}
          okText='Save'
        >
          <Input
            placeholder='Street'
            value={currentEditAddress.street}
            onChange={(e) =>
              setCurrentEditAddress({ ...currentEditAddress, street: e.target.value })
            }
            className='mb-2'
          />
          <Input
            placeholder='City'
            value={currentEditAddress.city}
            onChange={(e) => setCurrentEditAddress({ ...currentEditAddress, city: e.target.value })}
            className='mb-2'
          />
          <Input
            placeholder='Country'
            value={currentEditAddress.country}
            onChange={(e) =>
              setCurrentEditAddress({ ...currentEditAddress, country: e.target.value })
            }
          />
        </Modal>
      </div>
    </section>
  );
}
