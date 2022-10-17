import React, { useState } from 'react';
import {
  Box,
  useColorModeValue,
  HStack,
  Input,
  FormLabel,
  FormControl,
  Tabs, TabList, TabPanels, Tab, TabPanel, Button, ButtonGroup, IconButton,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
} from '@chakra-ui/react';

import { store } from '../../../../../store/store';

import Select from 'react-select';
import { SearchIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Moment from 'moment';
import 'moment-precise-range-plugin';
import moment from 'moment';
import { timerNotification } from '../../../../../helpers/alert';
import ChartReporteTiempo from './ChartReporteTiempo';
import { fetchReporteTiempo } from '../../../../../actions/reporte';
import ReporteTiempos from './ReporteTiempos';
import { NavLink } from 'react-router-dom';

import { FaFileCsv, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { CSVLink } from "react-csv";

export default function TercerReporte() {

  const sedesData = store.getState().sede.rows;

  const [selectedSedeId, setSelectedSedeId] = useState(null);
  const [selectedFechaIncio, setSelectedFechaInicio] = useState(null);
  const [selectedFechaFinal, setSelectedFechaFinal] = useState(null);


  const fechaInicio = Moment().startOf('month').format('yyyy-MM-DDTHH:mm:ss');
  const fechaActual = Moment(new Date()).format('yyyy-MM-DDTHH:mm:ss');
  const fechaActualizada = Moment(fechaActual).add(5 , 'hours').format('yyyy-MM-DDTHH:mm:ss');

  const [reportes, setReportes] = useState([]);
  const [nombreTecnicos, setNombreTecnicos] = useState([]);
  const [totalReportes, setTotalReportes] = useState([]);

  const BuscarFiltros = () => {
    var data = {
      fechaInicio: selectedFechaIncio === null ? fechaInicio : selectedFechaIncio,
      fechaActual: selectedFechaFinal === null ? fechaActualizada : Moment(selectedFechaFinal).add(5, 'hours').format('yyyy-MM-DDTHH:mm:ss'),
      sede: [selectedSedeId]
    }
    fetchReporteTiempo(data).then((res) => {
      setReportes(res.data);
    })
      .then(() => {
        setNombreTecnicos(reportes.map(item => item.usuarioTecnico?.nombre));
        // setTotalReportes(reportes.map(item => item?.total));
      })

    timerNotification('FILTRANDO REGISTROS DE TIEMPOS...', 'info', 2000);
  }

  const handleChangeSede = (value) => {
    if (value !== null) {
      var sede = [];
      for (let i=0; i<value.length; i++) {
        sede.push({
            idSede: value[i].value,
          });
      }
      if (sede.length > 0) {
        setSelectedSedeId(sede);
      }else{
        setSelectedSedeId(null);
      }
    } else {
      setSelectedSedeId(null);
    }
  }

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

  const handleExportPDF = () => {
    timerNotification('EXPORTANDO PDF...', 'info', 2000);
    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(11);

    const title = "REPORTE DE INCIDENCIAS ATENDIDAS POR TECNICOS Y EL TIEMPO DE ATENCIÓN"
    const headers = [["N°","USUARIO COMUN", "SOPORTE TECNICO", "FECHA DE REGISTRO", "TIEMPO TRANSCURRIDO", "INCIDENCIA EN TRAMITE", "TIEMPO TRANSCURRIDO", "INCIDENCIA ATENDIDA"]];

    var contadorIncial = 0;
    const data = reportes.map(elt => 
      [
        contadorIncial = contadorIncial + 1,
        elt.usuarioComun !== null ? elt.usuarioComun?.nombre + ' ' + elt.usuarioComun?.apellido : 'SIN USUARIO',
        elt.usuarioTecnico !== null ? elt.usuarioTecnico?.nombre + ' ' + elt.usuarioTecnico?.apellido : 'SIN TECNICO ASIGNADO', 
        elt.registroPendiente === null ? '' : Moment(elt.registroPendiente).format('DD/MM/YYYY HH:mm:ss'),
        elt.tiempoTranscurridoPendiente !== null ? DiferenciaDosFechas(elt.registroPendiente, elt.registroTramitado) : '',
        elt.registroTramitado === null ? '' : Moment(elt.registroTramitado).format("yyyy-MM-DD - HH:mm:ss"),
        elt.tiempoTranscurridoTramitado !== null ? DiferenciaDosFechas(elt.registroTramitado, elt.registroAtendido) : '',
        elt.registroAtendido === null ? '' : Moment(elt.registroAtendido).format("yyyy-MM-DD - HH:mm:ss"),
      ]);

    let content = {
      startY: 85,
      head: headers,
      theme: 'grid',
      body: data,
    };

    doc.text(title, doc.internal.pageSize.getWidth() / 2, 30, null, 'center');
    var img = new Image();
    img.src = 'https://res.cloudinary.com/dx6ucne8o/image/upload/v1665597382/LOGO/csjar_buzabu.jpg';
    doc.addImage(img, 'JPEG', 40, 15, 140, 55);
    doc.text('CUANTO TIEMPO SE DEMORA CADA TÉCNICO EN ATENDER UNA INCIDENCIA', doc.internal.pageSize.getWidth() / 2, 60, null, 'center');
    doc.autoTable(content);
    doc.save("ReporteTiempos.pdf")
  }

  const csvReport = {
    headers: ["USUARIO COMUN", "SOPORTE TECNICO", "FECHA DE REGISTRO", "TIEMPO TRANSCURRIDO", "INCIDENCIA EN TRAMITE", "TIEMPO TRANSCURRIDO", "INCIDENCIA ATENDIDA"],
    data: reportes.map(elt => 
      [
        elt.usuarioComun !== null ? elt.usuarioComun?.nombre + ' ' + elt.usuarioComun?.apellido : 'SIN USUARIO',
        elt.usuarioTecnico !== null ? elt.usuarioTecnico?.nombre + ' ' + elt.usuarioTecnico?.apellido : 'SIN TECNICO ASIGNADO', 
        elt.registroPendiente === null ? '' : Moment(elt.registroPendiente).format('DD/MM/YYYY HH:mm:ss'),
        elt.tiempoTranscurridoPendiente !== null ? DiferenciaDosFechas(elt.registroPendiente, elt.registroTramitado) : '', 
        elt.registroTramitado === null ? '' : Moment(elt.registroTramitado).format("yyyy-MM-DD - HH:mm:ss"),
        elt.tiempoTranscurridoTramitado !== null ? DiferenciaDosFechas(elt.registroTramitado, elt.registroAtendido) : '',
        elt.registroAtendido === null ? '' : Moment(elt.registroAtendido).format("yyyy-MM-DD - HH:mm:ss"),
      ]),
    filename: 'ReporteTiempos.csv',
    separator: ';',
  };

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow={'xs'}
        bg={useColorModeValue('white', 'gray.900')}
      >
        <Box px="4" mt="4">
          <Box d="flex" alignItems="baseline">
            <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
              <BreadcrumbItem>
                <BreadcrumbLink as={NavLink} to="/dashboard/home" _hover={{ textDecoration: 'none' }}>
                  <Button size="xs" variant="unstyled" fontWeight={'bold'} color="black">INICIO</Button>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbLink as={NavLink} to="/dashboard/reportes/incidencias-por-tiempos" _hover={{ textDecoration: 'none' }}>
                  <Button size="xs" variant="unstyled" color="black">REPORTES DE INCIDENCIAS POR TIEMPO DE ATENCIÓN</Button>
              </BreadcrumbLink>
            </Breadcrumb>
          </Box>
        </Box>
        <HStack
          spacing="24px"
          width={'100%'}
          justifyContent={'space-between'}
          px={4}
          mt={6}
          mb={4}
          fontSize={'xs'}
        >
          <FormControl>
            <FormLabel fontSize={'xs'}>FECHA INICIO</FormLabel>
            <Input
              type={'datetime-local'}
              size={'sm'}
              defaultValue={selectedFechaIncio === null ? fechaInicio : selectedFechaIncio}
              onChange={(e) => {
                setSelectedFechaInicio(e.target.value);
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize={'xs'}>FECHA FINAL</FormLabel>
            <Input
              type={'datetime-local'}
              size={'sm'}
              defaultValue={fechaActual}
              onChange={(e) => {
                setSelectedFechaFinal(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'xs'}>SEDE</FormLabel>
            <Select
              placeholder="SELECCIONE UNA SEDE"
              options={sedesData.map(sede => ({
                value: sede.idSede,
                label: sede.sede,
              }))}
              onChange={handleChangeSede}
              isClearable
              isSearchable
              isMulti
            />
          </FormControl>
        </HStack>
        <HStack w={'100%'} px={4} spacing="24px" justifyContent={'space-between'}>
        <Button
              colorScheme="blue"
              borderRadius={'none'}
              leftIcon={<SearchIcon fontSize={'20px'} />}
              onClick={() => BuscarFiltros()}
              disabled={selectedSedeId === null}
              _focus={{ boxShadow: "none" }}
              >
                BUSCAR REGISTROS
          </Button>
          <ButtonGroup>
            <Button
              borderRadius={'none'}
              variant='solid'
              colorScheme={'red'}
              leftIcon={<FaFilePdf fontSize={'20px'} />}
              pointerEvents={reportes.length === 0 ? "none" : "true"}
              disabled={reportes.length === 0}
              onClick={() => handleExportPDF()}
              px="5"
              _focus={{ boxShadow: "none" }}>
              EXPORTAR PDF
            </Button>

            <CSVLink {...csvReport}>
              <Button
                variant='solid'
                colorScheme={'green'}
                borderRadius={'none'}
                leftIcon={<FaFileCsv fontSize={'20px'} />}
                pointerEvents={reportes.length === 0 ? "none" : "true"}
                disabled={reportes.length === 0}
                px="5"
                onClick={() => timerNotification('EXPORTANDO CSV...', 'info', 2000)}
                _focus={{ boxShadow: "none" }}>
                EXPORTAR CSV
              </Button>
            </CSVLink>
          </ButtonGroup>
        </HStack>

        <HStack
          width={'100%'}
          textAlign={'center'}
          mt={4}
          fontSize={'xs'}
        >
          <Tabs isFitted variant='enclosed' colorScheme='green' w={'100%'}>
            <TabList mb='1em'>
              <Tab _focus={{ boxShadow: "none" }} borderRadius="none">
                DATOS 📅
              </Tab>
              <Tab _focus={{ boxShadow: "none" }} borderRadius="none">
                GRAFICOS 📊
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ReporteTiempos
                  reportes={reportes}
                  nombreTecnicos={nombreTecnicos}
                  totalReportes={totalReportes}
                />
              </TabPanel>
              <TabPanel>
                <ChartReporteTiempo
                  reportes={reportes}
                  nombreTecnicos={nombreTecnicos}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </HStack>
      </Box>
    </>
  );
}
