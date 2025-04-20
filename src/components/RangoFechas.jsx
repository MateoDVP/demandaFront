import React, { useState, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

export default function DemandaPorFechas() {
  const [range, setRange] = useState(null);
  const [data, setData] = useState([]);
  const toast = useRef(null);
  const today = new Date();

  const fetchData = async () => {
    if (!range || range.length !== 2) return;
    const [start, end] = range.map(d => d.toISOString().split('T')[0]);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/demanda/por-fechas?start_date=${start}&end_date=${end}` // Dejo la url aproposito para facilidad de pruebas, se debería meter en un .env
      );
      if (res.data.message) {
        toast.current.show({ severity: 'info', summary: 'Sin datos', detail: res.data.message });
        setData([]);
      } else {
        setData(res.data);
      }
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: err.response?.data?.detail || err.message });
    }
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    XLSX.writeFile(workbook, 'datos.xlsx');
  };

  const puedeExportar = data.length > 0;
  const puedeBuscar = !!range

  return (
    <div className="card" style={{ maxWidth: '90%', margin: '0 auto', padding: '2rem' }}>
      <Toast ref={toast} />
      <h3 style={{ textAlign: 'center' }}>Filtrar por Rango de Fechas</h3>

      <div className="p-grid p-ai-center p-mb-3" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
        <div className="p-col-12 p-md-4" style={{ maxWidth: '300px' }}>
          <Calendar
            value={range}
            onChange={(e) => setRange(e.value)}
            selectionMode="range"
            readOnlyInput
            showIcon
            maxDate={today}
            className="w-full"
            placeholder='Seleccione rango de fechas'
          />
        </div>
        <div className="p-col-12 p-md-2" style={{ maxWidth: '120px' }}>
          <Button label="Buscar" onClick={fetchData} className="w-full mt-2" icon="pi pi-search" disabled={!puedeBuscar} />
        </div>
        <div className="p-col-12 p-md-2 mt-2">
          <Button label="Exportar" icon="pi pi-file-excel" className="p-button-success" onClick={exportarExcel} disabled={!puedeExportar} />
        </div>
      </div>

      <DataTable
        value={data}
        paginator
        rows={10}
        emptyMessage="No hay datos disponibles"
        style={{ marginTop: '2rem' }}
        className="p-datatable-gridlines"
      >
        <Column field="Date" header="Fecha" headerStyle={{ textAlign: 'center' }} style={{ textAlign: 'center' }} />
        <Column field="Value" header="Valor" headerStyle={{ textAlign: 'center' }} style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
}
