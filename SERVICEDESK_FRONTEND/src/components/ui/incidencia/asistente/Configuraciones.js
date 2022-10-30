import React, { useState } from 'react';
import { Box, Divider, HStack, List, ListItem, Stack, Switch, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { useDispatch} from 'react-redux';
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import { store } from '../../../../store/store';
import { SettingsIcon } from '@chakra-ui/icons';
import { ActualizarEstadoBoton } from '../../../../actions/configurarBotones';

const Configuraciones = () => {

    const data = store.getState().configuracionBotones.rows;

    return (
        <>
            <Box bg="white" _dark={{ bg: 'gray.900' }} w="full" p={4} borderRadius="md" borderWidth="1px">
                <Text fontSize="lg" fontWeight="bold">CONFIGURACION DE BOTONES</Text>
            </Box>

            <Divider my={2} />

            <Box bg="white" _dark={{ bg: 'gray.900' }} w="full" px={6} py={10} borderRadius="md" borderWidth="1px">
                <Stack direction="column" spacing={3} w="full">
                    {data.map((item) => (
                        <List key={item?.idConfigucacionBoton}>
                            <ListItem key={item?.idConfigucacionBoton}>
                                <Stack direction="row" justifyContent="space-between" key={item?.idConfigucacionBoton} spacing={3}>
                                    <HStack spacing={2} >
                                        <SettingsIcon boxSize={8} color='red.600'/>
                                        <Text textTransform={'uppercase'} fontSize="sm">{item?.nombre}</Text>
                                    </HStack>
                                    <AlertConfirmButton row = {item} />
                                </Stack>
                            </ListItem>
                            <Divider mt={4} />
                        </List>
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default Configuraciones;

// Alert para Confirmar los cambios de la configuracion

const AlertConfirmButton = ({ row }) => {

    const dispatch = useDispatch();

    const variant = useColorModeValue('left-accent', 'solid');

    const toast = useToast();

    const [openAlertAdd, setOpenAlertAdd] = useState(false);

    const handleOpenAlertAddButton = () => {
        setOpenAlertAdd(true);
    }

    const handleCloseAlertAddButton = () => {
        setOpenAlertAdd(false);
    }

    const handleConfirmar = async () => {
        await dispatch(ActualizarEstadoBoton(row.idConfigucacionBoton)).then(() => {
            toast({
                title: "Configuracion",
                description: "Se ha actualizado correctamente el estado de la configuracion",
                status: "success",
                duration: 3000,
                isClosable: true,
                variant: variant,
                position: "top-right",
            })
        }).catch(() => {
            toast({
                title: "Configuracion",
                description: "No se ha podido actualizar el estado de la configuracion",
                status: "error",
                duration: 3000,
                isClosable: true,
                variant: variant,
                position: "top-right",
            })
        }) 
        setOpenAlertAdd(false);
    }

    return (
        <>
            <Switch 
                size="lg"
                isChecked={ row?.activo === 'S' ? true : false } 
                value={ row?.activo }
                colorScheme="red"
                onChange={handleOpenAlertAddButton} 
            />

            <AlertDialog isOpen={openAlertAdd} onClose={handleCloseAlertAddButton} size={'3xl'}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="xl" fontWeight="bold">
                            ¿CONFIRMAR LA ACCIÓN?
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            ¿CONFIRMAR LA ACCIÓN?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={handleCloseAlertAddButton} colorScheme="red" variant="outline">CANCELAR</Button>
                            <Button
                                colorScheme="green"
                                ml={3}
                                onClick={handleConfirmar}
                            >
                                CONFIRMAR
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}