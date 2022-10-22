import React from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  useColorMode,
  MenuList,
  Center,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Link,
} from '@chakra-ui/react';

import {
  FiMenu,
  FiBell,
  FiMail,
  FiChevronsDown,
} from 'react-icons/fi';

import {
  FaBox,
  FaBuilding,
  FaExclamationCircle,
  FaMap,
  FaMapMarkedAlt,
  FaQuestionCircle,
  FaTachometerAlt,
  FaUserAlt,
  FaUsers,
  FaBrain,
  FaUserCircle
} from 'react-icons/fa';

import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { HiViewBoards } from 'react-icons/hi';

import { NavLink } from 'react-router-dom';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { store } from '../../../store/store';
import { LogOut } from '../../../actions/auth';
import { useDispatch } from 'react-redux';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { AiFillSetting } from 'react-icons/ai';

const LinkItemsCoordinadorInformatico = [
  { name: 'INICIO', icon: FaTachometerAlt, ruta: '/dashboard/home' },
  { name: 'MIS INCIDENCIAS', icon: HiViewBoards, ruta: '/dashboard/mis-incidencias' },
  { name: 'TODAS LAS INCIDENCIAS', icon: HiViewBoards, ruta: '/dashboard/incidencias' },
  { name: 'INCIDENCIAS ASIGNADAS', icon: ImCheckboxChecked, ruta: '/dashboard/incidencias-asignadas' },
  { name: 'INCIDENCIAS NO ASIG.', icon: ImCheckboxUnchecked, ruta: '/dashboard/incidencias-no-asignadas' },
  { name: 'MOTIVO INCIDENCIA', icon: FaQuestionCircle, ruta: '/dashboard/motivos' },
  { name: 'ORIGEN INCIDENCIA', icon: FaExclamationCircle, ruta: '/dashboard/origen-incidencia' },
  { name: 'PERFILES USUARIO', icon: FaUserAlt, ruta: '/dashboard/perfil' },
  { name: 'SEDE', icon: FaMapMarkedAlt, ruta: '/dashboard/sedes' },
  { name: 'ÓRGANOS', icon: FaMap, ruta: '/dashboard/organos' },
  { name: 'OFICINAS', icon: FaBuilding, ruta: '/dashboard/oficinas' },
  { name: 'USUARIOS', icon: FaUsers, ruta: '/dashboard/personas' },
  { name: 'TABLA DE CONOCIMIENTO', icon: FaBrain, ruta: '/dashboard/tabla-conocimiento' },
  { name: 'CARGOS', icon: FaBox, ruta: '/dashboard/cargos' },
  { name: 'FTP', icon: FaBox, ruta: '/dashboard/ftp' },
  { name: 'CORREO CREDENCIAL', icon: FaBox, ruta: '/dashboard/correo-credencial' },
];

const LinkItemsAsistenteInformatico = [
  { name: 'INICIO', icon: FaTachometerAlt, ruta: '/dashboard/home' },
  { name: 'MIS INCIDENCIAS', icon: HiViewBoards, ruta: '/dashboard/mis-incidencias' },
  { name: 'TODAS LAS INCIDENCIAS', icon: HiViewBoards, ruta: '/dashboard/incidencias' },
  { name: 'INCIDENCIAS ASIGNADAS', icon: ImCheckboxChecked, ruta: '/dashboard/incidencias-asignadas' },
  { name: 'INCIDENCIAS NO ASIG.', icon: ImCheckboxUnchecked, ruta: '/dashboard/incidencias-no-asignadas' },
  { name: 'MOTIVO INCIDENCIA', icon: FaQuestionCircle, ruta: '/dashboard/motivos' },
  { name: 'ORIGEN INCIDENCIA', icon: FaExclamationCircle, ruta: '/dashboard/origen-incidencia' },
  { name: 'PERFILES USUARIO', icon: FaUserAlt, ruta: '/dashboard/perfil' },
  { name: 'SEDE', icon: FaMapMarkedAlt, ruta: '/dashboard/sedes' },
  { name: 'ÓRGANOS', icon: FaMap, ruta: '/dashboard/organos' },
  { name: 'OFICINAS', icon: FaBuilding, ruta: '/dashboard/oficinas' },
  { name: 'USUARIOS', icon: FaUsers, ruta: '/dashboard/personas' },
  { name: 'TABLA DE CONOCIMIENTO', icon: FaBrain, ruta: '/dashboard/tabla-conocimiento' },
  { name: 'CARGOS', icon: FaBox, ruta: '/dashboard/cargos' },
  { name: 'FTP', icon: FaBox, ruta: '/dashboard/ftp' },
  { name: 'CORREO CREDENCIAL', icon: FaBox, ruta: '/dashboard/correo-credencial' },
];

const LinkItemsSoporteTecnico = [
  { name: 'INICIO', icon: FaTachometerAlt, ruta: '/dashboard/soporte-tecnico/home' },
  { name: 'MIS INCIDENCIAS', icon: HiViewBoards, ruta: '/dashboard/soporte/incidencias' },
  { name: 'INCIDENCIAS NO ASIGN.', icon: ImCheckboxUnchecked, ruta: '/dashboard/incidencias-no-asignadas' },
  { name: 'SEDE', icon: FaMapMarkedAlt, ruta: '/dashboard/sedes' },
  { name: 'ÓRGANOS', icon: FaMap, ruta: '/dashboard/organos' },
  { name: 'OFICINAS', icon: FaBuilding, ruta: '/dashboard/oficinas' },
  { name: 'MOTIVO INCIDENCIA', icon: FaQuestionCircle, ruta: '/dashboard/motivos' },
  { name: 'ORIGEN INCIDENCIA', icon: FaExclamationCircle, ruta: '/dashboard/origen-incidencia' },
  { name: 'USUARIOS', icon: FaUsers, ruta: '/dashboard/personas' },
  { name: 'CARGOS', icon: FaBox, ruta: '/dashboard/cargos' },
  { name: 'TABLA DE CONOCIMIENTO', icon: FaBrain, ruta: '/dashboard/tabla-conocimiento' },
];

