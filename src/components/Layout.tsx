import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto my-12 flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
