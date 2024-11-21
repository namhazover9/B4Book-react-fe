import React, { useState } from 'react';
import SideBarAdmin from '../components/headers/SideBarAdmin';

export default function AdminLayout({ children }) {
  return (
    <div className='m-4 font-cairoRegular flex'>
      <SideBarAdmin />
      {children}
    </div>
  );
}
