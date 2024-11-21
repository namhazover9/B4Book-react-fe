import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: <Link to='/dashboard'>Dashboard</Link>,
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label: <Link to='/products'>Product</Link>,
  },
  {
    key: '3',
    icon: <ContainerOutlined />,
    label: 'Option 3',
  },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: '5',
        label: 'Option 5',
      },
      {
        key: '6',
        label: 'Option 6',
      },
      {
        key: '7',
        label: 'Option 7',
      },
      {
        key: '8',
        label: 'Option 8',
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '9',
        label: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
      },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          {
            key: '11',
            label: 'Option 11',
          },
          {
            key: '12',
            label: 'Option 12',
          },
        ],
      },
    ],
  },
];

export default function SideBarAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className='flex h-screen select-none'>
      <div className={`transition-all duration-200 ease-in-out ${collapsed ? 'w-16' : 'w-64'}`}>
        <Button onClick={toggleCollapsed} className='mb-4'>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
          inlineCollapsed={collapsed}
          items={items}
          className='h-screen'
        />
      </div>
      <div
        className={`flex-1 transition-all duration-200 ease-in-out ${collapsed ? 'ml-4' : 'ml-18'}`}
      ></div>
    </div>
  );
}
