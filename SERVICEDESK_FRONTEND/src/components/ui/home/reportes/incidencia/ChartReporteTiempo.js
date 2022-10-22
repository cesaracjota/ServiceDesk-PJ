import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box } from '@chakra-ui/react'
import moment from 'moment';

require("highcharts/modules/exporting.js")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);

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
  })

  const ChartMinutos = {
    title: {
      text: 'MINUTOS QUE SE DEMORA UN TECNICO EN ATENDER UNA INCIDENCIA'
    },
    xAxis: [{
      title: {
        text: 'TECNICOS'
      },
      type: 'category',
      categories: nombreTecnicos,
      alignTicks: false
    }],
    yAxis: [{
      title: {
        text: 'MINUTOS'
      },
      type: 'linear',
      alignTicks: false
    }],
    chart: {
      plotBackgroundColor: true,
      type: 'bellcurve',
    },
    series: {
      name: 'MINUTOS QUE SE DEMORA',
      data: promedioMinutos,
      exporting: {
        showTable: false,
      },
    }
  }


  const ChartHoras = {
    title: {
      text: 'HORAS QUE SE DEMORA UN TECNICO EN ATENDER UNA INCIDENCIA'
    },
    xAxis: [{
      title: {
        text: 'TECNICOS'
      },
      type: 'category',
      categories: nombreTecnicos,
      alignTicks: false
    }],
    yAxis: [{
      title: {
        text: 'HORAS'
      },
      type: 'linear',
      alignTicks: false
    }],
    chart: {
      plotBackgroundColor: true,
      type: 'bellcurve',
    },
    series: {
      name: 'CUANTAS HORAS SE DEMORA',
      data: promedioHoras,
      exporting: {
        showTable: false,
      },
    }
  }

  const ChartDias = {
    title: {
      text: 'DIAS QUE SE DEMORA UN TECNICO EN ATENDER UNA INCIDENCIA'
    },
    xAxis: [{
      title: {
        text: 'TECNICOS'
      },
      categories: nombreTecnicos,
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
    chart: {
      plotBackgroundColor: true,
      type: 'bellcurve',
    },
    series: {
      name: 'CUANTOS DIAS SE DEMORA',
      data: promedioDias,
      exporting: {
        showTable: false,
      },
    }
  }

  const AreaOptions = {
    title: {
      text: 'DIAS QUE SE DEMORA UN TECNICO EN ATENDER UNA INCIDENCIA'
    },
    yAxis: {
      title: {
        text: 'DIAS QUE SE DEMORA'
      }

    },
    series: [{
      name: 'DIAS QUE SE DEMORA',
      data: promedioDias,
      type: "area",
    }],
    exporting: {
      showTable: false,
    },
  }

  return (
      <Box w="100%" h="100%" p={4} bg="white" borderRadius="md" boxShadow="md">
        <Box height='100%' borderRadius="xs" py={4}>
          <HighchartsReact highcharts={Highcharts} options={ChartMinutos}/>
        </Box>

        <Box mt={4} height='100%' borderRadius="xs" py={4}>
          <HighchartsReact highcharts={Highcharts} options={ChartHoras}/>
        </Box>

        <Box mt={4} height='100%' borderRadius="xs" py={4}>
          <HighchartsReact highcharts={Highcharts} options={ChartDias}/>
        </Box>

        <Box mt={4} height='100%' borderRadius="xs" py={4}>
          <HighchartsReact highcharts={Highcharts} options={AreaOptions}/>
        </Box>
      </Box>
  )

}

export default ChartReporteTiempo;