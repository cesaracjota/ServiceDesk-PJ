import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialog,
  Switch,
  Select,
  Text,
  HStack,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deleteSede, updateSede } from '../../../actions/sede';

import SedeAgregar from './SedeAgregar';
import { BsArrowDown } from 'react-icons/bs';
import { AiTwotoneEdit } from 'react-icons/ai';
import { customStyles } from '../../../helpers/customStyle';
import { SpinnerComponent } from '../../../helpers/spinner';

export default function TableSede() {

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().sede.rows;

  const columns = [
    {
      name: 'SEDE',
      selector: row => row.sede,
      cellExport: row => row.sede,
      sortable: true,
    },
    {
      name: 'DIRECCIÓN',
      selector: row => row.direccion,
      cellExport: row => row.direccion,
      sortable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.activo,
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
      cellExport: row => (row.activo === 'S' ? 'ACTIVO' : 'ANULADO'),
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => (
        <div>
          <ModalSedeEliminar row={row} />
          <ModalSedeEditar row={row} />
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

  let bg = useColorModeValue('white', 'gray.900');
  let theme = useColorModeValue('default', 'solarized')

  if (store.getState().sede.checking === true) {
    return (
      <SpinnerComponent />
    )
  } else {
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow={'md'}
        bg={bg}
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
              TABLA DE SEDES
            </Text>
          </Box>
          <Box>
            <SedeAgregar />
          </Box>
        </HStack>
        <DataTableExtensions {...tableData} print={false}>
          <DataTable
            columns={columns}
            data={data}
            sortIcon={<BsArrowDown />}
            theme={theme}
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

}

const ModalSedeEditar = ({ row }) => {

  const [openedit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    idSede: null,
    sede: '',
    direccion: '',
    activo: '',
  });

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const actualizarSede = e => {
    e.preventDefault();
    dispatch(updateSede(indice))
      .then(() => {
        handleCloseEdit(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <IconButton
        icon={<AiTwotoneEdit />}
        variant={'outline'}
        colorScheme={'facebook'}
        onClick={() => handleClickOpenEdit(row)}
        fontSize={'22px'}
        size={'sm'}
        
      />
      <Modal isOpen={openedit} onClose={handleCloseEdit} size={'3xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} justifyContent={'center'}>
            EDITAR SEDE
          </ModalHeader>
          <ModalCloseButton  />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                value={indice ? indice.idSede : ''}
                disabled={true}
                type="text"
                hidden={true}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold">SEDE</FormLabel>
              <Input
                defaultValue={indice ? indice.sede : ''}
                type="text"
                textTransform={'uppercase'}
                onChange={e =>
                  setIndice({ ...indice, sede: (e.target.value).toUpperCase() })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight="semibold">DIRECCIÓN</FormLabel>
              <Input
                defaultValue={indice ? indice.direccion : ''}
                onChange={e =>
                  setIndice({ ...indice, direccion: (e.target.value).toUpperCase() })
                }
                placeholder="Dirección"
                type="text"
                textTransform={'uppercase'}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight="semibold">ESTADO</FormLabel>
              <Select
                defaultValue={indice ? indice.activo : ''}
                onChange={e =>
                  setIndice({ ...indice, activo: e.target.value })
                }
              >
                <option value="S">ACTIVO</option>
                <option value="N">INACTIVO</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={e => actualizarSede(e)}
              colorScheme="green"
              mr={3}
              
            >
              ACTUALIZAR
            </Button>
            <Button onClick={handleCloseEdit}  colorScheme="red" variant="outline">CANCELAR</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

/**
 * 
 * @param { MODAL ELIMINAR SEDE } param0 
 * @returns 
 */

const ModalSedeEliminar = ({ row }) => {

  const [opendelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    idSede: null,
    sede: '',
    direccion: '',
    activo: '',
  });

  const handleDeleteSede = () => {
    dispatch(deleteSede(indice))
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
        onChange={() => handleClickOpenDelete(row.idSede)}
      />
      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size="2xl">
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {row.activo === 'S' ? (
                <Text>ESTA SEGURO DE ANULAR?</Text>
              ) : (
                <Text>ESTA SEGURO DE ACTIVAR?</Text>
              )}
            </AlertDialogHeader>

            <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDelete}  colorScheme="red" variant="outline">CANCELAR</Button>
              <Button
                onClick={() => handleDeleteSede(row.idSede)}
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