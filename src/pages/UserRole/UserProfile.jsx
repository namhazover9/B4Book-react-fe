import React, { useEffect, useState } from 'react';
import userApi from '../../hooks/userApi';
import { Button, Card, Col, Input, List, Progress, Row, Typography, Radio, message } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { u } from 'framer-motion/client';
const { Title, Text } = Typography;

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null); // Khởi tạo userInfo null để phân biệt trạng thái đang tải
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [originalUserInfo, setOriginalUserInfo] = useState(null);
  const hasChanges = JSON.stringify(userInfo) !== JSON.stringify(originalUserInfo);
  const [saving, setSaving] = useState(false);
  const handleInputChange = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
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
    return <div>Loading...</div>; // Hoặc thêm spinner/loading animation
  }

  if (!userInfo) {
    return <div>Error loading user data</div>;
  }

  return (
    <section className='bg-gray-100 p-5 sm:p-6 lg:p-10'>
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

              <Title level={4}>{userInfo.userName}</Title>
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
                    text: 'mdbootstrap',
                  },
                  {
                    icon: <InstagramOutlined className='text-pink-600' />,
                    text: 'mdbootstrap',
                  },
                  {
                    icon: <TwitterOutlined className='text-blue-400' />,
                    text: 'mdbootstrap',
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
            <Card className='mb-4 h-80'>
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
                    value={userInfo.address.street + ', ' + userInfo.address.city + ', ' + userInfo.address.country }
                    onChange={(e) => handleInputChange('address', e.target.value)}
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
                <span className='text-blue-500 text-3xl'>Achievements 🏆</span>
              </Title>
              <Text strong className='text-base'>
                Expenditure 🤑
              </Text>
              <Progress percent={80} />
              <Text strong className='text-base'>
                Orders
              </Text>
              <Progress percent={72} />
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
