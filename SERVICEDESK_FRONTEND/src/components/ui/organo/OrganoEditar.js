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
    Select as ChakraSelect,
    IconButton,
} from '@chakra-ui/react';

import { AiTwotoneEdit } from 'react-icons/ai';
import { updateOrgano } from '../../../actions/organo';

import { store } from '../../../store/store';

import Select from 'react-select';

export const OrganoEditar = ({ row }) => {
    const [openedit, setOpenEdit] = useState(false);
    const dispatch = useDispatch();

    const dataSede = store.getState().sede.rows;

    const [indice, setIndice] = useState({
        idOrgano: null,
        organo: '',
        sede: {
            idSede: null,
        },
        activo: '',
    });

    const optionsSede = dataSede.map(sede => ({
        value: sede.idSede,
        label: sede.sede,
    }))

    const [optionsSedeindex, setoptionsSedeindex] = useState(0);

    const handleClickOpenEdit = (index) => {

        setIndice(index);
        setOpenEdit(true);

        const indexSede = optionsSede.findIndex(sede => sede.value === index.sede.idSede);
        setoptionsSedeindex(indexSede);

    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleChangeSede = (value) => {
        if (value) {
            setIndice({ ...indice, sede: { idSede: value.value } });
        } else {
            setIndice({ ...indice, sede: { idSede: null } });
        }
        
    }

    const handleUpdateOrgano = e => {
        e.preventDefault();
        dispatch(updateOrgano(indice))
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
                onClick={() => handleClickOpenEdit(row)}
                variant={'outline'}
                colorScheme="facebook"
                icon={<AiTwotoneEdit size={24} />}
                size={'sm'}
                _focus={{ boxShadow: "none" }}
            />
            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'3xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} justifyContent={'center'}>
                        EDITAR ORGANO
                    </ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody pb={8}>
                        <FormControl>
                            <Input
                                value={indice ? indice.idOrgano : ''}
                                disabled={true}
                                type="text"
                                hidden={true}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="semibold">SEDE</FormLabel>
                            <Select
                                defaultValue={optionsSede[optionsSedeindex]}
                                onChange={handleChangeSede}
                                options={optionsSede}
                                placeholder={'SELECCIONE UNA SEDE'}
                                isClearable
                                isSearchable
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel fontWeight="semibold">ORGANO</FormLabel>
                            <Input
                                defaultValue={indice ? indice.organo : ''}
                                type="text"
                                textTransform={'uppercase'}
                                onChange={e =>
                                    setIndice({ ...indice, organo: e.target.value.toUpperCase() })
                                }
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                            <ChakraSelect
                                defaultValue={indice ? indice.activo : ''}
                                onChange={e =>
                                    setIndice({ ...indice, activo: e.target.value })
                                }
                            >
                                <option value="S">ACTIVO</option>
                                <option value="N">INACTIVO</option>
                            </ChakraSelect>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={e => handleUpdateOrgano(e)}
                            colorScheme="green"
                            mr={3}
                            _focus={{ boxShadow: "none" }}
                            disabled={indice.sede.idSede === null || indice.organo === '' || indice.activo === ''}
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
