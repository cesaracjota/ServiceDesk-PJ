import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  useColorModeValue,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialog,
  Switch,
  Text,
  HStack,
  Badge,
  Tooltip,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
} from '@chakra-ui/react';

import {
  CheckCircleIcon,
  NotAllowedIcon,
} from '@chakra-ui/icons';
import { FaFilter, FaUserSecret } from 'react-icons/fa';

import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deletePersona } from '../../../actions/persona';

import PersonaAgregar from './PersonaAgregar';

import { fetchPersonaOrgano } from '../../../actions/personaOrgano';
import ModalOrganoAsignacion from './ModalOrganoAsignacion';

import { BsArrowDown } from 'react-icons/bs';

import PersonaEditar from './PersonaEditar';
import { AiFillFilter } from 'react-icons/ai';
import ModalActualizarHistorial from './ModalActualizarHistorial';

export default function TablePersona() {
  const [openModal, setOpenModal] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  // Close Modal Organo Asignacion
  const handleCloseModalOrganoAsignacion = () => {
    setOpenModal(false);
  };

  const handleOpenModalOrganoAsignacion = () => {
    setOpenModal(true);
  };

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().persona.rows;

  const [tableRowsData, setTableRowsData] = useState(data);

  const [indice, setIndice] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    usuario: '',
    password: '',
    correo: '',
    celular: '',
    fecha: null,
    sexo: '',
    activo: '',
    perfilPersona: {
      idPerfilPersona: null,
    },
  });

  const [personaid, setPersonaid] = useState({
    idPersona: null,
  });

  const handleClickOpenModal = (index) => {
    fetchDataPersonaOrgano(index.idpersona);
    setIndice(index);
    setOpenModal(true);
  };

  const [personaOrganos, setPersonaOrganos] = useState([]);

  const fetchDataPersonaOrgano = async (idpersona) => {
    await fetchPersonaOrgano(idpersona).then(res => {
      setPersonaOrganos(res.data);
    });
  };

  const handleDeletePersona = (x) => {
    dispatch(deletePersona(x))
      .then(() => {
        handleCloseDelete(true);
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const handleClickOpenDelete = (index) => {
    setPersonaid(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickFilterCoodinador = async () => {
    const dataFilter = data.filter(row => row.perfilPersona.perfil === "COORDINADOR INFORMATICO");
    setTableRowsData(dataFilter);
  }

  const handleClickFilterAsistente = async () => {
    const dataFilter = data.filter(row => row.perfilPersona.perfil === "ASISTENTE INFORMATICO");
    setTableRowsData(dataFilter);
  }

  const handleClickFilterSoporte = async () => {
    const dataFilter = data.filter(row => row.perfilPersona.perfil === "SOPORTE TECNICO");
    setTableRowsData(dataFilter);
  }

  const handleClickFilterUsuario = async () => {
    const dataFilter = data.filter(row => row.perfilPersona.perfil === "USUARIO COMUN");
    setTableRowsData(dataFilter);
  }

  const refreshTable = () => {
    setTableRowsData(data);
  }

  const columns = [
    {
      name: "#",
      selector: row => row.idpersona,
      cellExport: row => row.idpersona,
      sortable: true,
      maxWidth: '50px',
    },
    {
      name: "NOMBRES",
      selector: row => row.nombre + " " + row.apellido,
      cellExport: row => row.nombre + " " + row.apellido,
      sortable: true,
    },
    {
      name: "PERFIL PERSONA",
      selector: row => row.perfilPersona.perfil,
      cellExport: row => row.perfilPersona.perfil,
      sortable: true,
    },
    {
      name: "ESTADO",
      selector: row => row.activo,
      sortable: true,
      cell: row => (
        <div>
          <Tooltip
            hasArrow
            label={row.activo === 'S' ? 'ACTIVO' : 'INACTIVO'}
            bg="gray.300"
            color="black"
          >
            <Badge
              bg={row.activo === 'S' ? 'green.500' : bgStatus}
              textColor={row.activo === 'S' ? 'white' : colorStatus}
              p={1}
              textAlign={'center'}
              borderRadius={'md'}
              py="4px"
              w={"100px"}
            >
              {row.activo === 'S' ? (
                <CheckCircleIcon boxSize={5} />
              ) : (
                <NotAllowedIcon boxSize={5} />
              )}
            </Badge>
          </Tooltip>
        </div>
      ),
      cellExport: row => (row.activo === 'S' ? 'ACTIVO' : 'INACTIVO'),
      center: true,
    },
    {
      name: "PERMISOS",
      sortable: true,
      cell: row => (
        <div>
          {row.perfilPersona.perfil === 'SOPORTE TECNICO' && row.activo === 'S' ? (
            <Tooltip hasArrow label="Permisos para Soportes Técnicos">
              <IconButton
                onClick={() => handleClickOpenModal(row)}
                colorScheme="telegram"
                size={'sm'}
                icon={<FaUserSecret fontSize="20px"/>}
                
              />
            </Tooltip>
          ) : null}
        </div>
      ),
      center: true,
      export: false,
    },
    {
      name: "ACCIONES",
      sortable: false,
      cell: row => (
        <div>
          <Switch
            colorScheme={'red'}
            mr={2}
            isChecked={row.activo === 'S'}
            onChange={() => handleClickOpenDelete(row.idpersona)}
          />

          <PersonaEditar row={row} />

          {row?.perfilPersona?.perfil === 'USUARIO COMUN' && row.activo === 'S' ? (
            
            <ModalActualizarHistorial rowData = { row }/>

          ) : null }

          <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size="2xl">
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  {row.activo === 'S' ? (
                    <Text>ESTÁ SEGURO DE ANULAR?</Text>
                  ) : (
                    <Text>ESTÁ SEGURO DE ACTIVAR?</Text>
                  )}
                </AlertDialogHeader>

                <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={handleCloseDelete}  colorScheme="red" variant="outline">CANCELAR</Button>
                  <Button
                    onClick={() => handleDeletePersona(personaid)}
                    colorScheme="red"
                    ml={3}
                    
                  >
                    SI
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </div>
      ),
      export: false,
      width: '150px',
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
      <ModalOrganoAsignacion
        abrir={openModal}
        cerrar={handleCloseModalOrganoAsignacion}
        usuario={indice}
        abrirSeter={setOpenModal}
        abrirModalPersonaOrgano={handleOpenModalOrganoAsignacion}
        personaOrgano={personaOrganos}
        setpersonaOrgano={setPersonaOrganos}
      />
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow={'md'}
        bg={useColorModeValue('white', 'gray.900')}
      >
        <HStack
          spacing="24px"
          width={'100%'}
          justifyContent={'space-between'}
          verticalAlign={'center'}
          p={4}
        >
          <Box>
            <Text fontSize="lg" fontWeight="600">
              TABLA DE USUARIOS
            </Text>
          </Box>
          <Box>
            <Stack direction={'row'} spacing={2}>
              <PersonaAgregar />
              <Menu>
                <MenuButton as={'menu'} style={{ cursor: 'pointer' }}>
                  <HStack spacing={2}>
                    <Text fontSize="sm" fontWeight={'semibold'}>
                      FILTRAR POR PERFIL
                    </Text>
                    <IconButton colorScheme={'twitter'} icon={<FaFilter />} size="sm" />
                  </HStack>
                </MenuButton>
                <MenuList zIndex={2} fontSize="sm">
                  <MenuItem onClick={handleClickFilterCoodinador} icon={<AiFillFilter color='#c53030' size={'20px'} />}>COORDINADOR INFORMATICO</MenuItem>
                  <MenuItem onClick={handleClickFilterAsistente} icon={<AiFillFilter color='#2b6cb0' size={'20px'} />}>ASISTENTE INFORMATICO</MenuItem>
                  <MenuItem onClick={handleClickFilterSoporte} icon={<AiFillFilter color='green' size={'20px'} />}>SOPORTE TECNICO</MenuItem>
                  <MenuItem icon={<AiFillFilter color='gray' size={'20px'} />} onClick={handleClickFilterUsuario}>USUARIO COMUN</MenuItem>
                  <MenuItem icon={<AiFillFilter size={'20px'} />} onClick={refreshTable}>TODOS</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Box>
        </HStack>
        <DataTableExtensions data={tableRowsData} columns={columns} print={false}>
          <DataTable
            sortIcon={<BsArrowDown />}
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            responsive={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 15, 20, 30]}
            fixedHeader
            fixedHeaderScrollHeight="550px"
          />
        </DataTableExtensions>
      </Box>
    </>
  );
}