const LinkItemsUsuarioComun = [
  { name: 'INICIO', icon: FaTachometerAlt, ruta: '/dashboard/usuario/home' },
  { name: 'MIS INCIDENCIAS', icon: HiViewBoards, ruta: '/dashboard/usuario/incidencias' },
];

export default function SidebarWithHeader({ componente: Component }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'none', lg: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 0, lg: 56 }} p="4">
        <Component />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {

  const usuario = store.getState().auth;

  return (
    <>
      <Box
        transition="3s ease"
        bg={useColorModeValue('gray.900', 'gray.800')}
        color={useColorModeValue('white', 'white')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 'full', lg: 56 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex mt={4} mb={3} alignItems="center" justifyContent="center" mr={2}>
          <Text fontSize="22px" color={'#999999'} fontWeight="extrabold">
            <span style={{ 'color': '#B40001' }}>SERVICE</span> DESK
          </Text>
          <CloseButton ml={2} display={{ base: 'flex', md: 'flex', lg: 'none' }} onClick={onClose} _focus={{ boxShadow: "none" }} />
        </Flex>

        {usuario?.rol === '[COORDINADOR INFORMATICO]' ? (
          LinkItemsCoordinadorInformatico.map((link, index) => (
            <Link as={NavLink} to={link.ruta} key={index} _activeLink={{ color: 'red.600' }} _hover={{ textDecoration: 'none' }}>
              <NavItem icon={link.icon} _hover={{ color: 'white', bg: 'red.600' }}>
                {link.name}
              </NavItem>
            </Link>
          ))
        ) : usuario?.rol === '[ASISTENTE INFORMATICO]' ? (
          LinkItemsAsistenteInformatico.map((link, index) => (
            <Link as={NavLink} to={link.ruta} key={index} _activeLink={{ color: 'red.600' }} _hover={{ textDecoration: 'none' }}>
              <NavItem icon={link.icon} _hover={{ color: 'white', bg: 'red.600' }}>
                {link.name}
              </NavItem>
            </Link>
          ))
        ) : usuario?.rol === '[SOPORTE TECNICO]' ? (
          LinkItemsSoporteTecnico.map((link, index) => (
            <Link as={NavLink} to={link.ruta} key={index} _activeLink={{ color: 'red.600' }} _hover={{ textDecoration: 'none' }}>
              <NavItem icon={link.icon} _hover={{ color: 'white', bg: 'red.600' }}>
                {link.name}
              </NavItem>
            </Link>
          ))
        ) : LinkItemsUsuarioComun.map((link, index) => (
          <Link as={NavLink} to={link.ruta} key={index} _activeLink={{ color: 'red.600' }} _hover={{ textDecoration: 'none' }}>
            <NavItem icon={link.icon} _hover={{ color: 'white', bg: 'red.600' }}>
              {link.name}
            </NavItem>
          </Link>
        ))
        }
      </Box>
    </>
  );
};

const NavItem = ({ icon, children, ...rest }) => {

  return (
    <Flex
      align="center"
      p={3}
      mx={2}
      borderRadius="lg"
      role="group"
      cursor="pointer"
      textDecoration={'none'}
      height={"40px"}
      fontSize={'xs'}
      {...rest}
    >
      {icon && (
        <Icon
          mr="2"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {

  const { colorMode, toggleColorMode } = useColorMode('light');
  const usuario = store.getState().auth;

  return (
    <Flex
      as="header"
      ml={['4', '4', '4', '60']}
      mr={['4', '4', '4', '4']}
      px={4}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderWidth="1px"
      borderRadius={'md'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={['space-between', 'space-between', 'space-between', 'flex-end']}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'flex', lg: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        _focus={{ boxShadow: "none" }}
      />

      <Text
        display={{ base: 'flex', md: 'flex', lg: 'none' }}
        fontSize="22px"
        fontWeight="extrabold"
        color={'#999999'}
      >
        <span style={{ 'color': '#B40001', 'marginRight': '8px' }}>SERVICE</span> DESK
      </Text>

      <HStack spacing={{ base: '2', md: '2', lg: '2' }}>
        <Link as={NavLink} to="/dashboard/correos">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiMail />}
            _focus={{ boxShadow: "none" }}
          />
        </Link>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
          _focus={{ boxShadow: "none" }}
        />
        <IconButton
          size="lg"
          variant="ghost"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          _focus={{ boxShadow: "none" }}
          onClick={toggleColorMode}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  color={'white'}
                  fontWeight={'black'}
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
                  <FiChevronsDown ml={2}/>
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
                <MenuItem icon={<FaUserCircle size={20}/>}>Mi Perfil</MenuItem>
                <MenuItem icon={<AiFillSetting size={20}/>} mr={10}>Configuraciones</MenuItem>
              </Link>
              <MenuDivider />
              <ModalCerrarSesion />
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

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
          <AlertDialogCloseButton _focus={{ boxShadow: 'none' }} />
          <AlertDialogBody>
            ¿ESTÁS SEGURO DE CERRAR SESIÓN?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }}>
              NO
            </Button>
            <Button colorScheme='red' ml={3} onClick={handleLogout} _focus={{ boxShadow: "none" }}>
              SI
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
