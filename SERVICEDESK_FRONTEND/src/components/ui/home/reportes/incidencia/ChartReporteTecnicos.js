import React from 'react'
import Highcharts from 'highcharts'
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'

import Bellcurve from "highcharts-react-official";
import BarChart from "highcharts-react-official";
import ColumnChart from "highcharts-react-official";
import PieChart from "highcharts-react-official";
import AreaChart from "highcharts-react-official";

require("highcharts/modules/exporting.js")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);

const ChartReporteTecnicos = ({ reportes, nombreTecnicos }) => {

  const data = reportes
  var pendientes = data.map(item => item.pendientes)
  var atendidas = data.map(item => item.atendidas)
  var tramitadas = data.map(item => item.tramitadas)
  var total = data.map(item => item.total)

  const BellcurveOptions = {
    chart: {
      backgroundColor: useColorModeValue('white', '#1A202C'),
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'bellcurve',
    },
    title: {
      text: 'TOTAL INCIDENCIAS POR TÉCNICO'
    },
    xAxis: [{
      title: {
        text: 'Tecnicos'
      },
      type: 'category',
      alignTicks: false
    }],
    yAxis: [{
      title: { 
        text: 'Incidencias' 
      },
      type: 'category',
      alignTicks: false
    }],
    series: {
      name: 'Total Incidencias',
      data: data.map(item => {
        return {
          name: item.usuario?.nombre,
          y: item.total
        }
      }),
      exporting: {
        showTable: false,
      },
    }
  }

  const BarOptions = {
    chart: {
      backgroundColor: useColorModeValue('white', '#1A202C'),
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'bar',
    },
    title: {
      text: 'CHARTS DE BARRAS POR TÉCNICO'
    },
    subtitle: {
      text: 'Source: <a href="#">Más Detalles</a>'
    },
    xAxis: {
      categories: nombreTecnicos,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Cantidad de Incidencias'
      }
    },
    series: [
      {
        name: 'Pendientes',
        data: data.map(item => item.pendientes),
        color: '#e53e3e'
      },
      {
        name: 'En Tramite',
        data: data.map(item => item.tramitadas),
        color: '#d69e2e'
      },
      {
        name: 'Atendidas',
        data: data.map(item => item.atendidas),
        color: '#38a169'
      },
      {
        name: 'Total',
        data: data.map(item => item.total),
        color: '#4a5568'
      },
    ],
    exporting: {
      showTable: false,
    },
  }

  const PieOptions = {
    chart: {
      backgroundColor: useColorModeValue('white', '#1A202C'),
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        'Incidencias Pendientes: <b>{point.p}</b><br/>' +
        'Incidencias En Tramite: <b>{point.t}</b><br/>' +
        'Total Atendidas: <b>{point.a}</b><br/>' +
        'Total Incidencias: <b>{point.y}</b><br/>'
    },
    title: {
      text: 'TOTAL DE INCIDENCIAS POR TÉCNICO PIECHART'
    },
    subtitle: {
      text: 'Source: <a href="#">Más Detalles</a>'
    },
    xAxis: {
      categories: nombreTecnicos,
    },    
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          }
      }
  },
    series: [{
      colorByPoint: true,
      data: data.map(item => {
        return {
          name: item.usuario?.nombre,
          y: item.total,
          p: item.pendientes,
          t: item.tramitadas,
          a: item.atendidas,
        }
      }),
    }],
    exporting: {
      showTable: false,
    },
  }

  const AreaOptions = {
    chart: {
      backgroundColor: useColorModeValue('white', '#1A202C'),
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'area',
    },
    title: {
      text: 'INCIDENCIAS POR TÉCNICO'
    },
    yAxis: {
      title: {
        text: 'Total Incidencias'
      }

    },
    series: [{
      name: 'Incidencias por técnico',
      data: data.map(item => {
        return {
          name: item.usuario?.nombre,
          y: item.total,
        }
      }),
      type: "area",
    }],
    exporting: {
      showTable: false,
    },
  }

  const Barras = {
    chart: {
      backgroundColor: useColorModeValue('white', '#1A202C'),
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'column'
    },
    title: {
      text: 'ESTADO POR TIPO DE INCIDENCIAS'
    },
    subtitle: {
      text: 'Source: <a href="#">Más Detalles</a>'
    },
    xAxis: {
      categories: nombreTecnicos
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Incidencias'
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}<br/>'
    },
    plotOptions: {
      column: {
        stacking: 'number'
      }
    },
    series: [{
      name: 'Pendientes',
      data: pendientes,
      color: '#e53e3e'
    },
    {
      name: 'En Trámite',
      data: tramitadas,
      color: '#d69e2e'
    },
    {
      name: 'Atendidas',
      data: atendidas,
      color: '#38a169'
    },
    {
      name: 'Total',
      data: total,
      color: '#4a5568'
    }
  ]
  }

  return (
    <>
      <SimpleGrid spacing='40px'>
        <Box height='100%' borderRadius="xs" boxShadow={'md'}>
          <Bellcurve 
            highcharts={Highcharts}
            options={BellcurveOptions}
          />
        </Box>
        <Box height='100%' borderRadius="xs" boxShadow={'md'}>
          <ColumnChart
            highcharts={Highcharts}
            options={Barras}
          />
        </Box>
        <Box height='100%' borderRadius="xs" boxShadow={'md'}>
          <BarChart
            highcharts={Highcharts}
            options={BarOptions}
          />
        </Box>
        <Box height='100%' borderRadius="xs" boxShadow={'md'}>
          <AreaChart
            highcharts={Highcharts}
            options={AreaOptions}
          />
        </Box>
        <Box height='100%' borderRadius="xs" boxShadow={'md'}>
          <PieChart
            highcharts={Highcharts}
            options={PieOptions}
          />
        </Box>
      </SimpleGrid>
    </>
  )

}

export default ChartReporteTecnicos;