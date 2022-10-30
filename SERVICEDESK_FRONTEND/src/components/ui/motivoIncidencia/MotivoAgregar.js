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
import { createMotivo } from "../../../actions/motivo"

const MotivoAgregar = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    }

    const handleCloseModal = () => {
        dataMotivo.motivo = "";
        setOpenCreate(false);
    };

    const initialMotivo = {
        idMotivo: null,
        motivo: "",
    }

    const [dataMotivo, setMotivo] = useState(initialMotivo);

    const { motivo } = dataMotivo;

    const saveMotivo = () => {
        dispatch(createMotivo({ motivo }))
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
                    <ModalHeader>AGREGAR NUEVO MOTIVO PARA LA INCIDENCIA</ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel fontWeight="semibold">MOTIVO</FormLabel>
                            <Input
                                textTransform={'uppercase'}
                                onChange={(e) => { setMotivo({ ...dataMotivo, motivo: (e.target.value).toUpperCase() }) }}
                                placeholder='MOTIVO DE INCIDENCIA'
                                isRequired={true}
                                type={'text'} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            onClick={() => saveMotivo()} 
                            colorScheme={'facebook'} 
                            autoFocus mr={3} 
                            
                            disabled = { dataMotivo.motivo === "" ? true : false }
                        >
                            GUARDAR
                        </Button>
                        <Button onClick={handleCloseModal}  colorScheme="red" variant={'outline'}>CANCELAR</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MotivoAgregar;