import React, { useEffect, useState } from "react";
import { Input, Button, Dropdown, Menu } from "antd";
import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import chatApi from "../../hooks/useChatApi";
import { useParams } from "react-router-dom";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [participants, setParticipants] = useState({});
    const [input, setInput] = useState("");
    const { chatId, id } = useParams(); // `id` là ID của bạn
    let name;

    const fetchChat = async () => {
        try {
            const response = await chatApi.getChatById(chatId);
            const { customerMessages, shopMessages, participants } = response.data.chat;

            // Lưu thông tin participants
            setParticipants(participants);

            // Gắn role và avatar cho tin nhắn  
            const formattedMessages = [
                ...customerMessages.map((msg) => ({
                    ...msg,
                    senderId: participants.customer.senderId,
                    role: "customer",
                    avatar: participants.customer.avatar,
                    name: participants.customer.name
                })),
                ...shopMessages.map((msg) => ({
                    ...msg,
                    senderId: participants.shop.senderId,
                    role: "shop",
                    avatar: participants.shop.avatar,
                    name: participants.shop.name
                })),
            ];

            // Sắp xếp tin nhắn theo thời gian
            formattedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            setMessages(formattedMessages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchChat();
    }, [chatId]);

    const handleSend = async () => {
        try {
            if (!input.trim()) return;

            const data = {
                content: input,
                senderId: id, // Gửi senderId của người dùng hiện tại
                timestamp: new Date(),
            };

            // Gửi yêu cầu tới API và truyền đúng userId
            await chatApi.sendMessage(chatId, id, data);  // `id` cần phải là userId
            setInput(""); // Xóa nội dung input sau khi gửi
            fetchChat();
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const getOtherParticipantName = () => {
        if (!participants.customer || !participants.shop) return "";
        return participants.customer.senderId === id ? participants.shop.name : participants.customer.name;
    };

    // Danh sách emojis
    const emojiList = ['😊', '😂', '😢', '😡', '😍', '👍', '🎉'];

    // Menu chứa các emoji
    const emojiMenu = (
        <Menu>
            {emojiList.map((emoji, index) => (
                <Menu.Item key={index} onClick={() => setInput((prev) => prev + emoji)}>
                    {emoji}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="flex-1 relative">
            {/* Background Circle */}
            <div
                className="absolute inset-0 flex justify-center items-center"
                style={{
                    zIndex: '-1', // Đưa hình tròn ra phía sau nội dung
                }}
            >
                <div
                    className="w-150 h-150 rounded-full bg-cover opacity-30"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dmyfiyug9/image/upload/v1733819443/lgbf_qyw8ac.png')`,
                        filter: 'blur(1px)', // Làm mờ hình ảnh
                    }}
                ></div>
            </div>

            {/* Chat Header */}
            <header className="bg-white p-4 h-16 text-gray-700 border-b border-gray-300 text-center">
                <h1 className="text-2xl font-semibold text-black-2">{getOtherParticipantName()}</h1>
            </header>

            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-36 lg:text-xl">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex mb-4 ${message.senderId === id ? "justify-end" : "justify-start"
                            }`}
                    >
                        {/* Avatar hiển thị bên trái cho người khác */}
                        {message.senderId !== id && (
                            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                <img
                                    src={message.avatar}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                            </div>
                        )}

                        {/* Tin nhắn */}
                        <div
                            className={`max-w-96 rounded-lg p-3 ${message.senderId === id
                                ? "bg-[#679089] text-white"
                                : "bg-gray-100 text-gray-700"
                                }`}
                            style={{
                                wordBreak: 'break-word', // Tự động xuống dòng khi từ quá dài
                                whiteSpace: 'pre-wrap', // Giữ nguyên định dạng dòng nếu có xuống dòng thủ công
                            }}
                        >
                            <p>{message.content}</p>
                        </div>

                        {/* Avatar hiển thị bên phải cho chính bạn */}
                        {message.senderId === id && (
                            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                <img
                                    src={message.avatar}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full h-20">
                <div className="flex items-center">
                    <Dropdown overlay={emojiMenu} trigger={['click']}>
                        <Button className="mr-2" icon={<SmileOutlined />} />
                    </Dropdown>
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full rounded-md h-10"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onPressEnter={handleSend}
                    />
                    <Button className="ml-2 bg-[#679089] h-10 w-14" type="primary" onClick={handleSend}>
                        <SendOutlined />
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default ChatPage;
