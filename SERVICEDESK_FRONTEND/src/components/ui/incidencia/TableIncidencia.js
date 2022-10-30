import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  useColorModeValue,
  Text,
  HStack,
  Badge,
  SimpleGrid,
  chakra,
  Flex,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
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

import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component-with-filter';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Moment from 'moment';

import AtencionViewFileConocimiento from './conocimiento/AtencionViewFile';
import IncidenciaViewFileConocimiento from './conocimiento/IncidenciaViewFile';

import IncidenciaDetalles from './IncidenciaDetalles';
import IncidenciaAgregar from './IncidenciaAgregar';
import { RepeatIcon } from '@chakra-ui/icons';
import { fetchIncidencias, resetEstadoIncidencia } from '../../../actions/incidencia';
import { getIncidencias } from './incidencia';
import { BsArrowDown } from 'react-icons/bs';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import { AiFillFileText, AiFillFilter } from 'react-icons/ai';

export default function TableIncidencia() {

  const [openAlert, setOpenAlert] = useState(false);
  const [progress, setProgress] = useState(false);
  const { identificador } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const data = store.getState().incidencia.rows;

  const [tableRowsData, setTableRowsData] = useState(data);

  //Contadores de incidencia
  const ContadorPendientes = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A").length > 0);
  const ContadorTramite = data.filter(row => row.historialIncidencia.filter(tramite => tramite.estadoIncidencia === "T" && tramite.estado === "A").length > 0);
  const ContadorAtendidas = data.filter(row => row.historialIncidencia.filter(atendida => atendida.estadoIncidencia === "A" && atendida.estado === "A").length > 0);

  const [indiceIncidencia, setIndiceIncidencia] = useState([]);
  const [indiceIncidenciaPersonaAsignada, setIncidenciaPersonaAsignada] = useState(null);
  const [incidenciaPersonaNotifica, setIncidenciaPersonaNotifica] = useState(null);

  const fetchDataIncidencias = async () => {
    const response = await fetchIncidencias();
    dispatch(getIncidencias(response));
  }

  const refreshTable = () => {
    fetchDataIncidencias();
  }

  const handleClickCloseAlert = () => {
    setOpenAlert(false);
  }

  const changeSetProgressTrue = () => {
    setProgress(true);
  }

  const changeSetProgressFalse = () => {
    setProgress(false);
  }

  const handleClickOpenAlert = (index) => {
    setIndiceIncidencia(index);
    setIncidenciaPersonaAsignada(index.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "A" && pendiente.estado === "A"));
    setIncidenciaPersonaNotifica(index.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "A" && pendiente.estado === "A")[0].persona_notifica.idpersona);
    setOpenAlert(true);
  }

  const ResetAsignacionIncidencia = () => {
    var incidencia = {
      idIncidencia: indiceIncidencia.idIncidencia,
      historialIncidencia: [{
        persona_registro: {
          idpersona: Number(identificador)
        },
        persona_asignado: {
          idpersona: indiceIncidenciaPersonaAsignada[0]?.persona_asignado.idpersona,
        },
        persona_notifica: {
          idpersona: incidenciaPersonaNotifica ? incidenciaPersonaNotifica : Number(identificador),
        }
      }]
    }
    dispatch(resetEstadoIncidencia(incidencia))
      .then(() => {
        setOpenAlert(false);
        fetchDataIncidencias();
      }).catch((error) => {
        console.log(error);
      })
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

  const columns = [
    {
      name: 'USUARIO',
      selector: row => row.persona.nombre + ' ' + row.persona.apellido,
      cellExport: row => row.persona.nombre + ' ' + row.persona.apellido,
      sortable: true,
      wrap: true,
    },
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
      cellExport: row => row.motivo.motivo,
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
      wrap: true,
      sortable: true,
      selector: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          historial[0]?.persona_asignado === null ? "TÉCNICO NO ASIGNADO" : historial[0]?.persona_asignado.nombre + ' ' + historial[0]?.persona_asignado.apellido
        )
      },
      cellExport: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          historial[0]?.persona_asignado === null ? "TÉCNICO NO ASIGNADO" : historial[0]?.persona_asignado.nombre + ' ' + historial[0]?.persona_asignado.apellido
        )
      },
    },
    {
      name: 'IP',
      selector: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          historial[0]?.ip
        )
      },
      sortable: true,
      cellExport: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          historial[0]?.ip
        )
      }
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
      sortable: false,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        let archivoTecnico = row.descripcionIncidencia?.incidenciaArchivos?.usuario === "T" ? row.descripcionIncidencia.incidenciaArchivos : null;
        let archivoUsuario = row.incidenciaArchivos?.usuario === "R" ? row.incidenciaArchivos : null;
        return (
          <div>
            <IncidenciaDetalles
              rowId={row.idIncidencia}
              identificador={identificador}
            />
            {archivoTecnico === null && archivoUsuario === null ? null : (
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
                          <IncidenciaViewFileConocimiento
                            rowData={row?.incidenciaArchivos}
                            typeFile={archivoUsuario?.file}
                            setProgressTrue={() => changeSetProgressTrue()}
                            setProgressFalse={() => changeSetProgressFalse()}
                          />
                        ) : null}

                        {archivoTecnico !== null ? (
                          <AtencionViewFileConocimiento
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
            )}

            {historial[0]?.estadoIncidencia === 'A' ? (
              <Tooltip placement="auto" hasArrow label="Resetear el estado de incidencia">
                <IconButton
                  icon={<MdSettingsBackupRestore size={20} />}
                  colorScheme={'red'}
                  ml={1}
                  onClick={() => handleClickOpenAlert(row)}
                  size={'sm'}
                  fontSize={'20px'}
                  _focus={{ boxShadow: 'none' }}
                />
              </Tooltip>
            ) : null}

            <AlertDialog isOpen={openAlert} onClose={handleClickCloseAlert} size={'5xl'}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="xl" fontWeight="bold">
                    ¿ESTÁ SEGURO DE ACTUALIZAR AL ESTADO INICIAL DE LA INCIDENCIA?
                  </AlertDialogHeader>
                  <AlertDialogCloseButton  />
                  <AlertDialogBody>
                    ¿CONFIRMAR LA ACCIÓN?
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button onClick={handleClickCloseAlert}  colorScheme="red" variant="outline">CANCELAR</Button>
                    <Button
                      colorScheme="facebook"
                      ml={3}
                      
                      onClick={() => ResetAsignacionIncidencia()}
                    >
                      CONFIRMAR
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </div>
        );
      },
      export: false,
      width: '140px',
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
    <>
      <Box borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow={'md'}
        mb={4}
        p={2}
        fontSize={['6px', '9px', '10px', '12px']}
        bg={useColorModeValue('gray.100', 'gray.900')} >
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
        bg={useColorModeValue('white', 'gray.900')}
        paddingBottom={4}
      >
        <HStack
          spacing="20px"
          width={'100%'}
          justifyContent={'space-between'}
          verticalAlign={'center'}
          px={4}
          mt={4}
        >
          <Box>
            <Text fontSize="lg" fontWeight="600">
              TABLA DE TODAS LAS INCIDENCIAS
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
                    <Text fontSize="sm" fontWeight={'semibold'}>
                      FILTRAR POR ESTADO
                    </Text>
                    <IconButton colorScheme={'twitter'} icon={<FaFilter />} size="sm" />
                  </HStack>
                </MenuButton>
                <MenuList zIndex={2} fontSize="sm">
                  <MenuItem onClick={handleClickFilterPendientes} icon={<AiFillFilter color='red' size={'20px'} />}>PENDIENTES</MenuItem>
                  <MenuItem onClick={handleClickFilterTramite} icon={<AiFillFilter color='#d69e2e' size={'20px'} />}>EN TRAMITE</MenuItem>
                  <MenuItem onClick={handleClickFilterAtendidas} icon={<AiFillFilter color='green' size={'20px'} />}>ATENDIDAS</MenuItem>
                  <MenuItem icon={<AiFillFilter size={'20px'} />} onClick={refreshTable}>TODOS</MenuItem>
                </MenuList>
              </Menu>
              <IncidenciaAgregar />
            </Stack>
          </Box>
        </HStack>
        <Progress mt={2} size="xs" value={progress} colorScheme="purple" hidden={progress === false} isIndeterminate={progress === true} mb={2} />
        <DataTableExtensions data={tableRowsData} columns={columns} print={false}>
          <DataTable
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            sortIcon={<BsArrowDown />}
            responsive={true}
            noDataComponent={
              <Text fontSize="sm" textAlign="center" color="gray.600">
                  NO HAY DATOS PARA MOSTRAR, REFRESCAR LA TABLA
              </Text>
            }
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 15, 20, 30]}
            fixedHeader
            fixedHeaderScrollHeight="550px"
            paginationComponentOptions={{
              rowsPerPageText: 'Filas por página:',
              rangeSeparatorText: 'de',
              selectAllRowsItem: true,
              selectAllRowsItemText: 'Todos',
            }}
            key={tableRowsData.map((item) => { return item.idIncidencia })}
          />
        </DataTableExtensions>
      </Box>
    </>
  );
}
