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
    Stack,
    HStack,
    Tag,
    TagLabel,
    TagRightIcon,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useDispatch } from 'react-redux'
import React, { useState } from "react"
import { createCorreoCredencial } from "../../../actions/correoCredencial";
import { FiAlertCircle } from "react-icons/fi";

const CorreoCredencialAgregar = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    }

    const handleCloseModal = () => {
        setOpenCreate(false);
    };

    const initialValues = {
        correo: "",
        password: "",
    }

    const [indice, setIndice] = useState(initialValues);

    const saveCorreoCredencial = () => {
        var data = {
            correo: indice.correo,
            password: indice.password,
        }
        dispatch(createCorreoCredencial(data))
            .then(() => {
                handleCloseModal(true);
            }).catch(err => {
                // console.log(err);
                handleCloseModal(true);
            })
    }

    return (
        <>
            <Button leftIcon={<AddIcon />} size='sm' onClick={handleClickOpenCreate} colorScheme={'facebook'} _focus={{ boxShadow: "none" }}>AGREGAR</Button>

            <Modal
                isOpen={openCreate}
                onClose={handleCloseModal}
                closeOnOverlayClick={true}
                size='3xl'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>AGREGAR NUEVA CREDENCIAL</ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody>
                        <HStack justifyContent="center" w="full" mb="2">
                            <Tag size={'md'} colorScheme='red' textAlign={'center'}>
                                <TagLabel>MUY IMPORTANTE SU CORREO TIENE QUE ESTAR CONFIGURADO</TagLabel>
                                <TagRightIcon as={FiAlertCircle} fontSize="md" />
                            </Tag>
                        </HStack>
                        <Stack direction={['column']}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">CORREO</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="CORREO ELECTRÓNICO"
                                    onChange={e =>
                                        setIndice({ ...indice, correo: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold">CONTRASEÑA DEL CORREO</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="PASSWORD ****"
                                    onChange={e =>
                                        setIndice({ ...indice, password: e.target.value })
                                    }
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            onClick={() => saveCorreoCredencial()} 
                            colorScheme={'facebook'} 
                            autoFocus mr={3} 
                            _focus={{ boxShadow: "none" }}
                            disabled={indice.correo === "" || indice.password === "" ? true : false}
                            >
                            GUARDAR
                        </Button>
                        <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CorreoCredencialAgregar;