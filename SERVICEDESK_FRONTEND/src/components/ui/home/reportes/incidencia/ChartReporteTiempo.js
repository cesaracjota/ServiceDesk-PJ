import React from 'react';
import Highcharts from 'highcharts';
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';

import Bellcurve from "highcharts-react-official";
import ColumnChart from "highcharts-react-official";
// import PieChart from "highcharts-react-official";
// import AreaChart from "highcharts-react-official";
// import LineChart from "highcharts-react-official";

require("highcharts/modules/exporting.js")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);

const ChartReporteTiempo = ({ reportes }) => {

  var nombreTecnicos = reportes.map(item => {
    return item.usuarioTecnico?.nombre
  })

  const promedioMinutos = reportes?.map((reporte) => {
    let tiempoR = moment(reporte?.registroPendiente);
    let tiempoA = moment(reporte?.registroAtendido);
    let tiempoDiferencia = tiempoA.diff(tiempoR, 'minutes');
    return tiempoDiferencia;
  });

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

  const ChartMinutos = {
    chart: {
      backgroundColor: useColorModeValue('white', '#1A202C'),
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'bellcurve',
    },
    title: {
      text: 'MINUTOS QUE SE DEMORA UN TECNICO EN ATENDER UNA INCIDENCIA'
    },
    xAxis: [{
      title: {
        text: 'TECNICOS'
      },
      type: 'category',
      categories: nombreTecnicos.slice(0, 10),
      alignTicks: false
    }],
    yAxis: [{
      title: {
        text: 'MINUTOS'
      },
      type: 'linear',
      alignTicks: false
    }],
    series: {
      name: 'MINUTOS QUE SE DEMORA',
      data: promedioMinutos.slice(0, 10),
      exporting: {
        showTable: false,
      },
    }
  }

  const ChartHoras = {
    chart: {
      backgroundColor: useColorModeValue('white', '#1A202C'),
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'bellcurve',
    },
    title: {
      text: 'HORAS QUE SE DEMORA UN TECNICO EN ATENDER UNA INCIDENCIA'
    },
    xAxis: [{
      title: {
        text: 'TECNICOS'
      },
      type: 'category',
      categories: nombreTecnicos.slice(0, 10),
      alignTicks: false
    }],
    yAxis: [{
      title: {
        text: 'HORAS'
      },
      type: 'linear',
      alignTicks: false
    }],
    series: {
      name: 'CUANTAS HORAS SE DEMORA',
      data: promedioHoras.slice(0, 10),
      exporting: {
        showTable: false,
      },
    }
  }

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

  return (
    <SimpleGrid spacing={4}>
      <Box h="100%" borderRadius="md" boxShadow="md">
        <Bellcurve
          title="MINUTOS QUE SE DEMORA UN TECNICO EN ATENDER UNA INCIDENCIA"
          highcharts={Highcharts}
          options={ChartMinutos}
        />
      </Box>
      <Box h="100%" borderRadius="md" boxShadow="md">
        <Bellcurve
          title="HORAS QUE SE DEMORA UN TECNICO EN ATENDER UNA INCIDENCIA"
          highcharts={Highcharts}
          options={ChartHoras}
        />
      </Box>
      <Box h="100%" borderRadius="md" boxShadow="md">
        <Bellcurve
          title="DIAS QUE SE DEMORA UN TECNICO EN ATENDER UNA INCIDENCIA"
          highcharts={Highcharts}
          options={ChartDias}
        />
      </Box>
      <Box h="100%" borderRadius="md" boxShadow="md">
        <ColumnChart
          highcharts={Highcharts}
          options={VariablePie}
        />
      </Box>
    </SimpleGrid>
  );
}

export default ChartReporteTiempo;