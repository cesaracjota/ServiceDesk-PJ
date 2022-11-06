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

import { deleteFtp } from '../../../actions/ftp';

import { BsArrowDown } from 'react-icons/bs';
import { FtpEditar } from './FtpEditar';
import FtpAgregar from './FtpCrear';
import { customStyles } from '../../../helpers/customStyle';

export default function TableFtp() {

  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const data = store.getState().ftp.rows;

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      cellExport: row => row.id,
      sortable: true,
    },
    {
      name: 'USUARIO',
      selector: row => row.usuario,
      cellExport: row => row.usuario,
      sortable: true,
    },
    {
      name: 'IP',
      selector: row => row.ip,
      cellExport: row => row.ip,
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
      selector: row => row.estado,
      sortable: true,
      cell: row => (
        <div>
          <Badge
            bg={row.estado === "S" ? "green.500" : bgStatus}
            color={row.estado === "S" ? "white" : colorStatus}
            py="4px"
            w={"100px"}
            textAlign={'center'}
            borderRadius={'md'}
            fontSize={'12px'}
          >
            {row.estado === "S" ? "ACTIVO" : "ANULADO"}
          </Badge>
        </div>
      ),
      cellExport: row => (row.estado === "S" ? "ACTIVO" : "ANULADO"),
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => (
        <div>
          <ModalEliminarFtp row={row} />
          <FtpEditar row={row} />
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
      boxShadow={'md'}
      bg={useColorModeValue('white', 'gray.900')}
    >
      <HStack spacing='24px' width={'100%'} justifyContent={'space-between'} verticalAlign={'center'} p={4}>
        <Box>
          <Text fontSize='lg' fontWeight='600'>
            TABLA DE CONFIGURACIÓN FTP
          </Text>
        </Box>
        <Box>
          <FtpAgregar />
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
          customStyles={customStyles}
        />
      </DataTableExtensions>
    </Box>
  );
}

// MODAL DE ELIMINAR CARGO

const ModalEliminarFtp = ({ row }) => {
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    id: null,
    descripcion: "",
    estado: "",
  });

  const handleDeleteFtp = () => {
    dispatch(deleteFtp(indice))
      .then(() => {
        handleCloseDelete(true);
      })
      .catch(e => {
        console.error(e);
        handleCloseDelete(true);
      });
  };

  const handleClickOpenDelete = (index) => {
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
        isChecked={row.estado === 'S'}
        onChange={() => handleClickOpenDelete(row.id)}
      />
      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size="2xl">
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {row.estado === 'S' ? <Text>ESTA SEGURO DE ANULAR?</Text> : <Text>ESTÁ SEGURO DE ACTIVAR?</Text>}
            </AlertDialogHeader>

            <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDelete}  colorScheme="red" variant="outline">CANCELAR</Button>
              <Button
                onClick={() => handleDeleteFtp(row.id)}
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