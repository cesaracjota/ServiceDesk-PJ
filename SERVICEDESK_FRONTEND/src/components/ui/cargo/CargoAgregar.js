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
import { AddIcon } from "@chakra-ui/icons";

import { useDispatch } from 'react-redux'
import React, { useState } from "react"
import { createCargo } from "../../../actions/cargo"

const CargoAgregar = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    }

    const handleCloseModal = () => {
        setOpenCreate(false);
    };

    const initialSede = {
        idCargo: null,
        cargo: "",
        activo: "",
    }

    const [dataCargo, setCargo] = useState(initialSede);

    const { cargo, activo } = dataCargo;

    const saveCargo = () => {
        dispatch(createCargo({ cargo, activo }))
            .then(() => {
                handleCloseModal(true);
            }).catch(err => {
                // console.log(err);
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
                    <ModalHeader textAlign="center">AGREGAR NUEVO CARGO</ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>CARGO</FormLabel>
                            <Input
                                onChange={(e) => { setCargo({ ...dataCargo, cargo: (e.target.value).toUpperCase() }) }}
                                textTransform={'uppercase'}
                                placeholder='Cargo'
                                isRequired={true}
                                type={'text'} />
                        </FormControl>
                        <FormControl mt={4} isRequired>
                            <FormLabel fontWeight={'bold'}>ESTADO</FormLabel>
                            <Select
                                defaultValue={dataCargo.activo = 'S'}
                                onChange={(e) => { setCargo({ ...dataCargo, activo: (e.target.value) }) }}
                            >
                                <option value='S'>ACTIVO</option>
                                <option value='N'>INACTIVO</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            onClick={() => saveCargo()} 
                            colorScheme={'facebook'} 
                            autoFocus 
                            mr={3} 
                            
                            disabled={cargo === '' ? true : false}
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

export default CargoAgregar;