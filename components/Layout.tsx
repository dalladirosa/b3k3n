import React from 'react';
import { ReactNode } from 'react';

import Navbar from './Navbar';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto lg:my-12 xs:my-4 flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default Layout;
