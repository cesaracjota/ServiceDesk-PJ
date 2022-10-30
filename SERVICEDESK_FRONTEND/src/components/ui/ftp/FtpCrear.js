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
    Select,
    Textarea,
    Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useDispatch } from 'react-redux'
import React, { useState } from "react"
import { createFtp } from "../../../actions/ftp"

const FtpAgregar = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    }

    const handleCloseModal = () => {
        setOpenCreate(false);
    };

    const initialValues = {
        usuario: "",
        clave: "",
        descripcion: "",
        ip: "",
        estado: "",
    }

    const [indice, setIndice] = useState(initialValues);

    const saveFtp = () => {
        var data = {
            usuario: indice.usuario,
            clave: indice.clave,
            descripcion: indice.descripcion,
            ip: indice.ip,
            estado: indice.estado,
        }
        dispatch(createFtp(data))
            .then(() => {
                handleCloseModal(true);
            }).catch(err => {
                console.log(err);
                handleCloseModal(true);
            })
    }

    return (
        <>
            <Button leftIcon={<AddIcon />} size='sm' onClick={handleClickOpenCreate} colorScheme={'facebook'} >AGREGAR</Button>

            <Modal
                isOpen={openCreate}
                onClose={handleCloseModal}
                closeOnOverlayClick={true}
                size='3xl'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">AGREGAR NUEVA CONFIGURACIÓN FTP</ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody>
                        <Stack direction={['column', 'column', 'row']}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">USUARIO</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="@_USUARIO"
                                    onChange={e =>
                                        setIndice({ ...indice, usuario: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold">CLAVE</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="@_CLAVE ****"
                                    onChange={e =>
                                        setIndice({ ...indice, clave: e.target.value })
                                    }
                                />
                            </FormControl>
                        </Stack>
                        <FormControl isRequired mt={2}>
                            <FormLabel fontWeight="semibold">DESCRIPCIÓN</FormLabel>
                            <Textarea
                                onChange={(e) => { setIndice({ ...indice, descripcion: (e.target.value).toUpperCase() }) }}
                                textTransform={'uppercase'}
                                placeholder='Descripción'
                                rows={2}
                                type={'text'} />
                        </FormControl>
                        <Stack direction={['column', 'column', 'row']} mt={2}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">IP</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="IP RED"
                                    onChange={e =>
                                        setIndice({ ...indice, ip: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                                <Select
                                    defaultValue={indice.estado = 'S'}
                                    onChange={(e) => { setIndice({ ...indice, estado: (e.target.value) }) }}
                                >
                                    <option value='S'>ACTIVO</option>
                                    <option value='N'>INACTIVO</option>
                                </Select>
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            onClick={() => saveFtp()} 
                            colorScheme={'facebook'} 
                            autoFocus mr={3} 
                            
                            disabled={indice.usuario === '' || indice.clave === '' || indice.descripcion === '' || indice.ip === '' ? true : false}
                            >
                            GUARDAR
                        </Button>
                        <Button onClick={handleCloseModal}  colorScheme="red" variant="outline">CANCELAR</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default FtpAgregar;