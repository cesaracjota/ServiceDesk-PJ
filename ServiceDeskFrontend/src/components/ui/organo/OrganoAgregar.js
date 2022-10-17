import {
  Button,
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
  Select as ChakraSelect,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import Select from 'react-select';

import { store } from '../../../store/store';

import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { createOrgano } from '../../../actions/organo';
const OrganoAgregar = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const sedeData = store.getState().sede.rows;

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  const initialOrgano = {
    idOrgano: null,
    organo: '',
    sede: {
      idSede: null,
    },
    activo: '',
  };

  const [dataOrgano, setOrgano] = useState(initialOrgano);

  const { organo, sede, activo } = dataOrgano;

  const saveOrgano = () => {
    dispatch(createOrgano({ organo, sede, activo }))
      .then(() => {
        handleCloseModal(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChangeSede = (value) => {
    setOrgano({
      ...dataOrgano,
      sede: { idSede: value.value, sede: value.label },
    });
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        size="sm"
        onClick={handleClickOpenCreate}
        colorScheme={'facebook'}
        _focus={{ boxShadow: "none" }}
      >
        AGREGAR
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'2xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AGREGAR NUEVO ORGANO</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>SEDE</FormLabel>
              <Select
                // defaultValue={indice ? indice.sede.idSede : ''}
                placeholder="SELECCIONE UNA SEDE"
                onChange={handleChangeSede}
                options={sedeData.map(sede => ({
                  value: sede.idSede,
                  label: sede.sede,
                }))}
                isClearable
                isSearchable
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>ORGANO</FormLabel>
              <Input
                onChange={e => {
                  setOrgano({
                    ...dataOrgano,
                    organo: e.target.value.toUpperCase(),
                  });
                }}
                type={'text'}
                placeholder={'Nombre del Organo'}
                textTransform={'uppercase'}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>ESTADO</FormLabel>
              <ChakraSelect
                defaultValue={(dataOrgano.activo = 'S')}
                onChange={e => {
                  setOrgano({ ...dataOrgano, activo: e.target.value });
                }}
              >
                <option value="S">ACTIVO</option>
                <option value="N">INACTIVO</option>
              </ChakraSelect>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type={'submit'}
              onClick={() => saveOrgano()}
              colorScheme={'facebook'}
              autoFocus
              mr={3}
              _focus={{ boxShadow: "none" }}
            >
              GUARDAR
            </Button>
            <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrganoAgregar;
