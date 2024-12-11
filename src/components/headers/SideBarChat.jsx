import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Drawer, Button } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import chatApi from "../../hooks/useChatApi";
import { div } from "framer-motion/client";

const SideBarChat = () => {
    const { id, name } = useParams();
    const [contacts, setContacts] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const fetchHistoryChat = async () => {
        try {
            const response = await chatApi.getAllChats(id);
            if (response.status === 200) {
                const contactList = response.data.chats.map((chat) => {
                    const allMessages = [...chat.customerMessages, ...chat.shopMessages];
                    const sortedMessages = allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                    const lastMessage = sortedMessages.length > 0 ? sortedMessages[sortedMessages.length - 1].content : "No messages yet";

                    return {
                        id: chat._id,
                        name: chat.otherInfo?.name || "Unknown",
                        message: lastMessage,
                        avartar: chat.otherInfo?.avartar || "https://via.placeholder.com/150",
                    };
                });
                setContacts(contactList);
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

    const ContactList = () => (
        <div className="overflow-y-auto h-screen p-3">
            {contacts.map((contact) => (
                <NavLink
                    to={`/shop/${name}/chat/${id}/${contact.id}`}
                    key={contact.id}
                    onClick={() => isMobile && setDrawerVisible(false)} // Đóng Drawer khi ở mobile
                >
                    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img
                                src={contact.avartar}
                                alt={`${contact.name}'s Avatar`}
                                className="w-12 h-12 rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-black-2">{contact.name}</h2>
                            <p className="text-gray-600 text-lg">{contact.message}</p>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    );

    return (
        <div>
            {/* Mobile Menu Button */}
            {isMobile && (
                <div className="fixed top-4 left-4 z-50">
                    <Button
                        type="primary"
                        icon={<MenuUnfoldOutlined />}
                        onClick={() => setDrawerVisible(true)}
                    />
                </div>
            )}

            {/* Desktop Sidebar */}
            {!isMobile && (
                <div className="w-60 bg-white border-r border-gray-300">
                    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-[#EEE5DA]">
                        <h1 className="text-2xl font-bold text-black-2 ml-6">History Chat</h1>
                    </header>
                    <ContactList />
                </div>
            )}

            {/* Mobile Drawer */}
            {isMobile && (

                <Drawer
                    title="History Chat"
                    placement="left"
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    bodyStyle={{ padding: 0 }}
                >
                    <ContactList />
                </Drawer>

            )}
        </div>
    );
};

export default SideBarChat;
