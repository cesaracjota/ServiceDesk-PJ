import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NotFounPage = () => {

    const { rol } = useSelector(state => state.auth);

    return (
        <>
        <Box width={'full'} height='100vh'>
            <Center w='full' h={'full'}>
                <VStack spacing={5}>
                    <Text fontSize='6xl' fontWeight='bold'>404</Text>
                    <Text fontSize='3xl' fontWeight='bold'>Page not found</Text>
                    <NavLink to={
                         rol === '[COORDINADOR INFORMATICO]' || rol === '[ASISTENTE INFORMATICO]'
                        ? "/dashboard/home"
                        : rol === '[SOPORTE TECNICO]'
                        ? "/dashboard/soporte-tecnico/home"
                        : rol === '[USUARIO COMUN]'
                        ? "/dashboard/usuario/home"
                        : "/dashboard/usuario/home"
                    }>
                        <Button colorScheme='blue' size={'lg'} variant='outline' >Regresar a inicio</Button>
                    </NavLink>
                </VStack>
            </Center>
        </Box>
        </>
    )
}

export default NotFounPage;