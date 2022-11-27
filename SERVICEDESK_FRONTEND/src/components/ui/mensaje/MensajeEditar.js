import React, { useState } from 'react'
import {
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
    Select,
    IconButton,
    Button,
    Textarea,
    Stack,
} from '@chakra-ui/react';

import { AiTwotoneEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { updateMensaje } from '../../../actions/mensaje';

export const MensajeEditar = ({ row }) => {

    const [openedit, setOpenEdit] = useState(false);
    const dispatch = useDispatch();

    const [indice, setIndice] = useState({
        idMensaje: null,
        asunto: "",
        persona: "",
        mensaje: "",
        fechaHasta: "",
        activo: "",
    });

    const handleClickOpenEdit = (index) => {
        setIndice(index);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const actualizarMensaje = (e) => {
        e.preventDefault();
        dispatch(updateMensaje(indice))
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
                scrollBehavior="inside"
            />
            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'4xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">
                        EDITAR MENSAJES DE INFORMACIÓN MASIVA
                    </ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={indice ? indice.idMensaje : ''}
                                disabled={true}
                                type="text"
                                hidden={true}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontWeight="semibold">ASUNTO</FormLabel>
                            <Input
                                defaultValue={indice ? indice.asunto : ''}
                                type="text"
                                onChange={e =>
                                    setIndice({ ...indice, asunto: e.target.value.toUpperCase() })
                                }
                                textTransform="uppercase"
                            />
                        </FormControl>
                        <FormControl mt={2} isRequired>
                            <FormLabel fontWeight="semibold">DESCRIPCIÓN MENSAJE</FormLabel>
                            <Textarea
                                defaultValue={indice ? indice.mensaje : ''}
                                type="text"
                                textTransform={'uppercase'}
                                onChange={e =>
                                    setIndice({ ...indice, mensaje: e.target.value.toUpperCase() })
                                }
                            />
                        </FormControl>
                        <Stack direction={['column', 'column', 'row']} mt={2}>
                            <FormControl isRequired>
                                <FormLabel fontWeight="semibold">MOSTRAR HASTA</FormLabel>
                                <Input
                                    defaultValue={indice ? indice.fechaHasta : ''}
                                    type="date"
                                    onChange={e =>
                                        setIndice({ ...indice, fechaHasta: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired>
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
                        </Stack>
                        <FormControl isRequired mt={2}>
                            <FormLabel fontWeight="semibold">PERSONA</FormLabel>
                            <Select
                                defaultValue={indice ? indice.persona : ''}
                                onChange={(e) => { setIndice({ ...indice, persona: (e.target.value) }) }}
                            >
                                <option value='AMBOS'>AMBOS</option>
                                <option value='USUARIO_COMUN'>USUARIO COMÚN</option>
                                <option value='SOPORTE_TECNICO'>SOPORTE TÉCNICO</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={e => actualizarMensaje(e)}
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