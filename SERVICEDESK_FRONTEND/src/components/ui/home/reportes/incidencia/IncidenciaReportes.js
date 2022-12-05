import React, { useState } from 'react';
import {
  Box,
  useColorModeValue,
  HStack,
  Input,
  FormLabel,
  FormControl,
  Tabs, TabList, TabPanels, Tab, TabPanel, Button, ButtonGroup,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
} from '@chakra-ui/react';

import { store } from '../../../../../store/store';

import Select from 'react-select';
import { SearchIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Moment from 'moment';
import { timerNotification } from '../../../../../helpers/alert';
import ChartReporteTecnicos from './ChartReporteTecnicos';
import ReporteTecnicos from './ReporteTecnicos';
import { fetchReporteTecnicos } from '../../../../../actions/reporte';

import { NavLink } from 'react-router-dom';
import { FaFileCsv, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { CSVLink } from "react-csv";

export default function IncidenciaReportes() {

  const sedesData = store.getState().sede.rows;

  const [selectedSedeId, setSelectedSedeId] = useState(null);
  const [selectedFechaIncio, setSelectedFechaInicio] = useState(null);
  const [selectedFechaFinal, setSelectedFechaFinal] = useState(null);

  const fechaInicio = Moment().startOf('month').format('yyyy-MM-DD');
  const fechaActual = Moment(new Date()).format('yyyy-MM-DD');

  const [reportes, setReportes] = useState([]);
  const [nombreTecnicos, setNombreTecnicos] = useState([]);
  const [totalReportes, setTotalReportes] = useState([]);

  const BuscarFiltros = () => {
    var data = {
      fechaInicio: selectedFechaIncio === null ? fechaInicio : selectedFechaIncio,
      fechaActual: selectedFechaFinal === null ? fechaActual : selectedFechaFinal,
      sede: [selectedSedeId]
    }
    fetchReporteTecnicos(data).then((response) => {
      console.log(response);
      const result = [];
      const map = new Map();
      for (const item of response.data) {
          if(!map.has(item.usuario?.idpersona)){
              map.set(item.usuario?.idpersona, true);    // set any value to Map
              result.push({
                  id: item.usuario?.idpersona,
                  usuario: item.usuario,
                  pendientes: item.pendientes,
                  tramitadas: item.tramitadas,
                  atendidas: item.atendidas,
                  total: item.total
              });
              setNombreTecnicos(result.map(item => item.usuario?.nombre));
              setTotalReportes(result.map(item => item.total));
          }
      }

      console.log(result);

      // var respuesta = result;

      // var nombreTecnicos = [], totalReportes = [];
      // respuesta.map(element => {
      //   nombreTecnicos.push(element.usuario?.nombre);
      //   totalReportes.push(element.total);
      // })
      setReportes(result);
    })
    timerNotification('FILTRANDO REGISTROS DE TÉCNICOS...', 'info', 2000);
  }

  const handleChangeSede = (value) => {
    if (value !== null) {
      var sede = [];
      for (let i = 0; i < value.length; i++) {
        sede.push({
          idSede: value[i].value,
        });
      }
      if (sede.length > 0) {
        setSelectedSedeId(sede);
      } else {
        setSelectedSedeId(null);
      }    
    } else {
      setSelectedSedeId(null);
    }
  }

  const handleExportPDF = () => {
    timerNotification('EXPORTANDO PDF...', 'info', 2000);
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(10);

    const title = "REPORTE DE TICKETS HÁCIA UN SOPORTE TECNICO";
    const headers = [["N°", "NOMBRES DEL TECNICO", "PENDIENTES", "EN TRAMITE", "ATENDIDOS", "TOTAL"]];
    var contadorIncial = 0;
    const data = reportes.map(row => [
      contadorIncial = contadorIncial + 1,
      row.usuario.nombre + ' ' + row.usuario.apellido, 
      row.pendientes, 
      row.tramitadas, 
      row.atendidas, 
      row.total
    ]);

    let content = {
      startY: 60,
      head: headers,
      theme: 'grid',
      body: data,
    };

    doc.text(title, doc.internal.pageSize.getWidth() / 2, 35, null, 'center');
    // var img = new Image();
    // img.src = 'https://res.cloudinary.com/dx6ucne8o/image/upload/v1665597382/LOGO/csjar_buzabu.jpg';
    // doc.addImage(img, 'JPEG', 40, 15, 90, 35);
    doc.autoTable(content);
    doc.save("ReporteTecnico.pdf")
  }

  const csvReport = {
    headers: ["TECNICO", "PENDIENTES", "EN TRAMITE", "ATENDIDOS", "TOTAL"],
    data: reportes.map(row => [row.usuario?.nombre + ' ' + row.usuario?.apellido, row.pendientes, row.tramitadas, row.atendidas, row.total]),
    filename: 'ReporteTecnico.csv',
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
                  <Button size="xs" variant="unstyled" fontWeight={'bold'} color="black" _dark={{color: 'white'}}>INICIO</Button>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbLink as={NavLink} to="/dashboard/reportes/incidencias-por-tecnico" _hover={{ textDecoration: 'none' }}>
                <Button size="xs" variant="unstyled" color="black" _dark={{color: 'white'}}>REPORTES DE INCIDENCIAS POR SOPORTE</Button>
              </BreadcrumbLink>
            </Breadcrumb>
          </Box>
        </Box>
        <HStack
          spacing="24px"
          width={'100%'}
          justifyContent={'space-between'}
          px={4}
          mt={2}
          mb={4}
          fontSize={'xs'}
        >
          <FormControl>
            <FormLabel fontSize={'xs'}>FECHA INICIO</FormLabel>
            <Input
              type={'date'}
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
              type={'date'}
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
              styles={{
                menuList: (provided) => ({
                    ...provided,
                    color: 'black',
                }),
              }}
              onChange={handleChangeSede}
              isClearable
              isSearchable
              isMulti
            />
          </FormControl>
        </HStack>
        <HStack
          spacing="24px"
          width={'100%'}
          justifyContent={'space-between'}
          px={4}
          mt={2}
          mb={4}
          fontSize={'xs'}
        >
          <Button
            colorScheme="blue"
            borderRadius={'none'}
            leftIcon={<SearchIcon fontSize={'20px'} />}
            onClick={() => BuscarFiltros()}
            disabled={selectedSedeId === null}
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
              >
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
                >
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
              <Tab  borderRadius="none">
                DATOS 📅
              </Tab>
              <Tab  borderRadius="none">
                GRAFICOS 📊
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ReporteTecnicos
                  reportes={reportes}
                  nombreTecnicos={nombreTecnicos}
                  totalReportes={totalReportes}
                />
              </TabPanel>
              <TabPanel>
                <ChartReporteTecnicos
                  reportes={reportes}
                  nombreTecnicos={nombreTecnicos}
                  totalReportes={totalReportes}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </HStack>
      </Box>
    </>
  );
};