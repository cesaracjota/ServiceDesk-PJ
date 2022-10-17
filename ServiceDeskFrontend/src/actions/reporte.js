import { fetchToken } from '../helpers/fetch';

// ACTUALIZAR EL ESTADO DE LA INCIDENCIA EN TRÁMITE

export const fetchReporteTecnicos = async (datos) => {

    const response = await fetchToken(`reporte/incidencia/tecnico`,
        {
            startDate: datos.fechaInicio,
            endDate: datos.fechaActual,
            sede: datos.sede[0],
        }, 'POST');
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        const data = await response.json();
        const ReporteTecnicos = {};
        ReporteTecnicos.data = data;
        return ReporteTecnicos;
    }
};

export const fetchReporteUsuario = async (datos) => {
    const response = await fetchToken(`reporte/incidencia/usuario`,
        {
            startDate: datos.fechaInicio,
            endDate: datos.fechaActual,
            sede: datos.sede[0],
        }, 'POST');

    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        const data = await response.json();
        const ReporteUsuario = {};
        ReporteUsuario.data = data;
        return ReporteUsuario;
    }
};

export const fetchReporteTiempo = async (datos) => {

    const response = await fetchToken(`reporte/incidencia/tiempo`,
        {
            startDate: datos.fechaInicio,
            endDate: datos.fechaActual,
            sede: datos.sede[0],
        }, 'POST');

    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        const data = await response.json();
        const ReporteTiempo = {};
        ReporteTiempo.data = data;
        return ReporteTiempo;
    }

};