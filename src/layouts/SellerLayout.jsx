import React, { useState } from 'react';
import SideBarSeller from '../components/headers/SideBarSeller';
import SellerPage from '../pages/SellerRole/SellerPage';

export default function SellerLayout({ children }) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Đổi trạng thái open
  };

  return (
    <div className='m-2 rounded-lg font-cairoRegular flex flex-col lg:flex-row bg-[#e6dbcd]'>
      <SideBarSeller onToggle={handleToggleSidebar} isOpen={isSidebarOpen} />
      <div className={`duration-300 ${isSidebarOpen ? 'w-full lg:w-4/5 xl:w-5/6' : 'w-full lg:w-11/12'}`}>
        {/* <SellerPage /> */}
        {children}
      </div>
    </div>
  );
}
