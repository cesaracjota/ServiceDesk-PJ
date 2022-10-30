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
import { updateFtp } from '../../../actions/ftp';

export const FtpEditar = ({ row }) => {
    const [openedit, setOpenEdit] = React.useState(false);
    const dispatch = useDispatch();

    const [indice, setIndice] = useState({
        id: null,
        descripcion: "",
        estado: "",
        ip: "",
        usuario: "",
        clave: "",
    });

    const handleClickOpenEdit = (index) => {
        setIndice(index);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const actualizarFtp = (e) => {
        e.preventDefault();
        dispatch(updateFtp(indice))
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
                
            />
            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'3xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">
                        EDITAR FTP CONFIGURACIÓN
                    </ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={indice ? indice.id : ''}
                                disabled={true}
                                type="text"
                                hidden={true}
                            />
                        </FormControl>
                        <Stack direction={['column', 'column', 'row']}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">USUARIO</FormLabel>
                                <Input
                                    defaultValue={indice ? indice.usuario : ''}
                                    type="text"
                                    onChange={e =>
                                        setIndice({ ...indice, usuario: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl mt={2}>
                                <FormLabel fontWeight="semibold">CLAVE</FormLabel>
                                <Input
                                    defaultValue={indice ? indice.clave : ''}
                                    type="password"
                                    onChange={e =>
                                        setIndice({ ...indice, clave: e.target.value })
                                    }
                                />
                            </FormControl>
                        </Stack>
                        <FormControl mt={2}>
                            <FormLabel fontWeight="semibold">DESCRIPCIÓN</FormLabel>
                            <Textarea
                                defaultValue={indice ? indice.descripcion : ''}
                                type="text"
                                rows={2}
                                textTransform={'uppercase'}
                                onChange={e =>
                                    setIndice({ ...indice, descripcion: e.target.value.toUpperCase() })
                                }
                            />
                        </FormControl>
                        <Stack direction={['column', 'column', 'row']} mt={2}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">IP</FormLabel>
                                <Input
                                    defaultValue={indice ? indice.ip : ''}
                                    type="text"
                                    onChange={e =>
                                        setIndice({ ...indice, ip: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                                <Select
                                    defaultValue={indice ? indice.estado : ''}
                                    onChange={e =>
                                        setIndice({ ...indice, estado: e.target.value })
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
                            onClick={e => actualizarFtp(e)}
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