import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd"; // Import Drawer component từ Ant Design

const SideBarChat = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const contacts = [
        { name: "Alice", message: "Hoorayy!!", avatar: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" },
        { name: "Martin", message: "That pizza place was amazing! 🍕", avatar: "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" },
        // Add more contacts here...
    ];

    return (
        <div className="relative h-screen">
            {/* Menu Header */}
            <div className="menu-header p-4 h-14 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                {/* Title */}
                <h1 className="text-2xl font-semibold">History Chat</h1>

                {/* Menu Button: Chỉ ẩn nút này trên màn hình lớn */}
                <button
                    className="lg:hidden" // Ẩn nút trên màn hình lớn (lg) và hiển thị trên các màn hình nhỏ
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <MenuOutlined className="text-xl" />
                </button>
            </div>

            {/* Drawer Component from Ant Design: Chỉ hiển thị trên màn hình nhỏ hơn lg */}
            <Drawer
                title="Contacts"
                placement="left"
                closable={false}
                onClose={() => setIsMenuOpen(false)}
                visible={isMenuOpen}
                width={280}
            >
                <div className="contact-list overflow-y-auto p-3">
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
                            className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                        >
                            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                <img
                                    src={contact.avatar}
                                    alt={`${contact.name}'s Avatar`}
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{contact.name}</h2>
                                <p className="text-gray-600">{contact.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Drawer>

            {/* Sidebar: Luôn hiển thị trên màn hình lớn */}
            <div
                className={`lg:block ${isMenuOpen ? "block" : "hidden"} lg:w-64 bg-white border-r border-gray-300 h-full p-4`}
            >
                {/* Contact List */}
                <div className="contact-list overflow-y-auto">
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
                            className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                        >
                            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                <img
                                    src={contact.avatar}
                                    alt={`${contact.name}'s Avatar`}
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{contact.name}</h2>
                                <p className="text-gray-600">{contact.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBarChat;
