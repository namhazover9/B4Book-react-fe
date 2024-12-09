import React, { useState } from "react";
import { Input, Button } from "antd";

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { sender: "Alice", content: "Hey Bob, how's it going?", type: "incoming" },
        { sender: "Me", content: "Hi Alice! I'm good, just finished a great book.", type: "outgoing" },
        // Add more messages here...
    ]);

    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { sender: "Me", content: input, type: "outgoing" }]);
            setInput("");
        }
    };

    return (
        <div className="flex-1 relative">
            {/* Chat Header */}
            <header className="bg-white p-4 text-gray-700 border-b border-gray-300">
                <h1 className="text-2xl font-semibold">Alice</h1>
            </header>

            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-36">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex mb-4 ${message.type === "outgoing" ? "justify-end" : ""}`}
                    >
                        {message.type === "incoming" && (
                            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                <img
                                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                            </div>
                        )}
                        <div
                            className={`flex max-w-96 rounded-lg p-3 gap-3 ${message.type === "outgoing" ? "bg-indigo-500 text-white" : "bg-white text-gray-700"
                                }`}
                        >
                            <p>{message.content}</p>
                        </div>
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
