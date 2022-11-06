import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  useColorModeValue,
  Text,
  HStack,
  Badge,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  SimpleGrid,
  chakra,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { AiFillFilter, AiOutlineUserAdd } from 'react-icons/ai'
import { store } from '../../../../store/store';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Moment from 'moment';
import Select from 'react-select';
import { asignarIncidencia, fetchIncidenciasNoAsignadas, fetchMisIncidencias } from '../../../../actions/incidencia';
import IncidenciaDetalles from '../IncidenciaDetalles';
import IncidenciaAsignarme from '../soporte/incidenciaAsignarme';
import { FaFilter } from 'react-icons/fa';
import { RepeatIcon } from '@chakra-ui/icons';
import { getIncidenciaNoAsignadas, getMisIncidencias } from './incidencia';
import { customStyles } from '../../../../helpers/customStyle';

export default function TableIncidenciaNoAsignados() {
  const dispatch = useDispatch();
  const { identificador } = useSelector(state => state.auth);

  const data = store.getState().incidenciasNoAsignadas.rows;

  const [tableRowsData, setTableRowsData] = useState(data);

  const ContadorPendientes = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A").length > 0);
  const ContadorTramite = data.filter(row => row.historialIncidencia.filter(tramite => tramite.estadoIncidencia === "T" && tramite.estado === "A").length > 0);
  const ContadorAtendidas = data.filter(row => row.historialIncidencia.filter(atendida => atendida.estadoIncidencia === "A" && atendida.estado === "A").length > 0);

  const usuario = store.getState().auth;

  const fetchDataIncidenciasNoAsignadas = async () => {
    await fetchIncidenciasNoAsignadas().then((res) => {
      dispatch(getIncidenciaNoAsignadas(res));
    });
  }

  const refreshTable = () => {
    fetchDataIncidenciasNoAsignadas();
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
      cellExport: row => Moment(row.fechaHora).format('DD/MM/YYYY HH:mm'),
      selector: row => Moment(row.fecha).format("yyyy-MM-DD - HH:mm:ss"),
      sortable: true,
    },
    {
      name: 'IP',
      sortable: true,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          <Text key={row.idIncidencia.toString()}>
            {historial[0]?.ip}
          </Text>
        )
      },
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
          <div key={row.idIncidencia.toString()}>
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
        return (
          <div key={row.idIncidencia.toString()}>
            <IncidenciaDetalles
              rowId={row.idIncidencia}
              identificador={identificador}
            />
            {usuario.rol === '[SOPORTE TECNICO]' ? (
              <IncidenciaAsignarme
                rowData={row}
                identificador={identificador}
              />
            ) : (
              <ModalAsignarTecnico
                row={row}
                refreshTable={() => refreshTable()}
              />
            )}
          </div>
        );
      },
      export: false,
      width: '150px',
    },
  ];

  // TEMA PARA LA TABLA
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
              INCIDENCIAS EN TRÁMITE
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
          spacing="24px"
          width={'100%'}
          justifyContent={'space-between'}
          verticalAlign={'center'}
          px={4}
          mt={4}
        >
          <Box>
            <Text fontSize="lg" fontWeight="600">
              TABLA DE INCIDENCIAS NO ASIGNADAS
            </Text>
          </Box>
          <Box>
            <Stack direction={'row'} spacing={1}>
              <IconButton
                size={'sm'} mr={2}
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
            </Stack>
          </Box>
        </HStack>
        <DataTableExtensions columns={columns} data={tableRowsData} print={false}>
          <DataTable
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            responsive={true}
            paginationPerPage={10}
            noDataComponent={
              <Text fontSize="sm" textAlign="center" color="gray.600">
                NO HAY DATOS PARA MOSTRAR, REFRESCAR LA TABLA
              </Text>
            }
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

const ModalAsignarTecnico = ({ row, refreshTable }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { identificador } = useSelector(state => state.auth);
  const tecnicosData = store.getState().tecnicoDisponible.rows;

  const [idIncidencia, setIndiceIncidencia] = useState(null);
  const [indiceTecnico, setIndiceTecnico] = useState(null);
  const [incidenciaPersonaNotifica, setIncidenciaPersonaNotifica] = useState(null);

  const fetchDataMisIncidencias = async () => {
    const response = await fetchMisIncidencias(identificador);
    dispatch(getMisIncidencias(response));
  }

  const refreshTableMisIncidencias = () => {
    fetchDataMisIncidencias();
  }


  const AsignacionIncidencia = () => {
    var incidencia = {
      idIncidencia: idIncidencia,
      historialIncidencia: [{
        persona_registro: {
          idpersona: Number(identificador)
        },
        persona_asignado: {
          idpersona: indiceTecnico,
        },
        persona_notifica: {
          idpersona: incidenciaPersonaNotifica ? incidenciaPersonaNotifica : Number(identificador),
        }
      }]
    }
    dispatch(asignarIncidencia(incidencia))
      .then(() => {
        setOpenModal(false);
        refreshTable();
        refreshTableMisIncidencias();
      }).catch((error) => {
        console.log(error);
      })
  }

  const handleCloseModal = () => {
    setIndiceTecnico(null);
    setOpenModal(false);
  }

  const handleClickOpenModal = (index) => {
    setIndiceIncidencia(index.idIncidencia);
    setIncidenciaPersonaNotifica(index.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A")[0]?.persona_notifica.idpersona);
    setOpenModal(true);
  };

  const handleChangeTecnico = value => {
    setIndiceTecnico(value.value);
  };

  return (
    <>
      <Tooltip hasArrow placement="auto" label="Asignar La Incidencia" aria-label="Asignar La Incidencia">
        <IconButton
          icon={<AiOutlineUserAdd />}
          variant={'solid'}
          colorScheme={'facebook'}
          onClick={() => handleClickOpenModal(row)}
          fontSize='20px'
          size={'sm'}
          ml={1}
        />
      </Tooltip>

      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        size={'2xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ASIGNAR A UN SOPORTE UN USUARIO O SOPORTE TÉCNICO</ModalHeader>
          <ModalCloseButton  />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel fontWeight="semibold">USUARIOS DISPONIBLES PARA ASIGNAR</FormLabel>
              <Select
                placeholder="SELECCIONE UN USUARIO"
                onChange={handleChangeTecnico}
                options={tecnicosData.map(tecnico => ({
                  value: tecnico.persona.idpersona,
                  label: tecnico.persona.nombre + ' ' + tecnico.persona.apellido
                }))}
                isSearchable
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={indiceTecnico === null ? true : false}
              colorScheme="facebook"
              
              mr={3}
              onClick={() => AsignacionIncidencia()}
            >
              ASIGNAR
            </Button>
            <Button onClick={handleCloseModal}  colorScheme="red" variant="outline">CANCELAR</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}