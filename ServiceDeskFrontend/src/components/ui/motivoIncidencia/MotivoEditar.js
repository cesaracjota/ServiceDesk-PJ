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
    IconButton,
} from '@chakra-ui/react';

import { AiTwotoneEdit } from 'react-icons/ai';

import { updateMotivo } from '../../../actions/motivo';

export const MotivoEditar = ({ row }) => {
    const [openedit, setOpenEdit] = useState(false);
    const dispatch = useDispatch();

    const [indice, setIndice] = useState({
        idMotivo: null,
        motivo: '',
    });

    const handleClickOpenEdit = index => {
        setIndice(index);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleUpdateMotivo = e => {
        e.preventDefault();
        dispatch(updateMotivo(indice))
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
                _focus={{ boxShadow: "none" }}
            />
            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        EDITAR EL MOTIVO DE LA INCIDENCIA
                    </ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={indice ? indice.idMotivo : ''}
                                disabled={true}
                                type="text"
                                hidden={true}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>MOTIVO</FormLabel>
                            <Input
                                defaultValue={indice ? indice.motivo : ''}
                                textTransform={'uppercase'}
                                type="text"
                                onChange={e =>
                                    setIndice({ ...indice, motivo: e.target.value.toUpperCase() })
                                }
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={e => handleUpdateMotivo(e)}
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
