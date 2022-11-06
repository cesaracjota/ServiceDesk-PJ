import React from 'react';
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
  Badge,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { BsArrowDown } from 'react-icons/bs';
import CorreoCredencialAgregar from './correoCredencialCrear';
import { CorreoCredencialEditar } from './correoCredencialEditar';
import { deleteCorreoCredencial } from '../../../actions/correoCredencial';
import { DeleteIcon } from '@chakra-ui/icons';
import { customStyles } from '../../../helpers/customStyle';

export default function TableCorreoCredencial() {

  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const data = store.getState().correoCredencial.rows;

  const columns = [
    {
      name: '#',
      selector: row => row.idCorreoCredenciales,
      cellExport: row => row.idCorreoCredenciales,
      sortable: true,
    },
    {
      name: 'CORREO',
      selector: row => row.correo,
      cellExport: row => row.correo,
      sortable: true,
    },
    {
      name: 'PASSWORD',
      selector: row => row.password ? "********" : '',
      cellExport: row => row.password ? "********" : '',
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
      cellExport: row => row.activo === "S" ? "ACTIVO" : "ANULADO",
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => (
        <div>
          <CorreoCredencialEditar row={row} />
          <ModalEliminarCorreoCredencial row={row} />
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
            TABLA DE CONFIGURACIÓN CREDENCIAL DE CORREO
          </Text>
        </Box>
        <Box>
          <CorreoCredencialAgregar />
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

const ModalEliminarCorreoCredencial = ({ row }) => {
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  const handleDeleteCorreoCredencial = (idCorreoCredenciales) => {
    dispatch(deleteCorreoCredencial(idCorreoCredenciales))
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
      <IconButton 
        aria-label="delete"
        colorScheme={'red'}
        icon={<DeleteIcon />}
        size={'sm'}
        onClick={() => handleClickOpenDelete(row.idCorreoCredenciales)}
        
    />
      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size="2xl">
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" justifyContent={'center'}>
              <Text textAlign={'center'} textColor="red.600">¿ESTA SEGURO DE ELIMINAR?</Text>              
            </AlertDialogHeader>

            <AlertDialogBody textAlign={'center'} justifyContent="center">
                <Text mb={4}>ELIMINARÁ EL CORREO CREDENCIAL: <span style={{ fontWeight: "bold"}}>{row.correo}</span></Text>
                <Box justifyContent={'center'} alignItems="center" w="full" display={'flex'}>
                    <Image src="https://i.giphy.com/media/A4LerjrVwDbQ7WgZRk/giphy.webp" width={'150px'} />
                </Box>
            </AlertDialogBody>

            <AlertDialogFooter textAlign={'center'} justifyContent="center">
              <Button onClick={handleCloseDelete} >NO</Button>
              <Button
                onClick={() => handleDeleteCorreoCredencial(row.idCorreoCredenciales)}
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