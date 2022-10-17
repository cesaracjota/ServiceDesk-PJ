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
} from "@chakra-ui/react";

import { AddIcon } from '@chakra-ui/icons';

import { useDispatch } from 'react-redux'
import React, { useState } from "react"
import { createSede } from "../../../actions/sede"

const SedeAgregar = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    }

    const handleCloseModal = () => {
        setOpenCreate(false);
    };

    const initialSede = {
        idSede: null,
        sede: "",
        direccion: "",
        activo: "",
    }

    const [dataSede, setSede] = useState(initialSede);

    const { sede, direccion, activo } = dataSede;

    const saveSede = () => {
        dispatch(createSede({ sede, direccion, activo }))
            .then(() => {
                handleCloseModal(true);
            }).catch(err => {
                console.log(err);
                handleCloseModal(true);
            })
    }

    return (
        <>
            <Button leftIcon={<AddIcon />} size='sm' onClick={handleClickOpenCreate} colorScheme={'facebook'}>AGREGAR</Button>

            <Modal
                isOpen={openCreate}
                onClose={handleCloseModal}
                closeOnOverlayClick={true}
                size={'2xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>AGREGAR NUEVA SEDE</ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>SEDE</FormLabel>
                            <Input
                                onChange={(e) => { setSede({ ...dataSede, sede: (e.target.value).toUpperCase() }) }}
                                placeholder='Nombre de la sede'
                                textTransform={'uppercase'}
                                isRequired={true}
                                type={'text'} />
                        </FormControl>
                        <FormControl mt={4} isRequired>
                            <FormLabel>DIRECCIÓN</FormLabel>
                            <Input
                                onChange={(e) => { setSede({ ...dataSede, direccion: (e.target.value).toUpperCase() }) }}
                                placeholder='Av Arequipa 202'
                                textTransform={'uppercase'}
                                type={'text'}
                            />
                        </FormControl>
                        <FormControl mt={4} isRequired>
                            <FormLabel>ESTADO</FormLabel>
                            <Select
                                defaultValue={dataSede.activo = 'S'}
                                onChange={(e) => { setSede({ ...dataSede, activo: (e.target.value) }) }}
                            >
                                <option value='S'>ACTIVO</option>
                                <option value='N'>INACTIVO</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => saveSede()} colorScheme={'facebook'} autoFocus mr={3} _focus={{ boxShadow: "none" }}>
                            GUARDAR
                        </Button>
                        <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SedeAgregar;