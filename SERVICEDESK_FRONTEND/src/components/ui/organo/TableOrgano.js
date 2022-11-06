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

import { deleteOrgano } from '../../../actions/organo';

import OrganoAgregar from './OrganoAgregar';
import { BsArrowDown } from 'react-icons/bs';
import { OrganoEditar } from './OrganoEditar';
import { customStyles } from '../../../helpers/customStyle';

export default function TableOrgano() {

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().organo.rows;

  const columns = [
    {
      name: 'SEDE',
      selector: row => row.sede.sede,
      cellExport: row => row.sede.sede,
      sortable: true,
    },
    {
      name: 'ORGANO',
      selector: row => row.organo,
      cellExport: row => row.organo,
      sortable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.activo,
      cellExport: row => (row.activo === 'S' ? 'ACTIVO' : 'ANULADO'),
      sortable: true,
      cell: row => (
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
      ),
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => {
        return (
          <div>
            <ModalEliminarOrgano row={row} />
            <OrganoEditar row={row} />
          </div>
        );
      },
      center: true,
      export: false,
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
            TABLA ORGANOS JURIDICCIONALES
          </Text>
        </Box>
        <Box>
          <OrganoAgregar />
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

const ModalEliminarOrgano = ({ row }) => {

  const [opendelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();
  const [organoid, setOrganoid] = useState({
    idOrgano: null,
  });

  const handleDeleteOrgano = x => {
    dispatch(deleteOrgano(x))
      .then(() => {
        handleCloseDelete(true);
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const handleClickOpenDelete = index => {
    setOrganoid(index);
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
        onChange={() => handleClickOpenDelete(row.idOrgano)}
      />
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
                onClick={() => handleDeleteOrgano(organoid)}
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