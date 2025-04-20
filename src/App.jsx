import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import RangoDias from './components/RangoDias';
import RangoFechas from './components/RangoFechas';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/demanda-dias" replace />} />  
        <Route path="/demanda-dias" element={<RangoDias />} />
        <Route path="/demanda-fechas" element={<RangoFechas />} />
      </Routes>
    </AppLayout>
  );
}