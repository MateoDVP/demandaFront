import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useState } from 'react';

export default function AppMenu() {
  const [visible, setVisible] = useState(false);

  const menuItems = [
    { label: 'Por Días', icon: 'pi pi-calendar', to: '/demanda-dias' },
    { label: 'Por Fechas', icon: 'pi pi-calendar-plus', to: '/demanda-fechas' }
  ];

  return (
    <>
      <Button
        icon="pi pi-bars"
        className="p-button-text p-m-2"
        onClick={() => setVisible(true)}
      />
      <Sidebar visible={visible} onHide={() => setVisible(false)} position="left">
        <div className="flex flex-column gap-3 p-3">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setVisible(false)}
              className="flex align-items-center gap-2 p-2 border-round hover:bg-gray-200 transition-colors text-color"
              style={{ textDecoration: 'none', fontSize: '1rem', color: 'black' }}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </Sidebar>
    </>
  );
}
