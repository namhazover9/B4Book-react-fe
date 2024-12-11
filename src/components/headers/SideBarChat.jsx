import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import chatApi from '../../hooks/useChatApi';
import { Drawer, Button } from "antd";
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const SideBarChat = () => {
    const { id, name } = useParams(); // Lấy user ID từ URL params
    const [contacts, setContacts] = useState([]); // Lưu danh sách liên lạc
    const [role, setRole] = useState(null); // Lưu role (customer hoặc shop)
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const userId = useSelector((state) => state.user._id);
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
                    setRole('shop');
                } else { // Cập nhật state role}
                    setRole("customer");
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
        if(role === null){
            if(id === userId){
              setRole("customer");
            }else{
              setRole("shop");
            }
           }
        if (role === 'shop') {
            navigate(`/shop/${name}/profile/${id}`);
        } else if (role === 'customer') {
            navigate(`/`);
        }
    };

    return (
        <>
            {isMobile ? (
                <>
                    <Button
                        type="primary"
                        icon={<MenuUnfoldOutlined />}
                        onClick={() => setDrawerVisible(true)}
                        className="fixed top-2 left-2 z-50"
                    />
                    <Drawer
                        placement="left"
                        closable
                        onClose={() => setDrawerVisible(false)}
                        visible={drawerVisible}
                        bodyStyle={{ padding: 0 }}
                        width="60%" // Chỉ chiếm 85% màn hình trên mobile
                    >
                        <SidebarContent
                            contacts={contacts}
                            handleBackNavigation={handleBackNavigation}
                            name={name}
                            id={id}
                            isMobile={isMobile}
                            setDrawerVisible={setDrawerVisible}
                        />
                    </Drawer>
                </>
            ) : (
                <SidebarContent
                    contacts={contacts}
                    handleBackNavigation={handleBackNavigation}
                    name={name}
                    id={id}
                    isMobile={isMobile}
                />
            )}
        </>
    );
};

const SidebarContent = ({ contacts, handleBackNavigation, name, id, isMobile, setDrawerVisible }) => (
    <div
        className={`${isMobile ? 'w-full' : 'w-1/4'
            } bg-white border-r border-gray-300`}
    >
        {/* Sidebar Header */}
        <header className="p-4 h-16 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 className="ml-40 mt-2 text-xl md:text-2xl font-semibold">History Chat</h1>

        </header>

        {/* Contact List */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            {contacts.map((contact) => (
                <NavLink
                    to={`/${name}/chat/${id}/${contact.id}`}
                    key={contact.id}
                    onClick={() => isMobile && setDrawerVisible(false)}
                >
                    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full mr-3">
                            <img
                                src={contact.avartar}
                                alt={`${contact.name}'s Avatar`}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-sm md:text-lg font-semibold">{contact.name}</h2>
                            <p className="text-xs md:text-sm text-gray-600">{contact.message}</p>
                        </div>
                    </div>
                </NavLink>
            ))}
            <button
                onClick={handleBackNavigation}
                className="absolute bottom-4 left-4 px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 text-sm md:text-base"
            >
                Back
            </button>
        </div>
    </div>
);

export default SideBarChat;
