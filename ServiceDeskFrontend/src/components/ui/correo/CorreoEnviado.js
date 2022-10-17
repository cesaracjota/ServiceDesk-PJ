import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { useColorModeValue } from '@chakra-ui/react';
import { store } from '../../../store/store';
import CorreoDetalles from './CorreoDetalles';

const columns = [
	{
		name: 'DESTINATARIO',
		selector: row => row.to.nombre + ' ' + row.to.apellido,
		sortable: true,
	},
	{
		name: 'CORREO',
		selector: row => row.to.correo,
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

export const CorreoEnviado = () => {

	const data = store.getState().correoEnviado.rows;

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
			/>
		</DataTableExtensions>
	);
};