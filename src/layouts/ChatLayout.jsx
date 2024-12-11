import React, { useState } from "react";
import ChatPage from "../pages/SellerRole/ChatPage";
import SideBarChat from "../components/headers/SideBarChat";
import { useEffect } from "react";

const ChatLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <SideBarChat />

            {/* Main Chat Area */}
            <ChatPage />
        </div>
    );
};

export default ChatLayout;
