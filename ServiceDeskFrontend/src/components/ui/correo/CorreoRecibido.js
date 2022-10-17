import React from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { useColorModeValue } from '@chakra-ui/react';
import { store } from '../../../store/store';
import CorreoDetalles  from './CorreoDetalles';

const columns = [
	{
		name: 'REMITENTE',
		selector: row => row.from.nombre + ' ' + row.from.apellido,
		sortable: true,
	},
	{
		name: 'CORREO',
		selector: row => row.from.correo,
		sortable: true,
	},
	{
		name: 'ASUNTO',
		selector: row => row.asunto,
		sortable: true,
	},
	{
		name: 'FECHA',
		selector: row => row.fecha,
		sortable: true,
	},
	{
		name: 'ACCIONES',
		sortable: false,
		cell: row => {
		  return (
			<div>
			<CorreoDetalles
			  rowId = {row.idCorreo}
			/>
			</div>
		  );
		},
		center: true,
	},
];

export const CorreoRecibido = () => {

	const data = store.getState().correoRecibido.rows;

	const colorStatusActive = useColorModeValue('black', 'white');
	const colorStatusInactive = useColorModeValue('black', 'white');

	const conditionalRowStyles = [
		{
			when: row => row.activo === 'A',
			style: {
				color: colorStatusActive,
				fontWeight: '600',
			},
		},
		{
			when: row => row.activo === 'N',
			style: {
				color: colorStatusInactive,
			},
		},
	];

	return (
		<DataTableExtensions columns={columns} data={data} print={false} export={false}>
			<DataTable
				pagination
				selectableRows
				persistTableHead
				responsive={true}
				theme={useColorModeValue('default', 'solarized')}
				paginationPerPage={5}
				paginationRowsPerPageOptions={[5, 10, 15, 20, 30]}
				conditionalRowStyles={conditionalRowStyles}
			/>
		</DataTableExtensions>
	);
};