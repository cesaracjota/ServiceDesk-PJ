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
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deleteOficina } from '../../../actions/oficina';

import OficinaAgregar from './OficinaAgregar';
import { BsArrowDown } from 'react-icons/bs';
import { OficinaEditar } from './OficinaEditar';
import { customStyles } from '../../../helpers/customStyle';

export default function TableOficina() {

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().oficina.rows;

  const columns = [
    {
      name: 'SEDE',
      selector: row => row.organo.sede.sede,
      cellExport: row => row.organo.sede.sede,
      sortable: true,
    },
    {
      name: 'ORGANO',
      selector: row => row.organo.organo,
      cellExport: row => row.organo.organo,
      sortable: true,
    },
    {
      name: 'OFICINA',
      selector: row => row.oficina,
      cellExport: row => row.oficina,
      sortable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.activo,
      sortable: true,
      cell: row => {
        return (
          <div>
            <Badge
              bg={row.activo === 'S' ? 'green.500' : bgStatus}
              color={row.activo === 'S' ? 'white' : colorStatus}
              py="4px"
              w={"100px"}
              textAlign={'center'}
              borderRadius={'md'}
              fontSize={'12px'}
            >
              {row.activo === 'S' ? 'ACTIVO' : 'ANULADO'}
            </Badge>
          </div>
        );
      },
      cellExport: row => (row.activo === 'S' ? 'ACTIVO' : 'ANULADO'),
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => {
        return (
          <div>
            <ModalEliminarOficina row={row} />
            <OficinaEditar row={row} />
          </div>
        );
      },
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
            TABLA DE OFICINAS
          </Text>
        </Box>
        <Box>
          <OficinaAgregar />
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

const ModalEliminarOficina = ({ row }) => {

  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  const [oficinaid, setOficinaid] = useState({
    idOficina: null,
  });

  const handleDeleteOficina = (x) => {
    dispatch(deleteOficina(x))
      .then(() => {
        handleCloseDelete(true);
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const handleClickOpenDelete = (index) => {
    setOficinaid(index);
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
        onChange={() => handleClickOpenDelete(row.idOficina)}
      />
      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size={'xl'}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {row.activo === 'S' ? (
                <Text>¿ESTÁ SEGURO DE ANULAR?</Text>
              ) : (
                <Text>¿ESTÁ SEGURO DE ACTIVAR?</Text>
              )}
            </AlertDialogHeader>

            <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDelete}  colorScheme="red" variant="outline">CANCELAR</Button>
              <Button
                onClick={() => handleDeleteOficina(oficinaid)}
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