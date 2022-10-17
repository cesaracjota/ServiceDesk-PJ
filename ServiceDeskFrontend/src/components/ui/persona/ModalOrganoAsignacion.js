import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Text,
  Divider,
  Table,
  IconButton,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  TableContainer,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import Select from 'react-select';
import { store } from '../../../store/store';
import { useDispatch } from 'react-redux';
import AlertaDialogo from '../../../helpers/AlertaDialogo';
import {
  deletePersonaOrgano,
  createPersonaOrgano,
  fetchPersonaOrgano,
} from '../../../actions/personaOrgano';

export default function ModalOrganoAsignacion(props) {

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();

  //Data sede-organo
  const sedeData = store.getState().sede.rows;
  const organoData = store.getState().organo.rows;

  //State select organo
  const [organoSelect, setorganoSelect] = useState([
    { value: 0, label: 'Seleccione una Sede' },
  ]);

  const [selectOrgano, setselectOrgano] = useState([{ value: 0, label: 'Seleccione una Sede' }]);

  const selectInputRef = useRef();
  const selectInputRefSede = useRef();

  const [organoNombre, setorganoNombre] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const fetchDataPersonaOrgano = async idpersona => {
    await fetchPersonaOrgano(idpersona).then(res => {
      props.setpersonaOrgano(res.data);
    });
  };

  //Cambiar opciones select organo
  const handleChangeSede = (value) => {
    if (value !== null) {
      setorganoSelect(
        organoData.filter(indice => indice.sede.idSede === value.value).map(organo => ({
          value: organo.idOrgano,
          label: organo.organo,
        }))
      );
    } else {
      selectInputRef.current.clearValue();
      setorganoSelect([{ value: 0, label: 'Seleccione una Sede' }]);
      selectInputRef.current.setValue([{ value: 0, label: 'Seleccione una Sede' }]);
    }
  };
  //setear organo
  const handleChangeOrgano = (value) => {
    if (value !== null) {
      setorganoNombre(value.value);
    } else {
      setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    }
  };

  //defaul input
  const closeModal = () => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    setorganoNombre(null);
    setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    props.cerrar();

  };
  const closeModalDelete = () => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    setOpenModalDelete(false);
  };

  const deletePersonaOrganoId = () => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    dispatch(deletePersonaOrgano(idDeleteOrgano))
      .then(() => {
        fetchDataPersonaOrgano(props.usuario.idpersona);
      }).catch(err => {
        console.log(err.message);
      });
    closeModalDelete();
  };

  const closeModalCreate = () => {
    setorganoNombre(null);
    setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    fetchDataPersonaOrgano(props.usuario.idpersona);
    setOpenModalCreate(false);
  };

  const [idDeleteOrgano, setIdDeleteOrgano] = useState(null);
  const handleClickOpenDeleteOrganoP = id => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    setIdDeleteOrgano(id);
    setOpenModalDelete(true);
  };

  const createPersonaOrganoModal = () => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    setOpenModalCreate(true);
  };

  const createPersonaOrganoDModal = () => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    dispatch(createPersonaOrgano(props.usuario.idpersona, organoNombre))
      .then(() => {
        setorganoNombre(null);
        selectInputRef.current.clearValue();
        setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
        selectInputRef.current.setValue([{ value: 0, label: 'Seleccione una Sede' }]);
        fetchDataPersonaOrgano(props.usuario.idpersona);
        selectInputRefSede.current.clearValue();
        selectInputRefSede.current.setValue([{ value: 0, label: 'Seleccione una Sede' }]);

      })
      .catch(err => {
        setorganoNombre(null);
        selectInputRef.current.clearValue();
        setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
        selectInputRef.current.setValue([{ value: 0, label: 'Seleccione una Sede' }]);
        selectInputRefSede.current.clearValue();
        selectInputRefSede.current.setValue([{ value: 0, label: 'Seleccione una Sede' }]);
      });
    closeModalCreate();
  };

  return (
    <>
      <AlertaDialogo
        isOpen={openModalDelete}
        onClose={closeModalDelete}
        title={'ESTÁS SEGURO DE ELIMINAR LA ASIGNACIÓN?'}
        metodo={deletePersonaOrganoId}
        size="2xl"
      />
      <Modal
        id="modalOrganoAsignacion"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={props.abrir}
        onClose={closeModal}
        size={'6xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            ASIGNACION DE ORGANOS JURIDICCIONALES A SOPORTES TÉCNICOS
          </ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody pb={6}>
            <HStack spacing={'10px'} mt={'10px'}>
              <FormControl>
                <FormLabel>SEDE</FormLabel>
                <Select
                  placeholder="SELECCIONE UNA SEDE"
                  required
                  onChange={handleChangeSede}
                  isRequired
                  isSearchable
                  isClearable
                  options={sedeData.map(sede => ({
                    value: sede.idSede,
                    label: sede.sede,
                  }))}
                  ref={selectInputRefSede}
                />
              </FormControl>
              <FormControl>
                <FormLabel>ORGANO</FormLabel>
                <Select
                  onChange={handleChangeOrgano}
                  isClearable
                  options={organoSelect}
                  defaultValue={selectOrgano[0]}
                  ref={selectInputRef}
                />
              </FormControl>
            </HStack>
            <FormControl mt={'10px'}>
              <Button
                disabled={organoNombre == null ? true : false}
                onClick={createPersonaOrganoModal}
                colorScheme={'facebook'}
                mr={3}
              >
                ASIGNAR
              </Button>
            </FormControl>
            <Divider
              orientation="horizontal"
              borderColor={'blue.600'}
              border={2}
              mt={'10px'}
            />

            <Text mt={'10px'}>
              ORGANOS JURIDICCIONALES ASIGNADAS A:{' '} 🤵 {' '}
              <b> {props.usuario.nombre + ' ' + props.usuario.apellido}</b>
            </Text>

            {/* Listado de Organos asignados a ese usuario */}
            <TableContainer>
              <Table
                size="sm"
                mt={'10px'}
              >
                <Thead>
                  <Tr>
                    <Th>SEDE</Th>
                    <Th>ORGANO</Th>
                    <Th>ACCIÓN</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {props.personaOrgano.map(x => (
                    <Tr key={x.idPersonaOrgano}>
                      <Td>{x.sede}</Td>
                      <Td>{x.organo}</Td>
                      <Td>
                        <IconButton
                          onClick={() =>
                            handleClickOpenDeleteOrganoP(x.idPersonaOrgano)
                          }
                          colorScheme={'red'}
                          size="sm"
                          fontSize="14px"
                          icon={<CloseIcon />}
                          _focus={{ boxShadow: "none" }}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button onClick={closeModal} colorScheme="red" _focus={{ boxShadow: "none" }} variant="outline">
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertaDialogo
        size={'2xl'}
        isOpen={openModalCreate}
        onClose={closeModalCreate}
        title={'ESTÁS SEGURO DE ASIGNAR EL ORGANO?'}
        metodo={createPersonaOrganoDModal}
      />
    </>
  );
}
