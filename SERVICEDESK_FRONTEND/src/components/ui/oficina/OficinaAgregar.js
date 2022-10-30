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
  Select as SelectForm,
} from '@chakra-ui/react';

import { store } from '../../../store/store';

import Select from 'react-select';

import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { createOficina } from '../../../actions/oficina';

import { AddIcon } from '@chakra-ui/icons';

const OficinaAgregar = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useDispatch();

  const sedeData = store.getState().sede.rows;
  const organoData = store.getState().organo.rows;

  const selectInputRefOrgano = React.useRef();

  var organoInfo = organoData;

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const [organoValue, setorganoValue] = useState(null);

  const initialOficina = {
    idOficina: null,
    oficina: '',
    organo: {
      idOrgano: null,
    },
    activo: null,
  };

  const [dataOficina, setOficina] = useState(initialOficina);
  const [organoSelect, setorganoSelect] = useState([
    { idOrgano: 0, organo: 'SELECCIONE UNA SEDE' },
  ]);

  const handleChange = (value) => {
    if (value === null) {
      setorganoSelect([{ idOrgano: 0, organo: 'SELECCIONE UNA SEDE' }]);
      selectInputRefOrgano.current.setValue([{ value: 0, label: 'SELECCIONE UNA SEDE' }]);
    } else {
      setorganoSelect(
        organoInfo.filter(indice => indice.sede.idSede === value.value)
      );
      selectInputRefOrgano.current.setValue([{ value: 0, label: 'SELECCIONE UN ORGANO' }]);
    }
  };

  const handleChangeOrgano = (value) => {
    if (value !== null) {
      setorganoValue(value.value);
    } else {
      selectInputRefOrgano.current.setValue([{ value: 0, label: 'SELECCIONE UN ORGANO' }]);
    }
  };

  const saveOficina = () => {
    var datosOficina = {
      oficina: dataOficina.oficina,
      organo: {
        idOrgano: organoValue,
      },
      activo: dataOficina.activo,
    };

    dispatch(createOficina(datosOficina))
      .then(() => {
        handleCloseModal(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  
  const handleCloseModal = () => {
    setOpenCreate(false);
    selectInputRefOrgano.current.clearValue();
    setOficina(initialOficina);
    setorganoValue(null);
  };

  return (
    <>
      <Button leftIcon={<AddIcon/>} size="sm" onClick={handleClickOpenCreate} colorScheme={'facebook'} >
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
          <ModalHeader textAlign="center">AGREGAR NUEVA OFICINA</ModalHeader>
          <ModalCloseButton  />
          <ModalBody pb={6}>
            <FormControl isRequired={true}>
              <FormLabel fontWeight="semibold">SEDE</FormLabel>
              <Select
                required
                onChange={handleChange}
                isRequired
                isSearchable
                isClearable
                options={sedeData.map(sede => ({
                  value: sede.idSede,
                  label: sede.sede,
                }))}
                placeholder="SELECCIONE UNA SEDE"
              />
            </FormControl>
            <FormControl mt={4} isRequired={true}>
              <FormLabel fontWeight="semibold">ORGANO</FormLabel>
              <Select
                onChange={handleChangeOrgano}
                defaultValue={organoSelect.map(organo => ({
                  value: organo.idOrgano,
                  label: organo.organo,
                }))}
                options={organoSelect.map(organo => ({
                  value: organo.idOrgano,
                  label: organo.organo,
                }))}
                ref={selectInputRefOrgano}
                isClearable
                placeholder="SELECCIONE UN ORGANO"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight="semibold">OFICINA</FormLabel>
              <Input
                onChange={e => {
                  setOficina({
                    ...dataOficina,
                    oficina: e.target.value.toUpperCase(),
                  });
                }}
                placeholder="Oficina"
                textTransform={'uppercase'}
                type={'text'}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel fontWeight="semibold">ESTADO</FormLabel>
              <SelectForm
                defaultValue={(dataOficina.activo = 'S')}
                onChange={e => {
                  setOficina({ ...dataOficina, activo: e.target.value });
                }}
                autoFocus={true}
              >
                <option value="S">ACTIVO</option>
                <option value="N">INACTIVO</option>
              </SelectForm>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type={'submit'}
              onClick={() => saveOficina()}
              colorScheme={'facebook'}
              autoFocus
              mr={3}
              
              disabled = {organoValue === null || dataOficina.oficina === '' ? true : false}
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

export default OficinaAgregar;
