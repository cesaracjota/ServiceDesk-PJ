import {
  Box,
  useColorModeValue,
  SimpleGrid,
  chakra,
  Flex,
  Icon,
  Button,
  VStack,
  Stack,
  Text,
  Image,
  Heading,
} from '@chakra-ui/react';

import { Link, NavLink } from 'react-router-dom';

import { BsPerson } from 'react-icons/bs';
import { HiOutlineDocumentReport } from "react-icons/hi"
import { CgChevronDoubleDown, CgChevronDoubleRight } from "react-icons/cg"
import { store } from '../../../store/store';

export default function Inicio() {

  const usuario = store.getState().auth;

  return (
    <>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <Stack spacing={4} w="full" direction={'column'}>
          <Box mx="auto" rounded="lg" shadow="md" bgGradient={usuario?.rol === "[COORDINADOR INFORMATICO]" ? 'linear(to-r, red.500, red.800)' : 'linear(to-r, blue.500, blue.800)'} color="white" w="full" pt={10} pb={14} px={10}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize={'2xl'} fontWeight="bold" textTransform="uppercase">{
                new Date().getHours() < 12 ? 'Buenos días' : new Date().getHours() < 18 ? 'Buenas tardes' : 'Buenas noches'
              }</Text>
              <Text textTransform="uppercase" fontSize="14px">{
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
                <NavLink to={'/dashboard/mis-incidencias'}>
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
        </Stack>
      </Flex>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow={'base'}
        mb={4}
        p={4}
        fontSize={['6px', '12px', '14px', '16px']}
        bg={useColorModeValue('white', 'gray.900')} >
        <SimpleGrid columns={[1, 1, 2, 2]} spacing={5}>
          <Flex
            w="full"
            _dark={{ bg: "gray.800", borderWidth: "1px" }}
            rounded="lg"
            overflow="hidden"
            justify={'space-between'}
            boxShadow={'base'}
            bgGradient={'linear(to-l, #4b749f, #243748)'}
          >
            <Box py={4} ml={4}>
              <VStack alignItems={'left'} spacing={2}>
                <chakra.span
                  color="white"
                  _dark={{ color: "white" }}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  REPORTES POR TÉCNICOS
                </chakra.span>
                <Link to='/dashboard/reportes/incidencias-por-tecnico'>
                  <Button
                    _focus={{ boxShadow: "none" }}
                    rightIcon={<CgChevronDoubleRight fontSize={"22px"} />}
                    size="sm"
                    _dark={{ color: "gray.200" }}
                    colorScheme="blackAlpha"
                    variant='solid'
                  >
                    INGRESAR
                  </Button>
                </Link>
              </VStack>
            </Box>
            <Flex justifyContent="center" alignItems="center" w={20}>
              <Icon as={BsPerson} color="white" boxSize={12} />
            </Flex>
          </Flex>

          <Flex
            w="full"
            _dark={{ bg: "gray.800", borderWidth: "1px" }}
            rounded="lg"
            overflow="hidden"
            justify={'space-between'}
            boxShadow={'base'}
            bgGradient={'linear(to-l, #456fe8, #3e3b92)'}
          >
            <Box py={4} ml={4}>
              <VStack spacing={2} alignItems={'left'}>
                <chakra.span
                  color="white"
                  _dark={{ color: "white" }}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  REPORTES POR USUARIOS
                </chakra.span>
                <Link to='/dashboard/reportes/incidencias-por-usuario'>
                  <Button
                    _focus={{ boxShadow: "none" }}
                    rightIcon={<CgChevronDoubleRight fontSize={"22px"} />}
                    size={'sm'}
                    _dark={{ color: "gray.200" }}
                    colorScheme="blackAlpha"
                    variant='solid'>
                    INGRESAR
                  </Button>
                </Link>
              </VStack>
            </Box>

            <Flex justifyContent="center" alignItems="center" w={20}>
              <Icon as={BsPerson} color="white" boxSize={12} />
            </Flex>
          </Flex>
          <Flex
            w="full"
            bg="white"
            _dark={{ bg: "gray.800", borderWidth: "1px" }}
            rounded="lg"
            overflow="hidden"
            justify={'space-between'}
            boxShadow={'base'}
            bgGradient={'linear(to-l, #43b692, #099773)'}
          >
            <Box py={4} ml={4}>
              <VStack spacing={2} alignItems={'left'}>
                <chakra.span
                  color="white"
                  _dark={{ color: "white" }}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  REPORTES POR TIEMPO
                </chakra.span>
                <Link to='/dashboard/reportes/incidencias-por-tiempos'>
                  <Button
                    _focus={{ boxShadow: "none" }}
                    rightIcon={<CgChevronDoubleRight fontSize={"22px"} />}
                    size={'sm'}
                    _dark={{ color: "gray.200" }}
                    colorScheme="blackAlpha"
                    variant='solid'>
                    INGRESAR
                  </Button>
                </Link>
              </VStack>
            </Box>

            <Flex justifyContent="center" alignItems="center" w={20}>
              <Icon as={HiOutlineDocumentReport} color="white" boxSize={12} />
            </Flex>
          </Flex>
        </SimpleGrid>
      </Box>
    </>
  );
}