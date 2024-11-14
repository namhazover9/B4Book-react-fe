import React from 'react';
import { Select } from 'antd';
import { languages } from '../constants/constants';
import Translate from '../components/Common/Translate';
import { useLocalization } from '../context/LocalizationWrapper';
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

export default function Header() {
    const { switchLocale } = useLocalization();

    const handleChange = (value) => {
        switchLocale(value);
    };

    return (
        <header className="bg-white shadow-md w-full py-4">
            <div className="container mx-auto flex items-center justify-between px-6">
                {/* Left side - Logo and main navigation */}
                <div className="flex items-center space-x-8">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-red-500">
                        Bookory
                    </div>

                    {/* Main Navigation */}
                    <nav className="flex space-x-6 text-gray-700">
                        <a href="#" className="hover:text-red-500"><Translate text="Home" /></a>
                        <a href="#" className="hover:text-red-500"><Translate text="Shop" /></a>
                        <a href="#" className="hover:text-red-500"><Translate text="Vendor" /></a>
                        <a href="#" className="hover:text-red-500"><Translate text="Pages" /></a>
                        <a href="#" className="hover:text-red-500"><Translate text="Blog" /></a>
                        <a href="#" className="hover:text-red-500"><Translate text="Contact" /></a>
                    </nav>
                </div>

                {/* Right side - Search bar, icons, and language switch */}
                <div className="flex items-center space-x-4">
                    {/* Search bar */}
                    <div className="flex items-center border rounded-full px-3 py-1 bg-gray-100">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="outline-none bg-transparent text-gray-700 placeholder-gray-500 w-48"
                        />
                        <SearchOutlined className="text-red-500 cursor-pointer" />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-4 text-gray-700">
                        <a href="#" className="relative">
                            <HeartOutlined />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">29</span>
                        </a>
                        <a href="#">
                            <ShoppingCartOutlined />
                        </a>
                        <a href="#">
                            <UserOutlined />
                        </a>
                    </div>

                    {/* Language Selector */}
                    <Select
                        defaultValue={localStorage.getItem('locale') ?? 'en'}
                        onChange={handleChange}
                        options={languages}
                        style={{ width: 120 }}
                    />
                </div>
            </div>

            {/* Secondary navigation row */}
            <div className="bg-gray-100 py-2">
                <div className="container mx-auto flex items-center justify-between px-6">
                    {/* Categories dropdown */}
                    <div className="flex items-center text-gray-700 space-x-2">
                        <button className="bg-red-500 text-white rounded-full px-4 py-1">
                            <Translate text="Categories" />
                        </button>
                    </div>

                    {/* Contact */}
                    <div className="text-gray-700">
                        <Translate text="24/7 Support Center" />: +1 840 - 841 25 69
                    </div>
                </div>
            </div>
        </header>
    );
}
