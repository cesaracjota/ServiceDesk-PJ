import React, { useEffect, useState } from 'react'
import { Box, Flex, Link, chakra, Image, Text, Heading, Stack, Button, Avatar, Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom';
import { CgChevronDoubleDown } from 'react-icons/cg';
import { fetchFraseDia } from '../../../../actions/persona';

const HomeSoporte = () => {

    const [fraseDia, setFraseDia] = useState('');
    const [autorFrase, setAutorFrase] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchFrases = async () => {
        try {
            const response = await fetchFraseDia();
            setFraseDia(response.data.phrase);
            setAutorFrase((response.data.author).trimStart().split(" ").join(" "));
            setIsLoaded(true);
        } catch (error) {
            setFraseDia('No se pudo cargar la frase del día');
            setAutorFrase('Autor Anonimo');
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        fetchFrases();
    }, []);

    return (
        <>
            <Flex
                w="full"
                alignItems="center"
                justifyContent="center"
                mb={4}
            >
                <Stack spacing={4} w="full" direction={'column'}>
                    <Box mx="auto" rounded="lg" shadow="md" bgGradient='linear(to-r, green.500, green.800)' color="white" w="full" pt={10} pb={14} px={10}>
                        <Flex alignItems="center" justifyContent="space-between">
                            <Text fontSize={'2xl'} fontWeight="bold" textTransform="uppercase">{
                                new Date().getHours() < 12 ? 'Buenos días' : new Date().getHours() < 18 ? 'Buenas tardes' : 'Buenas noches'
                            }</Text>
                            <Text fontSize="14px" textTransform="uppercase">{
                                new Date().toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })
                            }</Text>
                        </Flex>
                        <Flex alignItems="center" justifyContent="space-between">
                            <Image src="https://material-kit-pro-react.devias.io/static/banner-illustration.png" alt="Service Desk" w="140px" display={['none', 'none', 'block', 'block']} />
                            <Stack spacing={2} direction={'column'}>
                                <Heading fontSize={'5xl'} fontWeight="extrabold">Bienvenido(a)</Heading>
                                <Text fontSize={'lg'}>Al Sistema de Gestion de Incidencias - Service Desk - Corte Superior de Justicia Arequipa</Text>
                                <NavLink to={'/dashboard/soporte/incidencias'}>
                                    <Button 
                                      colorScheme="blackAlpha" 
                                      rightIcon={<CgChevronDoubleDown fontSize="20px"/>} 
                                      variant="solid" 
                                      size="md" 
                                      w="full" 
                                      _focus={{ boxShadow: "none" }}
                                      mt={2}>
                                        IR A MIS INCIDENCIAS
                                    </Button>
                                </NavLink>
                            </Stack>
                        </Flex>
                    </Box>
                    <Box
                        mx="auto"
                        rounded="lg"
                        shadow="md"
                        bg="white"
                        _dark={{
                            bg: "gray.800",
                        }}
                        w="full"
                    >
                        <Skeleton
                            isLoaded={isLoaded}
                            bg='green.500'
                            color='white'
                            fadeDuration={1}
                            roundedTop="lg"
                        >

                            <Box
                                borderTopRadius={'lg'}
                                w="full"
                                h={"100px"}
                                fit="cover"
                                bgGradient='linear(to-r, #515ba4, #7582eb)'
                                
                            >
                                <Image
                                    roundedTop="lg"
                                    w="full"
                                    h={"100px"}
                                    fit="cover"
                                    visibility={['unset', 'unset', 'hidden']}
                                    src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                    alt="Article"
                                />
                            </Box>
                        </Skeleton>

                        <Box p={6}>
                            <Box>
                                <Skeleton noOfLines={1} height="40px" spacing="1" isLoaded={isLoaded}>
                                    <Link
                                        display="block"
                                        color="gray.800"
                                        _dark={{
                                            color: "white",
                                        }}
                                        fontWeight="bold"
                                        fontSize="2xl"
                                        _hover={{
                                            color: "gray.600",
                                            textDecor: "underline",
                                        }}
                                        mb={2}
                                    >
                                        FRASE DEL DÍA
                                    </Link>
                                </Skeleton>
                                <SkeletonText mt='4' noOfLines={2} spacing='4' isLoaded={isLoaded}>
                                    <chakra.p
                                        fontSize="lg"
                                        color="gray.600"
                                        _dark={{
                                            color: "gray.400",
                                        }}
                                        textAlign="justify"
                                    >
                                        "{fraseDia}"
                                    </chakra.p>
                                </SkeletonText>
                            </Box>

                            <Box mt={4} w="full">
                                <Flex alignItems="center" justifyContent={'end'}>
                                    <Flex alignItems="center">
                                        <SkeletonCircle size='8' isLoaded={isLoaded}>
                                            <Avatar
                                                size="sm"
                                                name={autorFrase}
                                                src={fraseDia?.author_photo}
                                            />
                                        </SkeletonCircle>
                                        <SkeletonText noOfLines={1} spacing='4' isLoaded={isLoaded}>
                                            <Link
                                                mx={2}
                                                fontWeight="bold"
                                                color="gray.700"
                                                _dark={{
                                                    color: "gray.200",
                                                }}
                                            >
                                                {autorFrase}
                                            </Link>
                                        </SkeletonText>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export default HomeSoporte;