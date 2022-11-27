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
import { createMensaje } from "../../../actions/mensaje";

export const CrearMensaje = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    }

    const handleCloseModal = () => {
        setOpenCreate(false);
    };

    const initialValues = {
        asunto: "",
        mensaje: "",
        persona: "",
        fechaHasta: "",
        activo: "",
    }

    const [indice, setIndice] = useState(initialValues);

    const saveMensaje = () => {
        var data = {
            asunto: indice.asunto,
            mensaje: indice.mensaje,
            persona: indice.persona === "" ? "AMBOS" : indice.persona,
            fechaHasta: indice.fechaHasta,
            activo: indice.activo === "" ? "S" : indice.activo,
        }
        dispatch(createMensaje(data))
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
                size='5xl'
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">AGREGAR NUEVO MENSAJE DE INFORMACIÓN MASIVA</ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel fontWeight="semibold">ASUNTO</FormLabel>
                            <Input
                                type="text"
                                placeholder="AGREGAR EL ASUNTO DEL MENSAJE"
                                onChange={e =>
                                    setIndice({ ...indice, asunto: e.target.value.toUpperCase() })
                                }
                                textTransform="uppercase"
                            />
                        </FormControl>
                        <FormControl isRequired mt={2}>
                            <FormLabel fontWeight="semibold">DESCRIPCIÓN MENSAJE</FormLabel>
                            <Textarea
                                onChange={(e) => { setIndice({ ...indice, mensaje: (e.target.value).toUpperCase() }) }}
                                textTransform={'uppercase'}
                                placeholder='Descripción'
                                type={'text'}
                            />
                        </FormControl>
                        <Stack direction={['column', 'column', 'row']} mt={2}>
                            <FormControl isRequired>
                                <FormLabel fontWeight="semibold">MOSTRAR HASTA</FormLabel>
                                <Input
                                    type="date"
                                    onChange={e =>
                                        setIndice({ ...indice, fechaHasta: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                                <Select
                                    onChange={e => setIndice({ ...indice, activo: e.target.value })}
                                >
                                    <option value='S'>ACTIVO</option>
                                    <option value='N'>INACTIVO</option>
                                </Select>
                            </FormControl>
                        </Stack>
                        <FormControl isRequired mt={2}>
                            <FormLabel fontWeight="semibold">PERSONA</FormLabel>
                            <Select
                                onChange={e => setIndice({ ...indice, persona: e.target.value })}
                            >
                                <option value='AMBOS'>AMBOS</option>
                                <option value='USUARIO_COMUN'>USUARIO COMÚN</option>
                                <option value='SOPORTE_TECNICO'>SOPORTE TÉCNICO</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            onClick={() => saveMensaje()} 
                            colorScheme={'facebook'} 
                            autoFocus mr={3}
                            disabled={indice.asunto === '' || indice.mensaje === '' || indice.fechaHasta === '' ? true : false}
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