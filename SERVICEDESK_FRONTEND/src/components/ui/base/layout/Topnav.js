import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Avatar,
    Box,
    Button,
    Center,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react'

import { AiFillMessage, AiFillSetting } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { FiChevronsDown } from 'react-icons/fi'
import { RiLogoutBoxRFill, RiMenu4Fill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { store } from '../../../../store/store';

import { ColorModeSwitcher } from '../../../../theme/ColorModeSwitcher';
import SidebarContent from './Sidebar';
import { LogOut } from '../../../../actions/auth';
import { IoMdNotifications } from 'react-icons/io';

const Topnav = (props) => {

    const usuario = store.getState().auth;

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Flex
                    as="header"
                    pos={{ base: "fixed", md: "fixed" }}
                    zIndex="2"
                    top="0"
                    align="center"
                    justify="space-between"
                    w="full"
                    px="4"
                    bg="gray.400"
                    _dark={{ bg: "#181a1b" }}
                    borderBottomWidth="1px"
                    color="inherit"
                    boxShadow={'sm'}
                    py={4}
                    css={{
                        // para especificar el background de la cabecera, para ajustar el transparente
                        backdropFilter: 'saturate(180%) blur(50px)',
                        backgroundColor: useColorModeValue('rgba(256, 256, 256, 0.90)', 'rgba(26, 32, 44, 0.10)')
                    }}
                >
                    <Drawer
                        isOpen={props.isOpen}
                        onClose={props.onClose}
                        placement="left"
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <SidebarContent rol={usuario?.rol} w="full" borderRight="none" />
                        </DrawerContent>
                    </Drawer>
                    <IconButton
                        aria-label="Menu"
                        display={{ base: "inline-flex", lg: "none" }}
                        onClick={props.onOpen}
                        icon={<RiMenu4Fill />}
                        fontSize="2xl"
                        size="lg"
                        variant="ghost"
                    />
                    <Flex alignSelf="center" verticalAlign={'center'} justify={'flex-end'} w={'full'} display="inline-flex">
                        <Link as={NavLink} to="/dashboard/correos">
                            <IconButton
                                size="lg"
                                fontSize="2xl"
                                variant="ghost"
                                aria-label="open email"
                                icon={<MdEmail />}
                            />
                        </Link>
                        <IconButton
                            size="lg"
                            fontSize="2xl"
                            aria-label={'Notificaciones'}
                            variant="ghost"
                            marginLeft="2"
                            icon={<IoMdNotifications />}
                        />
                        <ColorModeSwitcher />
                        <Menu>
                            <MenuButton>
                                <HStack>
                                    <Avatar
                                        size="sm"
                                        fontSize={'xs'}
                                        ml="6"
                                        cursor="pointer"
                                        fontWeight={'extrabold'}
                                        color={'white'}
                                        bg={
                                            usuario?.rol === "[COORDINADOR INFORMATICO]" ? 'red.600'
                                                :
                                                usuario?.rol === "[ASISTENTE INFORMATICO]" ? 'blue.600'
                                                    :
                                                    usuario?.rol === "[SOPORTE TECNICO]" ? 'green.600'
                                                        :
                                                        'gray.600'
                                        }
                                        name={usuario?.nombres + ' ' + usuario?.apellidos}
                                    />
                                    <VStack
                                        display={{ base: 'none', md: 'flex' }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2"
                                    >
                                        <Text fontSize="sm" fontWeight={'semibold'}>{usuario?.nombres + ' ' + usuario?.apellidos}</Text>
                                        <Text fontSize="xs" color="gray.600">
                                            {usuario?.rol}
                                        </Text>
                                    </VStack>
                                    <Box display={{ base: 'none', md: 'flex' }}>
                                        <FiChevronsDown ml={2} />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}
                                alignItems={'center'}
                                bgSize={'md'}
                                zIndex="50"
                            >
                                <Center>
                                    <Avatar
                                        size={'lg'}
                                        color={'white'}
                                        fontWeight={'black'}
                                        boxShadow={'base'}
                                        bg={usuario?.rol === "[COORDINADOR INFORMATICO]" ? 'red.600' : usuario?.rol === "[ASISTENTE INFORMATICO]" ? 'blue.600' : usuario?.rol === "[SOPORTE TECNICO]" ? 'green.600' : 'gray.600'}
                                        name={usuario?.nombres + ' ' + usuario?.apellidos}
                                    />
                                </Center>
                                <Center>
                                    <VStack mt="2" mb="2">
                                        <Text fontSize="sm" mx={8} fontWeight="semibold">{usuario?.nombres + ' ' + usuario?.apellidos}</Text>
                                        <Text fontSize="xs" color="gray.600">{usuario?.rol}</Text>
                                    </VStack>
                                </Center>
                                <MenuDivider />
                                <Link as={NavLink} to="/dashboard/mi-perfil" _hover={{ textDecoration: 'none' }}>
                                    <MenuItem icon={<FaUserCircle size={20} />}>Mi Perfil</MenuItem>
                                </Link>
                                {(usuario?.rol === '[COORDINADOR INFORMATICO]' || usuario?.rol === '[ASISTENTE INFORMATICO]') ? (
                                    <>
                                        <Link as={NavLink} to="/dashboard/configuraciones" _hover={{ textDecoration: 'none' }}>
                                            <MenuItem icon={<AiFillSetting size={20} />} mr={10}>Configuraciones</MenuItem>
                                        </Link>
                                        <Link as={NavLink} to="/dashboard/mensajes" _hover={{ textDecoration: 'none' }}>
                                            <MenuItem icon={<AiFillMessage size={20} />} mr={10}>Crear Mensaje para Soportes T.</MenuItem>
                                        </Link>
                                    </>
                                ) : null}
                                <MenuDivider />
                                <ModalCerrarSesion />
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default Topnav


const ModalCerrarSesion = () => {

    const dispatch = useDispatch();
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => {
      setOpenModal(true);
    }
  
    const handleCloseModal = () => {
      setOpenModal(false);
    }
  
    const handleLogout = (e) => {
      e.preventDefault();
      localStorage.setItem('chakra-ui-color-mode', 'light');
      dispatch(LogOut());
    };
  
    return (
      <>
        <MenuItem onClick={handleOpenModal} icon={<RiLogoutBoxRFill size={20} />}>Cerrar Sesión</MenuItem>
        <AlertDialog
          motionPreset='slideInBottom'
          onClose={handleCloseModal}
          isOpen={openModal}
          size="xl"
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>CERRAR SESIÓN</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              ¿ESTÁS SEGURO DE CERRAR SESIÓN?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCloseModal} >
                NO
              </Button>
              <Button colorScheme='red' ml={3} onClick={handleLogout} >
                SI
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }
  