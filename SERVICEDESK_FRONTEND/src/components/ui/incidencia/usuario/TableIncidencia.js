import React, { useEffect, useState } from 'react';
import {
  Box,
  useColorModeValue,
  Text,
  HStack,
  Badge,
  chakra,
  Flex,
  SimpleGrid,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  Stack,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Portal,
  Progress,
  Tooltip,
} from '@chakra-ui/react';
import { store } from '../../../../store/store';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Moment from 'moment';
import IncidenciaAgregar from './IncidenciaAgregar';
import { RepeatIcon } from '@chakra-ui/icons';
import { fetchIncidenciasPersonas } from '../../../../actions/incidencia';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidenciaId } from '../incidencia';
import { AiFillFileText, AiFillFilter } from 'react-icons/ai';
import { FaFilter } from 'react-icons/fa';
import IncidenciaDetalles from '../IncidenciaDetalles';
import AtencionViewFile from '../conocimiento/AtencionViewFile';
import IncidenciaViewFile from '../conocimiento/IncidenciaViewFile';
import { customStyles } from '../../../../helpers/customStyle';
import { SpinnerComponent } from '../../../../helpers/spinner';

// import parse from 'html-react-parser';

export default function TableIncidencia() {

  const { identificador } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const data = store.getState().incidenciaId.rows;

  const [tableRowsData, setTableRowsData] = useState(data);
  const [progress, setProgress] = useState(false);

  let bg = useColorModeValue('white', 'gray.900');
  let theme = useColorModeValue('default', 'solarized');

  const fetchDataMisIncidencias = async () => {
    const response = await fetchIncidenciasPersonas(identificador);
    dispatch(getIncidenciaId(response));
  }

  useEffect(() => {
    if(store.getState().incidenciaId.checking){
      fetchDataMisIncidencias();
    }
  });

  const ContadorPendientes = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A").length > 0);
  const ContadorTramite = data.filter(row => row.historialIncidencia.filter(tramite => tramite.estadoIncidencia === "T" && tramite.estado === "A").length > 0);
  const ContadorAtendidas = data.filter(row => row.historialIncidencia.filter(atendida => atendida.estadoIncidencia === "A" && atendida.estado === "A").length > 0);

  const refreshTable = () => {
    fetchDataMisIncidencias();
  }

  // filtros por estado

  const handleClickFilterPendientes = async () => {
    const dataFilter = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A").length > 0);
    setTableRowsData(dataFilter);
  }

  const handleClickFilterTramite = async () => {
    const dataFilter = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "T" && pendiente.estado === "A").length > 0);
    setTableRowsData(dataFilter);
  }

  const handleClickFilterAtendidas = async () => {
    const dataFilter = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "A" && pendiente.estado === "A").length > 0);
    setTableRowsData(dataFilter);
  }

  const handleClickFilterTodos = async () => {
    const dataFilter = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estado === "A").length > 0);
    setTableRowsData(dataFilter);
  }

  const changeSetProgressTrue = () => {
    setProgress(true);
  }

  const changeSetProgressFalse = () => {
    setProgress(false);
  }

  const columns = [
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
      cellExport: row => row.motivo.motivo,
      sortable: true,
    },
    {
      name: 'ORIGEN',
      selector: row => row.origen.origen,
      cellExport: row => row.origen.origen,
      sortable: true,
    },
    {
      name: 'FECHA Y HORA',
      selector: row => Moment(row.fecha).format("yyyy-MM-DD - HH:mm:ss"),
      cellExport: row => Moment(row.fecha).format("yyyy-MM-DD - HH:mm:ss"),
      sortable: true,
    },
    {
      name: 'TÉCNICO ASIGNADO',
      sortable: true,
      wrap: true,
      selector: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (historial[0]?.persona_asignado === null ? "NO ASIGNADO" : historial[0]?.persona_asignado.nombre + ' ' + historial[0]?.persona_asignado.apellido)
      },
      cellExport: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          historial[0]?.persona_asignado === null ? "INCIDENCIA NO ASIGNADA A TÉCNICO" : historial[0]?.persona_asignado.nombre + ' ' + historial[0]?.persona_asignado.apellido
        )
      },
    },
    {
      name: 'ESTADO',
      selector: row => row.historialIncidencia.map(row => row.estado === 'A' ? row.estado : ''),
      sortable: true,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          <div>
            <Badge
              bg={historial[0]?.estadoIncidencia === 'P' ? 'red.500' : historial[0]?.estadoIncidencia === 'T' ? 'yellow.500' : 'green.500'}
              color={'white'}
              py="4px"
              w={"100px"}
              textAlign={'center'}
              borderRadius={'md'}
              fontSize={'12px'}
            >
              {historial[0]?.estadoIncidencia === 'P' ? 'PENDIENTE' : historial[0]?.estadoIncidencia === 'T' ? 'EN TRÁMITE' : 'ATENDIDO'}
            </Badge>
          </div>
        )
      },
      cellExport: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          historial[0]?.estadoIncidencia === 'P' ? 'PENDIENTE' : historial[0]?.estadoIncidencia === 'T' ? 'EN TRÁMITE' : 'ATENDIDO'
        )
      },
      center: true,
    },
    {
      name: 'ACCIONES',
      cell: row => {
        let archivoTecnico = row.descripcionIncidencia?.incidenciaArchivos?.usuario === "T" ? row.descripcionIncidencia.incidenciaArchivos : null;
        let archivoUsuario = row.incidenciaArchivos?.usuario === "R" ? row.incidenciaArchivos : null;
        return (
          <div>
            <IncidenciaDetalles
              rowId={row.idIncidencia}
              identificador={identificador}
            />
            {((row.descripcionIncidencia !== null) && (row.descripcionIncidencia?.incidenciaArchivos !== null)) || (row.incidenciaArchivos !== null) ? (
              <Popover placement="auto">
                <PopoverTrigger>
                <Box as="a" cursor={'pointer'}>
                  <Tooltip hasArrow placement="auto" label="Visualizar Archivos de la Incidencia" aria-label="A tooltip">
                    <IconButton
                      size="sm"
                      colorScheme="purple"
                      icon={<AiFillFileText />}
                      ml={1}
                      fontSize={'20px'}
                      _focus={{ boxShadow: 'none' }}
                    />
                  </Tooltip>
                </Box>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverCloseButton _focus={{ boxShadow: 'none' }} />
                    <PopoverHeader>VISUALIZAR ARCHIVO</PopoverHeader>
                    <PopoverBody>
                      <Stack direction={'column'} spacing={4} alignItems="start">
                        {archivoUsuario !== null ? (
                          <IncidenciaViewFile
                            rowData={row?.incidenciaArchivos}
                            typeFile={archivoUsuario?.file}
                            setProgressTrue={() => changeSetProgressTrue()}
                            setProgressFalse={() => changeSetProgressFalse()}
                          />
                        ) : null}

                        {archivoTecnico !== null ? (
                          <AtencionViewFile
                            rowData={row.descripcionIncidencia?.incidenciaArchivos}
                            typeFile={archivoTecnico?.file}
                            setProgressTrue={() => changeSetProgressTrue()}
                            setProgressFalse={() => changeSetProgressFalse()}
                          />
                        ) : null}
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            ) : null}
          </div>
        )
      },
      export: false,
      wrap: true,
    }
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

  if(store.getState().incidenciaId.checking === true){
    return (
      <SpinnerComponent />
    )
}else{
    return (
      <>
        <Box borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow={'md'}
          mb={4}
          p={2}
          fontSize={['6px', '9px', '10px', '12px']}
          bg={bg} >
          <SimpleGrid columns={4} spacing={5} textColor={'white'}>
            <Box
              w={'100%'}
              bg="white"
              _dark={{ bg: "gray.800", borderWidth: "1px" }}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              textAlign={'center'}
            >
              <chakra.h3
                py={2}
                textAlign="center"
                fontWeight="bold"
                textTransform="uppercase"
                color="red.500"
                _dark={{ color: "white" }}
              >
                INCIDENCIAS PENDIENTES
              </chakra.h3>
              <Flex
                alignItems="center"
                justify={'center'}
                py={2}
                w={'100%'}
                bg="red.500"
                _dark={{ bg: "gray.700" }}
              >
                <chakra.span
                  fontWeight="bold"
                  color="white"
                  _dark={{ color: "gray.200" }}
                >
                  {ContadorPendientes.length}
                </chakra.span>
              </Flex>
            </Box>
            <Box
              w={'100%'}
              bg="white"
              _dark={{ bg: "gray.800", borderWidth: "1px" }}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              textAlign={'center'}
            >
              <chakra.h3
                py={2}
                textAlign="center"
                fontWeight="bold"
                textTransform="uppercase"
                color="yellow.500"
                _dark={{ color: "white" }}
              >
                Incidencias en Tramite
              </chakra.h3>
              <Flex
                alignItems="center"
                justify={'center'}
                py={2}
                px={3}
                bg="yellow.500"
                _dark={{ bg: "gray.700" }}
              >
                <chakra.span
                  fontWeight="bold"
                  color="gray.200"
                  _dark={{ color: "gray.200" }}
                >
                  {ContadorTramite.length}
                </chakra.span>
              </Flex>
            </Box>
            <Box
              w={'100%'}
              bg="white"
              _dark={{ bg: "gray.800", borderWidth: "1px" }}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              textAlign={'center'}
            >
              <chakra.h3
                py={2}
                textAlign="center"
                fontWeight="bold"
                textTransform="uppercase"
                color="green.500"
                _dark={{ color: "white" }}
              >
                INCIDENCIAS ATENDIDAS
              </chakra.h3>
              <Flex
                alignItems="center"
                justify={'center'}
                py={2}
                px={3}
                bg="green.500"
                _dark={{ bg: "gray.700" }}
              >
                <chakra.span
                  fontWeight="bold"
                  color="white"
                  _dark={{ color: "gray.200" }}
                >
                  {ContadorAtendidas.length}
                </chakra.span>
              </Flex>
            </Box>
            <Box
              w={'100%'}
              bg="white"
              _dark={{ bg: "gray.800", borderWidth: "1px" }}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              textAlign={'center'}
            >
              <chakra.h3
                py={2}
                textAlign="center"
                fontWeight="bold"
                textTransform="uppercase"
                color="gray.600"
                _dark={{ color: "white" }}
              >
                TOTAL DE INCIDENCIAS
              </chakra.h3>
              <Flex
                alignItems="center"
                justify={'center'}
                py={2}
                px={3}
                bg="gray.600"
                _dark={{ bg: "gray.700" }}
              >
                <chakra.span
                  fontWeight="bold"
                  color="white"
                  _dark={{ color: "gray.200" }}
                >
                  {data.length}
                </chakra.span>
              </Flex>
            </Box>
          </SimpleGrid>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow={'md'}
          bg={bg}
          paddingBottom={4}
          zIndex={0}
        >
          <HStack
            spacing="24px"
            width={'100%'}
            justifyContent={'space-between'}
            verticalAlign={'center'}
            px={4}
            mt={4}
          >
            <Box>
              <Text fontSize="lg" fontWeight="600">
                MIS INCIDENCIAS REPORTADAS
              </Text>
            </Box>
            <Box>
              <Stack direction={'row'} spacing={4}>
                <IconButton
                  size={'sm'}
                  icon={<RepeatIcon boxSize={4} />}
                  colorScheme={'facebook'}
                  
                  onClick={refreshTable} />
                <Menu size={'xs'}>
                  <MenuButton as={'menu'} style={{ cursor: 'pointer' }}>
                    <HStack spacing={2}>
                      <Text fontSize="sm" fontWeight="semibold">
                        FILTRAR POR ESTADO
                      </Text>
                      <IconButton colorScheme={'twitter'} icon={<FaFilter />} size="sm" />
                    </HStack>
                  </MenuButton>
                  <MenuList zIndex={2} fontSize="sm">
                    <MenuItem onClick={handleClickFilterPendientes} icon={<AiFillFilter color='red' size={'20px'} />}>PENDIENTES</MenuItem>
                    <MenuItem onClick={handleClickFilterTramite} icon={<AiFillFilter color='#d69e2e' size={'20px'} />}>EN TRAMITE</MenuItem>
                    <MenuItem onClick={handleClickFilterAtendidas} icon={<AiFillFilter color='green' size={'20px'} />}>ATENDIDAS</MenuItem>
                    <MenuItem icon={<AiFillFilter size={'20px'} />} onClick={handleClickFilterTodos}>TODOS</MenuItem>
                  </MenuList>
                </Menu>
                <IncidenciaAgregar />
              </Stack>
            </Box>
          </HStack>
          <Progress mt={2} size="xs" value={progress} colorScheme="purple" hidden={progress === false} isIndeterminate={progress === true} mb={2} />
          <DataTableExtensions columns={columns} data={tableRowsData.reverse()} print={false}>
            <DataTable
              defaultSortAsc={false}
              theme={theme}
              pagination
              ignoreRowClick={true}
              noDataComponent={
                <Text fontSize="sm" textAlign="center" color="gray.600">
                  NO HAY DATOS PARA MOSTRAR, REFRESCAR LA TABLA
                </Text>
              }
              paginationPerPage={10}
              responsive={true}
              paginationRowsPerPageOptions={[10, 15, 20, 30]}
              fixedHeader
              fixedHeaderScrollHeight="550px"
              paginationComponentOptions={{
                rowsPerPageText: 'Filas por página:',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
              }}
              customStyles={customStyles}
              key={tableRowsData.map((item) => { return item.idIncidencia })}
            />
          </DataTableExtensions>
        </Box>
      </>
    );
  }

}
