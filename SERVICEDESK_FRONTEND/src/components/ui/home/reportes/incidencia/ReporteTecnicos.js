import React from 'react';
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useColorModeValue } from '@chakra-ui/react';

export default function ReporteTecnicos({ reportes }) {
  
	const columns = [
		{
			name: 'TECNICO',
			selector: row => row.usuario?.nombre + ' ' + row.usuario?.apellido,
			sortable: true,
			cellExport: row => (row.usuario?.nombre + ' ' + row.usuario?.apellido),
		},
		{
			name: 'PENDIENTES',
			selector: row => row.pendientes,
			sortable: true,
			center: true,
			cellExport: row => row.pendientes,
		},
		{
			name: 'EN TRAMITE',
			selector: row => row.tramitadas,
			sortable: true,
			center: true,
			cellExport: row => row.tramitadas,
		},
		{
			name: 'ATENDIDOS',
			selector: row => row.atendidas,
			sortable: true,
			center: true,
			cellExport: row => row.atendidas,
		},
		{
			name: 'TOTAL',
			selector: row => row.total,
			sortable: true,
			center: true,
			cellExport: row => row.total,
		},
	];

  
	// CREANDO UN TEMA PARA LA TABLA
	createTheme('solarized', {
	  text: {
		primary: '#FFF',
		secondary: '#FFF',
	  },
	  background: {
		default: '#171923',
	  },
	  context: {
		background: '#171923',
		text: '#FFF',
	  },
	  divider: {
		default: '#FFF opacity 92%',
	  },
	});
  
	return (
		<DataTableExtensions columns={columns} data={reportes} print={false}>
 			<DataTable
				pagination
				paginationPerPage={10}
				paginationRowsPerPageOptions={[10, 15, 20, 30]}
				theme={useColorModeValue('default', 'solarized')}
				responsive={true}
			/>
		</DataTableExtensions>
	);
  }