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

  const initialOrgano = {
    idOrgano: null,
    organo: '',
    sede: {
      idSede: null,
    },
    activo: '',
  };

  const [dataOrgano, setOrgano] = useState(initialOrgano);
  
  const saveOrgano = () => {
    dispatch(createOrgano(dataOrgano))
      .then(() => {
        handleCloseModal(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChangeSede = (value) => {
    if (value !== null) {
        setOrgano({
          ...dataOrgano,
          sede: { idSede: value.value, sede: value.label },
        });
    } else {
      setOrgano({
        ...dataOrgano,
        sede: { idSede: null, sede: '' },
      })
    }
  
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
    setOrgano(initialOrgano);
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        size="sm"
        onClick={handleClickOpenCreate}
        colorScheme={'facebook'}
        
      >
        AGREGAR
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'3xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">AGREGAR NUEVO ORGANO</ModalHeader>
          <ModalCloseButton  />
          <ModalBody pb={8}>
            <FormControl>
              <FormLabel fontWeight="semibold">SEDE</FormLabel>
              <Select
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
              <FormLabel fontWeight="semibold">ORGANO</FormLabel>
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
              <FormLabel fontWeight="semibold">ESTADO</FormLabel>
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
              
              disabled={dataOrgano.organo === '' || dataOrgano.sede.idSede === null}
            >
              GUARDAR
            </Button>
            <Button onClick={handleCloseModal}  colorScheme="red" variant="outline">CANCELAR</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrganoAgregar;
