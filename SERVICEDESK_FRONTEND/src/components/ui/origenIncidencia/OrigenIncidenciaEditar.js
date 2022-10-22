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
import { updateOrigen } from '../../../actions/origenIncidencia';

export const OrigenIncidenciaEditar = ({ row }) => {
    const [openedit, setOpenEdit] = React.useState(false);
    const dispatch = useDispatch();

    const [indice, setIndice] = useState({
        idOrigen: null,
        origen: '',
    });

    const handleClickOpenEdit = index => {
        setIndice(index);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleClickUpdate = e => {
        e.preventDefault();
        dispatch(updateOrigen(indice))
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
                        EDITAR EL ORIGEN DE LA INCIDENCIA
                    </ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={indice ? indice.idOrigen : ''}
                                disabled={true}
                                type="text"
                                hidden={true}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="semibold">ORIGEN</FormLabel>
                            <Input
                                defaultValue={indice ? indice.origen : ''}
                                textTransform={'uppercase'}
                                type="text"
                                onChange={e =>
                                    setIndice({ ...indice, origen: e.target.value.toUpperCase() })
                                }
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={e => handleClickUpdate(e)}
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
