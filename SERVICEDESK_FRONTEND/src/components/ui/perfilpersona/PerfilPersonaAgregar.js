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
    Textarea,
    Select,
} from "@chakra-ui/react";

import { AddIcon } from '@chakra-ui/icons';

import { useDispatch } from 'react-redux'
import React, { useState } from "react"
import { createPerfilPersona } from "../../../actions/perfilPersona"

const PerfilPersonaAgregar = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    }

    const handleCloseModal = () => {
        setOpenCreate(false);
    };

    const initialPerfil = {
        idPerfilPersona: null,
        perfil: "",
        descripcion: "",
        activo: "",
    }

    const [userperfil, setPerfil] = useState(initialPerfil);

    const { perfil, descripcion, activo } = userperfil;

    const savePerfil = () => {
        dispatch(createPerfilPersona({ perfil, descripcion, activo }))
            .then(() => {
                handleCloseModal(true);
            }).catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <Button leftIcon={<AddIcon />} size='sm' onClick={handleClickOpenCreate} colorScheme={'facebook'} _focus={{ boxShadow: "none" }}>AGREGAR</Button>

            <Modal
                isOpen={openCreate}
                onClose={handleCloseModal}
                size={'3xl'}
            >
                <ModalOverlay />
                <form>
                    <ModalContent>
                        <ModalHeader>AGREGAR NUEVO PERFIL</ModalHeader>
                        <ModalCloseButton _focus={{ boxShadow: "none" }} />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">PERFIL</FormLabel>
                                <Input
                                    onChange={(e) => { setPerfil({ ...userperfil, perfil: (e.target.value).toUpperCase() }) }}
                                    placeholder='Perfil'
                                    type={'text'}
                                    textTransform={'uppercase'}
                                />
                            </FormControl>
                            <FormControl mt={4} isRequired={true}>
                                <FormLabel fontWeight="semibold">DESCRIPCIÓN</FormLabel>
                                <Textarea
                                    onChange={(e) => { setPerfil({ ...userperfil, descripcion: (e.target.value).toUpperCase() }) }}
                                    placeholder='Descripcion'
                                    textTransform={'uppercase'}
                                    rows={1}
                                />
                            </FormControl>
                            <FormControl mt={4} isRequired>
                                <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                                <Select
                                    defaultValue={userperfil.activo = 'S'}
                                    onChange={(e) => { setPerfil({ ...userperfil, activo: (e.target.value) }) }}
                                >
                                    <option value='S'>ACTIVO</option>
                                    <option value='N'>INACTIVO</option>
                                </Select>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type={'submit'} onClick={() => savePerfil()} colorScheme={'facebook'} mr={3} _focus={{ boxShadow: "none" }}>
                                GUARDAR
                            </Button>
                            <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default PerfilPersonaAgregar;