import React from 'react';
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Text, useColorModeValue } from '@chakra-ui/react';
import "jspdf-autotable";

import 'moment-precise-range-plugin';
import Moment from 'moment';
import moment from 'moment';
import { customStyles } from '../../../../../helpers/customStyle';

export default function ReporteTiempos({ reportes }) {

	const DiferenciaDosFechas = (fechaInicio, fechaFinal) => {
		const fecha1 = moment(fechaInicio);
		const fecha2 = moment(fechaFinal);
		const diferencia = moment.preciseDiff(fecha1, fecha2, true);
		const dias = diferencia['days'];
		const horas = diferencia['hours'];
		const minutos = diferencia['minutes'];
		const segundos = diferencia['seconds'];
		return dias + "d " + horas + "h " + minutos + "m " + segundos + "s";
	}

	const columns = [
		{
			name: 'USUARIO COMUN',
			selector: row => row.usuarioComun?.nombre + ' ' + row.usuarioComun?.apellido,
			sortable: true,
			center: true,
			wrap: true,
			cellExport: row => row.usuarioComun?.nombre + ' ' + row.usuarioComun?.apellido,
		},
		{
			name: 'TÉCNICO',
			selector: row => row.usuarioTecnico !== null ? row.usuarioTecnico?.nombre + ' ' + row.usuarioTecnico?.apellido : 'SIN TÉCNICO ASIGNADO',
			sortable: true,
			wrap: true,
			cellExport: row => row.usuarioTecnico !== null ? row.usuarioTecnico?.nombre + ' ' + row.usuarioTecnico?.apellido : 'SIN TÉCNICO ASIGNADO',
		},
		{
			name: 'FECHA REGISTRO',
			selector: row => Moment(row.registroPendiente).format("yyyy-MM-DD - HH:mm:ss"),
			sortable: true,
			wrap: true,
			cellExport: row => Moment(row.registroPendiente).format("yyyy-MM-DD - HH:mm:ss"),
		},
		{
			name: 'TRANSCURRIDO',
			selector: row => row.tiempoTranscurridoPendiente ?? '',
			sortable: true,
			right: true,
			cell: row => {
				var dateOne = Moment(row.registroPendiente, "YYYY-MM-DD HH:mm:ss");
				var dateTwo = Moment(row.registroTramitado, "YYYY-MM-DD HH:mm:ss");

				if (row.tiempoTranscurridoPendiente !== null) {
					return (
						<div>
							{DiferenciaDosFechas(dateOne, dateTwo)}
						</div>
					)
				}
			},
			cellExport: row => row.tiempoTranscurridoTramitado !== null ? DiferenciaDosFechas(row.registroPendiente, row.registroTramitado) : '',
		},
		{
			name: 'EN TRÁMITE',
			selector: row => row.registroTramitado !== null ? Moment(row.registroTramitado).format("yyyy-MM-DD - HH:mm:ss") : '',
			sortable: true,
			cellExport: row => row.registroTramitado !== null ? Moment(row.registroTramitado).format("yyyy-MM-DD - HH:mm:ss") : '',
		},
		{
			name: 'TRANSCURRIDO',
			selector: row => row.tiempoTranscurridoTramitado ?? '',
			cell: row => {

				var dateOne = Moment(row.registroTramitado, "YYYY-MM-DD HH:mm:ss");
				var dateTwo = Moment(row.registroAtendido, "YYYY-MM-DD HH:mm:ss");

				if (row.tiempoTranscurridoTramitado !== null) {
					return (
						<div>
							{DiferenciaDosFechas(dateOne, dateTwo)}
						</div>
					)
				}
			},
			sortable: true,
			right: true,
			cellExport: row => row.tiempoTranscurridoTramitado !== null ? DiferenciaDosFechas(row.registroTramitado, row.registroAtendido) : '',
		},
		{
			name: 'ATENDIDO',
			selector: row => row.registroAtendido !== null ? Moment(row.registroAtendido).format("yyyy-MM-DD - HH:mm:ss") : '',
			sortable: true,
			cellExport: row => row.registroAtendido !== null ? Moment(row.registroAtendido).format("yyyy-MM-DD - HH:mm:ss") : '',
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
		<DataTableExtensions
			columns={columns}
			data={reportes}
			print={false}
			filterPlaceholder="BUSCAR"
			fileName={'REPORTE_POR_TIEMPO'}
		>
			<DataTable
				defaultSortAsc={false}
				pagination
				paginationPerPage={10}
				paginationRowsPerPageOptions={[10, 15, 20, 30]}
				theme={useColorModeValue('default', 'solarized')}
				responsive={true}
				noDataComponent={
					<Text fontSize="sm" py={16} textAlign="center" color="gray.600">
						NO HAY DATOS PARA MOSTRAR, REFRESCAR LA TABLA
					</Text>
				}
				customStyles={customStyles}
			/>
		</DataTableExtensions>
	);
}