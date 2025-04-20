import React, { useState, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

export default function DemandaPorDias() {
  const [dias, setDias] = useState(null);
  const [data, setData] = useState([]);
  const toast = useRef(null);

  const opciones = [
    { label: '15 días', value: 15 },
    { label: '30 días', value: 30 },
    { label: '60 días', value: 60 }
  ];

  const fetchData = async () => {
    if (!dias) return;
    try {
      const res = await axios.get(`http://localhost:8000/api/demanda?range=${dias}`); // Dejo la url aproposito para facilidad de pruebas, se debería meter en un .env
      setData(res.data);
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
  const puedeBuscar = !!dias;

  return (
    <div className="card" style={{ maxWidth: '90%', margin: '0 auto', padding: '2rem' }}>
      <Toast ref={toast} />
      <h3 style={{ textAlign: 'center' }}>Filtrar por Rango de Días</h3>

      <div className="p-grid p-ai-center p-mb-3" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div className="p-col-12 p-md-4">
          <Dropdown value={dias} options={opciones} onChange={(e) => setDias(e.value)} placeholder="Seleccione días" className="w-full" />
        </div>
        <div className="p-col-12 p-md-2">
          <Button label="Buscar" onClick={fetchData} className="mt-2" icon="pi pi-search" disabled={!puedeBuscar} />
        </div>
        <div className="p-col-12 p-md-2 mt-2">
          <Button label="Exportar" icon="pi pi-file-excel" className="p-button-success" onClick={exportarExcel} disabled={!puedeExportar} />        
        </div>
      </div>

      <DataTable 
        value={data} 
        paginator 
        rows={16} 
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
