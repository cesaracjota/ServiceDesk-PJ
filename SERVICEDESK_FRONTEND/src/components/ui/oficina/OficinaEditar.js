import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
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
    IconButton,
} from '@chakra-ui/react';

import Select from 'react-select';

import { updateOficina } from '../../../actions/oficina';

import { store } from '../../../store/store';
import { AiTwotoneEdit } from 'react-icons/ai';

export const OficinaEditar = ({ row }) => {

    const [openedit, setOpenEdit] = useState(false);
    const dispatch = useDispatch();
    const dataSede = store.getState().sede.rows;
    const dataOrgano = store.getState().organo.rows;

    const selectInputRefSede = useRef();
    const selectInputRefOrgano = useRef();

    const [indice, setIndice] = useState({
        idOficina: null,
        oficina: '',
        organo: {
            idOrgano: null,
        },
        activo: '',
    });

    const [optionsOrgano, setoptionsOrgano] = useState([
        { label: 'SELECCIONE UNA SEDE' },
    ]);

    const optionsSede = dataSede.map(sede => ({
        value: sede.idSede,
        label: sede.sede,
    }))

    const [optionsOrganoindex, setoptionsOrganoindex] = useState(0);
    const [optionsSedeindex, setoptionsSedeindex] = useState(0);

    const handleClickOpenEdit = (index) => {
        setOpenEdit(true);
        setIndice(index);
        var organoData = dataOrgano.filter(indice => indice.sede.idSede === index.organo.sede.idSede);
        setoptionsOrgano(
            organoData.map(organo => ({
                value: organo.idOrgano,
                label: organo.organo,
            }))
        );
        setoptionsSedeindex(
            dataSede.findIndex(sede => sede.idSede === index.organo.sede.idSede)
        )

        setoptionsOrganoindex(
            organoData.findIndex(organo => organo.idOrgano === index.organo.idOrgano)
        )
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleUpdateOrgano = (e) => {
        e.preventDefault();
        dispatch(updateOficina(indice))
            .then(() => {
                handleCloseEdit(true);
            })
            .catch(e => {
                console.log(e);
            });
    };

    // cambiar el valor del select sede
    const handleChangeSede = (value) => {
        if (value !== null) {
            selectInputRefOrgano.current.clearValue();
            var organoData = dataOrgano.filter(indice => indice.sede.idSede === value.value);
            setoptionsOrgano(
                organoData.map(organo => ({
                    value: organo.idOrgano,
                    label: organo.organo,
                }))
            );
        } else {
            selectInputRefOrgano.current.clearValue();
            setoptionsOrgano([{ value: null, label: 'SELECCIONE UNA SEDE' }]);
            return "SELECCIONE UNA SEDE";
        }
    }

    // cambiar el valor del select organo
    const handleChangeOrgano = (value) => {
        if (value !== null) {
            setIndice({
                ...indice, organo: { idOrgano: value.value, organo: value.label },
            });

        } else {
            setIndice({
                ...indice, organo: { idOrgano: null, organo: '' },
            });
        }
    };

    return (
        <>
            <IconButton
                onClick={() => handleClickOpenEdit(row)}
                variant={'outline'}
                colorScheme="facebook"
                icon={<AiTwotoneEdit size={24} />}
                size={'sm'}
                
            />
            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'3xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">
                        EDITAR LA OFICINA
                    </ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={indice ? indice.idOficina : ''}
                                disabled={true}
                                type="text"
                                hidden={true}
                            />
                        </FormControl>
                        <FormControl isRequired={true}>
                            <FormLabel fontWeight="semibold">SEDE</FormLabel>
                            <Select
                                required
                                onChange={handleChangeSede}
                                defaultValue={optionsSede[optionsSedeindex]}
                                isRequired
                                isSearchable
                                isClearable
                                options={optionsSede}
                                ref={selectInputRefSede}
                                placeholder="SELECCIONE UNA SEDE"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel fontWeight="semibold">ORGANO</FormLabel>
                            <Select
                                onChange={handleChangeOrgano}
                                defaultValue={optionsOrgano[optionsOrganoindex]}
                                isClearable
                                options={optionsOrgano}
                                ref={selectInputRefOrgano}
                                placeholder=" SELECCIONE UN ORGANO "
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel fontWeight="semibold">OFICINA</FormLabel>
                            <Input
                                defaultValue={indice ? indice.oficina : ''}
                                type="text"
                                textTransform={'uppercase'}
                                onChange={e =>
                                    setIndice({ ...indice, oficina: e.target.value.toUpperCase() })
                                }
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                            <SelectForm
                                defaultValue={indice ? indice.activo : ''}
                                onChange={e =>
                                    setIndice({ ...indice, activo: e.target.value })
                                }
                            >
                                <option value="S">ACTIVO</option>
                                <option value="N">INACTIVO</option>
                            </SelectForm>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={e => handleUpdateOrgano(e)}
                            colorScheme="green"
                            mr={3}
                            
                            disabled={optionsOrgano[optionsOrganoindex]?.value === null || indice?.organo?.idOrgano === null ? true : false}
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
