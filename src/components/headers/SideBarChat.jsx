import React, { useState } from "react";
import { Dropdown, Menu, Button } from "antd";

const SideBarChat = () => {
    const contacts = [
        { name: "Alice", message: "Hoorayy!!", avatar: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" },
        { name: "Martin", message: "That pizza place was amazing! 🍕", avatar: "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" },
        // Add more contacts here...
    ];
    console.log(contacts); // Đảm bảo danh sách contacts tồn tại và không rỗng


    const menu = (
        <Menu>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
        </Menu>
    );

    return (
        <div className="w-1/4 bg-white border-r border-gray-300">
            {/* Sidebar Header */}
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                <h1 className="text-2xl font-semibold">Chat Web</h1>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button shape="circle" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" /></svg>} />
                </Dropdown>
            </header>

            {/* Contact List */}
            <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
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
    );
};

export default SideBarChat;
