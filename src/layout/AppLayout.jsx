import React from 'react';
import AppMenu from './AppMenu';

export default function AppLayout({ children }) {
  return (
    <div className="p-grid" style={{ minHeight: '100vh' }}>
      <div className="p-col-fixed" style={{ width: '250px', background: '#f4f4f4' }}>
        <AppMenu />
      </div>
      <div className="p-col"> 
        <div className="p-m-4">{children}</div>
      </div>
    </div>
  );
}
