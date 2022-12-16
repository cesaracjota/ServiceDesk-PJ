import React from 'react';
import Highcharts from 'highcharts';
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';

import Bellcurve from "highcharts-react-official";
import ColumnChart from "highcharts-react-official";
import PieChart from "highcharts-react-official";
// import AreaChart from "highcharts-react-official";
// import LineChart from "highcharts-react-official";

require("highcharts/modules/exporting.js")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);

const ChartReporteTiempo = ({ reportes }) => {

  var nombreTecnicos = reportes.map(item => {
    return item.usuarioTecnico?.nombre
  })

  const promedioHoras = reportes?.map((reporte) => {
    let tiempoR = moment(reporte?.registroPendiente);
    let tiempoA = moment(reporte?.registroAtendido);
    let tiempoDiferencia = tiempoA.diff(tiempoR, 'hours');
    return tiempoDiferencia;
  });

  const promedioDias = reportes?.map((reporte) => {
    let tiempoR = moment(reporte?.registroPendiente);
    let tiempoA = moment(reporte?.registroAtendido);
    let tiempoDiferencia = tiempoA.diff(tiempoR, 'days');
    return tiempoDiferencia;
  });

  let HorasMaximasAtendidas = promedioHoras.sort(function (a, b) {  return a - b; });

  HorasMaximasAtendidas = promedioHoras.slice(Math.max(HorasMaximasAtendidas.length - 10, 0));

  let createDate = reportes.map((reporte) => reporte?.usuarioTecnico?.nombre).slice(0, 10);

  // get total incidencias

  let totalIncidenciasAtendidas = reportes.filter(reporte => reporte.registroAtendido !== null).length;
  let totalIncidenciasNoAtendidas = reportes.filter(reporte => reporte.registroAtendido === null).length;
  let totalIncidenciasTramite = reportes.filter(reporte => reporte.registroTramitado !== null && reporte.registroAtendido === null).length;


  const ChartDias = {
    chart: {
      backgroundColor: useColorModeValue('white', '#1A202C'),
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'bellcurve',
    },
    title: {
      text: 'DIAS QUE SE DEMORA UN TECNICO EN ATENDER UNA INCIDENCIA'
    },
    xAxis: [{
      title: {
        text: 'TECNICOS'
      },
      categories: nombreTecnicos.slice(0, 10),
      type: 'category',
      alignTicks: false
    }],
    yAxis: [{
      title: {
        text: 'DIAS'
      },
      type: 'time',
      alignTicks: true
    }],
    series: {
      name: 'CUANTOS DIAS SE DEMORA',
      data: promedioDias.slice(0, 10),
      exporting: {
        showTable: false,
      },
    }
  }

  const VariablePie = {
    chart: {
      backgroundColor: useColorModeValue('white', '#1A202C'),
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70
      }
    },
    title: {
      text: '10 INCIDENCIAS QUE DEMORARON MÁS HORAS EN SER ATENDIDAS',
      align: 'center'
    },
    plotOptions: {
      column: {
        depth: 25
      }
    },
    xAxis: {
      categories: createDate,
      labels: {
        skew3d: true,
        style: {
          fontSize: '10px'
        }
      }
    },
    yAxis: {
      title: {
        text: 'HORAS (horas en atender una incidencia)',
        margin: 1
      }
    },
    tooltip: {
      valueSuffix: ' HORAS EN ATENDER UNA INCIDENCIA'
    },
    series: [{
      name: 'NOMBRE DE TÉCNICO RESPONSABLE DE ESA INCIDENCIA',
      data: HorasMaximasAtendidas
    }]
  }

  const PieChartCantidadIncidencias = {
    chart: {
      backgroundColor: useColorModeValue('white', '#1A202C'),
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '% DE INCIDENCIAS ATENDIDAS Y NO ATENDIDAS Y TRAMITADAS'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y} incidencias</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [{
      name: 'Incidencias',
      colorByPoint: true,
      data: [
        {
          name: 'Incidencias Atendidas',
          y: totalIncidenciasAtendidas,
          color: '#38a169',
        }, {
          name: 'Incidencias No Atendidas',
          y: totalIncidenciasNoAtendidas,
          color: '#4a5568',
        },
        {
          name: 'Incidencias en Tramite',
          y: totalIncidenciasTramite,
          color: '#d69e2e',
        }
      ],
    }],
  }

  return (
    <SimpleGrid spacing={4}>
      <Box h="100%" borderRadius="md" boxShadow="md">
        <PieChart
          highcharts={Highcharts}
          options={PieChartCantidadIncidencias}
        />
      </Box>
      <Box h="100%" borderRadius="md" boxShadow="md">
        <ColumnChart
          highcharts={Highcharts}
          options={VariablePie}
        />
      </Box>
      <Box h="100%" borderRadius="md" boxShadow="md">
        <Bellcurve
          highcharts={Highcharts}
          options={ChartDias}
        />
      </Box>
    </SimpleGrid>
  );
}

export default ChartReporteTiempo;