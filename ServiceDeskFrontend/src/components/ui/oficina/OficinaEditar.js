import React, { useState } from 'react';
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
    const [organoSelect, setorganoSelect] = useState([
        { idOrgano: 0, organo: 'Seleccione una Sede' },
    ]);
    const sedeData = store.getState().sede.rows;
    const dataOrgano = store.getState().organo.rows;
    var sedeInfo = sedeData;
    var organoInfo = dataOrgano;

    const [indice, setIndice] = useState({
        idOficina: null,
        oficina: '',
        organo: {
            idOrgano: null,
            organo: '',
        },
        activo: '',
    });

    const [optionsOrgano, setoptionsOrgano] = useState(
        organoInfo.map(organo => ({
            value: organo.idOrgano,
            label: organo.organo,
        }))
    );

    const [optionsSede, setoptionsSede] = useState(
        sedeInfo.map(sede => ({
            value: sede.idSede,
            label: sede.sede,
        }))
    );

    const [optionsOrganoindex, setoptionsOrganoindex] = useState(0);
    const [optionsSedeindex, setoptionsSedeindex] = useState(0);

    const handleClickOpenEdit = index => {
        setIndice(index);
        setOpenEdit(true);
        var i = 0;
        var sedeID;
        organoInfo.filter(indice => indice.sede.idSede === sedeID);
        setoptionsOrgano(
            organoInfo.map(organo => {
                if (index.organo.idOrgano === organo.idOrgano) {
                    setoptionsOrganoindex(i);
                    sedeID = organo.sede.idSede;
                }
                i++;
                return {
                    value: organo.idOrgano,
                    label: organo.organo,
                };
            })
        );
        i = 0;
        setoptionsSede(
            sedeInfo.map(sede => {
                if (sedeID === sede.idSede) {
                    setoptionsSedeindex(i);
                }
                i++;
                return {
                    value: sede.idSede,
                    label: sede.sede,
                };
            })
        );
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleUpdateOrgano = e => {
        e.preventDefault();
        dispatch(updateOficina(indice))
            .then(() => {
                handleCloseEdit(true);
            })
            .catch(e => {
                console.log(e);
            });
    };

    // Select
    const handleChange = (value) => {
        if (value == null) {
        } else {
            var organo = organoInfo.filter(indice => indice.sede.idSede === value.value);
            setoptionsOrgano(
                organo.map(organo => ({
                    value: organo.idOrgano,
                    label: organo.organo,
                }))

            );
            setoptionsOrganoindex(0);
        }
    };

    // edit organo
    const handleChangeOrgano = value => {
        setIndice({
            ...indice,
            organo: { idOrgano: value.value, organo: value.label },
        });
    };

    return (
        <>
            <IconButton
                onClick={() => handleClickOpenEdit(row)}
                variant={'outline'}
                colorScheme="facebook"
                icon={<AiTwotoneEdit size={24} />}
                size={'sm'}
                _focus={{ boxShadow: "none" }}
            />
            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} justifyContent={'center'}>
                        EDITAR LA OFICINA
                    </ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
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
                            <FormLabel>SEDE</FormLabel>
                            <Select
                                required
                                onChange={handleChange}
                                defaultValue={optionsSede[optionsSedeindex]}
                                isRequired
                                isSearchable
                                isClearable
                                options={optionsSede}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>ORGANO</FormLabel>
                            <Select
                                onChange={handleChangeOrgano}
                                defaultValue={optionsOrgano[optionsOrganoindex]}
                                isClearable
                                options={optionsOrgano}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>OFICINA</FormLabel>
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
                            <FormLabel>ESTADO</FormLabel>
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
                            _focus={{ boxShadow: "none" }}
                        >
                            ACTUALIZAR
                        </Button>
                        <Button onClick={handleCloseEdit} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
