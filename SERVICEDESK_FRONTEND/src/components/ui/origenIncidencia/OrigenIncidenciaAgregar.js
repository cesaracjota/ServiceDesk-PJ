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
} from "@chakra-ui/react";

import { AddIcon } from '@chakra-ui/icons';

import { useDispatch } from 'react-redux'
import React, { useState } from "react"
import { createOrigen } from "../../../actions/origenIncidencia"

const OrigenAgregar = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    }

    const handleCloseModal = () => {
        dataOrigen.origen = "";
        setOpenCreate(false);
    };

    const initialOrigen = {
        idOrigen: null,
        origen: "",
    }

    const [dataOrigen, setOrigen] = useState(initialOrigen);

    const { origen } = dataOrigen;

    const saveOrigen = () => {
        dispatch(createOrigen({ origen }))
            .then(() => {
                handleCloseModal(true);
            }).catch(err => {
                console.log(err);
                handleCloseModal(true);
            })
    }

    return (
        <>
            <Button leftIcon={<AddIcon />} size='sm' onClick={handleClickOpenCreate} colorScheme={'facebook'} >NUEVO</Button>

            <Modal
                isOpen={openCreate}
                onClose={handleCloseModal}
                closeOnOverlayClick={true}
                size={'2xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>AGREGAR NUEVO ORIGEN PARA LA INCIDENCIA</ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel fontWeight="semibold">ORIGEN</FormLabel>
                            <Input
                                textTransform={'uppercase'}
                                onChange={(e) => { setOrigen({ ...dataOrigen, origen: e.target.value.toUpperCase() }) }}
                                placeholder='ORIGEN DE INCIDENCIA'
                                isRequired={true}
                                type={'text'} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            onClick={() => saveOrigen()} 
                            colorScheme={'facebook'}
                            autoFocus mr={3} 
                            
                            disabled = { dataOrigen.origen === "" ? true : false }
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

export default OrigenAgregar;