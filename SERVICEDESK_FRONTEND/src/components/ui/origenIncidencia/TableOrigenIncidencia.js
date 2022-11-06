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

import { deleteOrigen } from '../../../actions/origenIncidencia';

import OrigenAgregar from './OrigenIncidenciaAgregar';
import { BsArrowDown } from 'react-icons/bs';
import { OrigenIncidenciaEditar } from './OrigenIncidenciaEditar';
import { customStyles } from '../../../helpers/customStyle';

export default function TableOrigen() {

  const data = store.getState().origenIncidencia.rows;

  const columns = [
    {
      name: 'ORIGEN',
      selector: row => row.origen,
      cellExport: row => row.origen,
      sortable: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => (
        <div>

          <OrigenIncidenciaEditar row={row} />

          <ModalOrigenEliminar row={row} />

        </div>
      ),
      center: true,
      export: false,
    },
  ];

  const tableData = {
    columns,
    data,
  };

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
            TABLA DE ORIGEN DE INCIDENCIA
          </Text>
        </Box>
        <Box>
          <OrigenAgregar />
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
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20, 30]}
          customStyles={customStyles}
        />
      </DataTableExtensions>
    </Box>
  );
}

const ModalOrigenEliminar = ({ row }) => {

  const [opendelete, setOpenDelete] = React.useState(false);

  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    idOrigen: null,
    origen: '',
  });

  const handleClickDelete = () => {
    dispatch(deleteOrigen(indice))
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
        onClick={() => handleClickOpenDelete(row.idOrigen)}
        fontSize={'22px'}
        size={'sm'}
        ml={2}
        
      />
      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size={'2xl'}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Text>¿ESTÁ SEGURO DE ELIMINAR ESTE ORIGEN?</Text>
            </AlertDialogHeader>

            <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDelete}  colorScheme="red" variant="outline">CANCELAR</Button>
              <Button
                onClick={() => handleClickDelete(row.idOrigen)}
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