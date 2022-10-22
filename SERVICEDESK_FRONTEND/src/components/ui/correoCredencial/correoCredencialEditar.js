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
    Stack,
    HStack,
    Tag,
    TagLabel,
    TagRightIcon,
} from '@chakra-ui/react';

import { AiTwotoneEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { updateCorreoCredencial } from '../../../actions/correoCredencial';
import { FiAlertCircle } from 'react-icons/fi';

export const CorreoCredencialEditar = ({ row }) => {
    const [openedit, setOpenEdit] = React.useState(false);
    const dispatch = useDispatch();

    let fechaActual = new Date();

    const [indice, setIndice] = useState({
        idCorreoCredenciales: null,
        correo: "",
        password: "",
        fecha: fechaActual.toISOString().split('T')[0],
        activo: "",
    });

    const handleClickOpenEdit = (index) => {
        setIndice(index);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const actualizarCorreoCredencial = (e) => {
        e.preventDefault();
        dispatch(updateCorreoCredencial(indice))
            .then(() => {
                handleCloseEdit(true);
            })
            .catch(e => {
                // console.log(e);
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
                mr={2}
            />
            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'3xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">
                        EDITAR CREDENCIALES DEL CORREO
                    </ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={indice ? indice.id : ''}
                                disabled={true}
                                type="text"
                                hidden={true}
                            />
                        </FormControl>
                        <HStack justifyContent="center" w="full" mb="6">
                            <Tag size={'md'} colorScheme='red' textAlign={'center'}>
                                <TagLabel>MUY IMPORTANTE SU CORREO TIENE QUE ESTAR CONFIGURADO</TagLabel>
                                <TagRightIcon as={FiAlertCircle} fontSize="md" />
                            </Tag>
                        </HStack>
                        <Stack direction={['column', 'column', 'row']}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">CORREO</FormLabel>
                                <Input
                                    defaultValue={indice ? indice.correo : ''}
                                    type="text"
                                    onChange={e =>
                                        setIndice({ ...indice, correo: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel fontWeight="semibold">CONTRASEÑA</FormLabel>
                                <Input
                                    defaultValue={indice ? indice.password : ''}
                                    type="password"
                                    onChange={e =>
                                        setIndice({ ...indice, password: e.target.value })
                                    }
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={'column'} mt={2}>
                            <FormControl>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={e => actualizarCorreoCredencial(e)}
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