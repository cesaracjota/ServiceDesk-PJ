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
  Badge,
  HStack,
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import {
  deletePerfilPersona } from '../../../actions/perfilPersona';

import PerfilPersonaAgregar from './PerfilPersonaAgregar';
import { BsArrowDown } from 'react-icons/bs';
import { PerfilPersonaEditar } from './PerfilPersonaEditar';

export default function Tables() {

  const data = store.getState().perfilPersona.rows;

  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const columns = [
    {
      name: 'PERFIL',
      selector: row => row.perfil,
      cellExport: row => row.perfil,
      sortable: true,
    },
    {
      name: 'DESCRIPCIÓN',
      selector: row => row.descripcion,
      cellExport: row => row.descripcion,
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
            {row.activo === "S" ? "ACTIVO" : "ANULADO"}
          </Badge>
        </div>
      ),
      cellExport: row => (row.activo === "S" ? "ACTIVO" : "ANULADO"),
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => (
        <div>
          <ModalPerfilPersonaEliminar row={row} />
          <PerfilPersonaEditar row={row} />
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
      <HStack spacing='24px' width={'100%'} justifyContent={'space-between'} verticalAlign={'center'} p={4}>
        <Box>
          <Text fontSize='lg' fontWeight='600'>
            TABLA DE PERFILES DEL USUARIO
          </Text>
        </Box>
        <Box>
          <PerfilPersonaAgregar />
        </Box>
      </HStack>
      <DataTableExtensions {...tableData} print={false}>
        <DataTable
          columns={columns}
          data={data}
          defaultSortAsc={false}
          theme={useColorModeValue('default', 'solarized')}
          pagination
          ignoreRowClick={true}
          responsive={true}
          sortIcon={<BsArrowDown />}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          fixedHeader
          fixedHeaderScrollHeight="550px"
        />
      </DataTableExtensions>
    </Box>
  );
}

/**
 * 
 * @param { MODAL ELIMINAR UN PERFIL PERSONA }
 */

const ModalPerfilPersonaEliminar = ({ row }) => {

  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    idPerfilPersona: null,
    perfil: '',
    descripcion: '',
    activo: '',
  });

  const handleDeletePerfilPersona = () => {
    dispatch(deletePerfilPersona(indice))
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
      <Switch
        colorScheme={'red'}
        mr={2}
        isChecked={row.activo === 'S'}
        onChange={() => handleClickOpenDelete(row.idPerfilPersona)}
      />
      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size="xl">
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">

              {row.activo === 'S' ? '¿ESTÁ SEGURO DE ACTIVAR?' : 'ESTÁ SEGURO DE ANULAR?'}

            </AlertDialogHeader>

            <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDelete} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
              <Button
                onClick={() =>
                  handleDeletePerfilPersona(row.idPerfilPersona)
                }
                colorScheme="red"
                ml={3}
                _focus={{ boxShadow: "none" }}
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
