import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
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
                    name:participants.shop.name
                })),
            ];
            
            // Sắp xếp tin nhắn theo thời gian
            formattedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            setMessages(formattedMessages);
        } catch (error) {
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
    

    return (
        <div className="flex-1 relative">
            {/* Chat Header */}
            <header className="bg-white p-4 text-gray-700 border-b border-gray-300">
                <h1 className="text-2xl font-semibold">{getOtherParticipantName()}</h1>
            </header>

            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-36">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex mb-4 ${
                            message.senderId === id ? "justify-end" : "justify-start"
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
                            className={`max-w-96 rounded-lg p-3 ${
                                message.senderId === id
                                    ? "bg-indigo-500 text-white"
                                    : "bg-gray-100 text-gray-700"
                            }`}
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
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
                <div className="flex items-center">
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full rounded-md"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onPressEnter={handleSend}
                    />
                    <Button className="ml-2" type="primary" onClick={handleSend}>
                        Send
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default ChatPage;
