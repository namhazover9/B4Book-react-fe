import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import chatApi from '../../hooks/useChatApi';
import { Drawer, Button } from "antd";
import { MenuUnfoldOutlined } from '@ant-design/icons';

const SideBarChat = () => {
  const { id, name } = useParams(); // Lấy user ID từ URL params
  const [contacts, setContacts] = useState([]); // Lưu danh sách liên lạc
  const [role, setRole] = useState(null); // Lưu role (customer hoặc shop)
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const fetchHistoryChat = async () => {
    try {
      const response = await chatApi.getAllChats(id); // Fetch dữ liệu từ API
      if (response.status === 200) {
        // Map dữ liệu để lấy thông tin cần thiết
        const contactList = response.data.chats.map((chat) => {
          // Hợp nhất các tin nhắn từ customerMessages và shopMessages
          const allMessages = [...chat.customerMessages, ...chat.shopMessages];
          // Sắp xếp tin nhắn theo timestamp
          const sortedMessages = allMessages.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
          );
          // Lấy tin nhắn cuối cùng
          const lastMessage =
            sortedMessages.length > 0
              ? sortedMessages[sortedMessages.length - 1].content
              : 'No messages yet';
          return {
            id: chat._id,
            name: chat.otherInfo?.name || 'Unknown',
            message: lastMessage,
            avartar:
              chat.otherInfo?.type === 'shop'
                ? chat.otherInfo?.avartar[0] || 'https://via.placeholder.com/150'
                : chat.otherInfo?.avartar || 'https://via.placeholder.com/150',
            role: chat.otherInfo?.type,
          };
        });
        setContacts(contactList); // Cập nhật state với danh sách liên lạc

        // Cập nhật role dựa trên dữ liệu trả về
        const userRole = contactList[0]?.role// Mặc định là customer nếu không có type
       if (userRole === 'shop') {
        setRole('customer');
       }else{ // Cập nhật state role}
        setRole("shop");
      }
    }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistoryChat();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
  };
  window.addEventListener("resize", handleResize);

  return () => {
      window.removeEventListener("resize", handleResize);
  };
  }, [id]);

  // Hàm để xác định URL quay lại tùy theo role
  const handleBackNavigation = () => {
    console.log(role);
    if (role === 'shop') {
        navigate(`/shop/${name}/profile/${id}`);
    } else if (role === 'customer') {
        navigate(`/`);
    }
  };

  return (
    <div className='w-1/4 bg-white border-r border-gray-300'>
      {/* Sidebar Header */}
      <header className='p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white'>
        <h1 className='text-2xl font-semibold'>Chat Web</h1>
        <button
          onClick={handleBackNavigation}
          className='px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300'
        >
          Back
        </button>
      </header>

      {/* Contact List */}
      <div className='overflow-y-auto h-screen p-3 mb-9 pb-20'>
        {contacts.map((contact) => (
          <NavLink to={`/${name}/chat/${id}/${contact.id}`} key={contact.id}  onClick={() => isMobile && setDrawerVisible(false)}>
            <div className='flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md'>
              <div className='w-12 h-12 bg-gray-300 rounded-full mr-3'>
                <img
                  src={contact.avartar}
                  alt={`${contact.name}'s Avatar`}
                  className='w-12 h-12 rounded-full'
                />
              </div>
              <div className='flex-1'>
                <h2 className='text-lg font-semibold'>{contact.name}</h2>
                <p className='text-gray-600'>{contact.message}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
    
  );
};

export default SideBarChat;
