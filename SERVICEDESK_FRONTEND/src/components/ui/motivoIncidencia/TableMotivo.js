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
  Text,
  HStack,
  IconButton,
} from '@chakra-ui/react';

import { RiDeleteBackLine } from 'react-icons/ri';

import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';

import { deleteMotivo } from '../../../actions/motivo';

import MotivoAgregar from './MotivoAgregar';
import { BsArrowDown } from 'react-icons/bs';
import { MotivoEditar } from './MotivoEditar';

export default function TableMotivo() {

  const data = store.getState().motivo.rows;

  const columns = [
    {
      name: 'MOTIVO',
      selector: row => row.motivo,
      cellExport: row => row.motivo,
      sortable: true,
      wrap: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => (
        <div>

          <MotivoEditar row={row} />

          <ModalMotivoEliminar row={row} />

        </div>
      ),
      center: true,
      export: false,
      wrap: true,
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
            TABLA DE MOTIVOS DE INCIDENCIA
          </Text>
        </Box>
        <Box>
          <MotivoAgregar />
        </Box>
      </HStack>
      <DataTableExtensions {...tableData} print={false}>
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
  );
}

// Modal Eliminar Motivo

const ModalMotivoEliminar = ({ row }) => {

  const [opendelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    idMotivo: null,
    motivo: '',
  });

  const handleDeleteMotivo = () => {
    dispatch(deleteMotivo(indice))
      .then(() => {
        handleCloseDelete(true);
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const handleClickOpenDelete = index => {
    setIndice(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <>
      <IconButton
        icon={<RiDeleteBackLine />}
        variant={'solid'}
        colorScheme={'red'}
        onClick={() => handleClickOpenDelete(row.idMotivo)}
        fontSize={'22px'}
        size={'sm'}
        ml={2}
        
      />

      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size={'2xl'}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Text>¿ESTÁ SEGURO DE ELIMINAR EL MOTIVO?</Text>
            </AlertDialogHeader>

            <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDelete}  colorScheme="red" variant="outline">CANCELAR</Button>
              <Button
                onClick={() => handleDeleteMotivo(row.idMotivo)}
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