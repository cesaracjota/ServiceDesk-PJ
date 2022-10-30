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
  IconButton,
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deleteMensaje, updateEstadoMensaje } from '../../../actions/mensaje';

import { BsArrowDown, BsTrash2 } from 'react-icons/bs';
import { MensajeEditar } from './MensajeEditar';
import { CrearMensaje } from './CrearMensaje';

export default function TableMensajes() {

  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const data = store.getState().mensaje.rows;

  const columns = [
    {
      name: 'ASUNTO',
      selector: row => row.asunto,
      cellExport: row => row.asunto,
      sortable: true,
    },
    {
      name: 'MOSTRAR HASTA',
      selector: row => row.fechaHasta,
      cellExport: row => row.fechaHasta,
      sortable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.activo,
      sortable: true,
      cell: row => (
        <div>
          <Badge
            bg={row.activo === "S" ? "green.500" : bgStatus}
            color={row.activo === "S" ? "white" : colorStatus}
            py="4px"
            w={"100px"}
            textAlign={'center'}
            borderRadius={'md'}
            fontSize={'12px'}
          >
            {row.activo === "S" ? "ACTIVO" : "DESACTIVADO"}
          </Badge>
        </div>
      ),
      cellExport: row => (row.activo === "S" ? "ACTIVO" : "DESACTIVADO"),
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => (
        <div>
          <ModalModificarEstadoMensaje row={row} />
          <MensajeEditar row={row} />
          <ModalEliminarMensaje row={row} />
        </div>
      ),
      export: false,
      center: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

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
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={'sm'}
      bg={useColorModeValue('white', 'gray.900')}
    >
      <HStack spacing='24px' width={'100%'} justifyContent={'space-between'} verticalAlign={'center'} p={4}>
        <Box>
          <Text fontSize='lg' fontWeight='600'>
            LISTA DE MENSAJES PARA LAS ALERTAS
          </Text>
        </Box>
        <Box>
          <CrearMensaje />
        </Box>
      </HStack>
      <DataTableExtensions {...tableData} print={false}>
        <DataTable
          columns={columns}
          data={data}
          sortIcon={<BsArrowDown />}
          theme={useColorModeValue('default', 'solarized')}
          pagination
          ignoreRowClick={true}
          responsive={true}
        />
      </DataTableExtensions>
    </Box>
  );
}

// MODAL CAMBIAR ESTADO DEL MENSAJE

const ModalModificarEstadoMensaje = ({ row }) => {
  const [opendelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteFtp = () => {
    dispatch(updateEstadoMensaje(row.idMensaje))
      .then(() => {
        handleCloseDelete(true);
      })
      .catch(e => {
        console.error(e);
        handleCloseDelete(true);
      });
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <Switch
        colorScheme={'red'}
        mr={2}
        isChecked={row.activo === 'S'}
        onChange={() => handleClickOpenDelete(row.idMensaje)}
      />
      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size="2xl">
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {row.activo === 'S' ? <Text>¿ESTA SEGURO DE DESACTIVAR?</Text> : <Text>¿ESTÁ SEGURO DE ACTIVAR?</Text>}
            </AlertDialogHeader>

            <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDelete}  colorScheme="red" variant="outline">CANCELAR</Button>
              <Button
                onClick={() => handleDeleteFtp()}
                colorScheme="red"
                ml={3}
              >
                SI
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

// MODAL DE ELIMINAR CARGO

const ModalEliminarMensaje = ({ row }) => {

  const [opendelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteMensaje = () => {
    dispatch(deleteMensaje(row.idMensaje))
      .then(() => {
        handleCloseDelete(true);
      })
      .catch(e => {
        console.error(e);
        handleCloseDelete(true);
      });
  };

  return (
    <>
      <IconButton
        aria-label="Delete"
        icon={<BsTrash2 />}
        colorScheme="red"
        size={'sm'}
        ml={2}
        onClick={() => handleClickOpenDelete(row.idMensaje)}
      />
      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size="4xl">
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Text>¿ESTÁ SEGURO DE ELIMINAR DEFINITIVAMENTE EL MENSAJE?</Text>
            </AlertDialogHeader>

            <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDelete}  colorScheme="red" variant="outline">CANCELAR</Button>
              <Button
                onClick={handleDeleteMensaje}
                colorScheme="red"
                ml={3}
              >
                SI
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}