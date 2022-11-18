import React from 'react'
import {
    Box,
    Flex,
    Icon,
    Image,
    Link,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

// import {
//     FiMenu,
//     FiBell,
//     FiMail,
//     FiChevronsDown,
//   } from 'react-icons/fi';

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
} from 'react-icons/fa';

import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { HiViewBoards } from 'react-icons/hi';

import LIGHT_LOGO from '../../../../assets/logo/lightLogo.webp';
import DARK_LOGO from '../../../../assets/logo/darkLogo.webp';
import { NavLink } from 'react-router-dom';

const NavItem = (props) => {

    const activeLinkcolor = useColorModeValue("gray.100", "gray.200");
    const bgActiveLinkColor = useColorModeValue("red.600", "red.600");

    const { icon, children, ...rest } = props;

    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="10px"
            cursor="pointer"
            color="inherit"
            _hover={{
                bg: bgActiveLinkColor,
                color: activeLinkcolor,
            }}
            role="group"
            fontWeight="semibold"
            fontSize="xs"
            transition=".5s ease"
            {...rest}
        >
            {icon && (
                <Icon
                    mx="2"
                    boxSize="4"
                    _groupHover={{
                        color: activeLinkcolor,
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};


const SidebarContent = (props) => {

    // const integrations = useDisclosure();

    const rol = props.rol;

    const activeLinkcolor = useColorModeValue("gray.50", "gray.100");
    const bgActiveLinkColor = useColorModeValue("#B40001", "#B40001");

    const LinkItemsAdministrador = [
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
        { name: 'MOTIVO INCIDENCIA', icon: FaQuestionCircle, ruta: '/dashboard/motivos' },
        { name: 'ORIGEN INCIDENCIA', icon: FaExclamationCircle, ruta: '/dashboard/origen-incidencia' },
        { name: 'TABLA DE CONOCIMIENTO', icon: FaBrain, ruta: '/dashboard/tabla-conocimiento' },
    ];

    const LinkItemsUsuarioComun = [
        { name: 'INICIO', icon: FaTachometerAlt, ruta: '/dashboard/usuario/home' },
        { name: 'MIS INCIDENCIAS', icon: HiViewBoards, ruta: '/dashboard/usuario/incidencias' },
    ];

    const ROLES = {
        ADMINISTRADOR: '[COORDINADOR INFORMATICO]',
        ASISTENTE_INFORMATICO: '[ASISTENTE INFORMATICO]',
        SOPORTE_TECNICO: '[SOPORTE TECNICO]',
        USUARIO_COMUN: '[USUARIO COMUN]',
    }

    return (
        <>
            <Box
                as="nav"
                pos="fixed"
                top="0"
                left="0"
                zIndex="sticky"
                h="full"
                pb="5"
                overflowX="hidden"
                overflowY="auto"
                bg="#181a1b"
                _dark={{ bg: "#181a1b" }}
                border
                color="inherit"
                borderRightWidth="1px"
                boxShadow="0px 3px 5px -1px rgba(0,0,0,.2),0px 5px 8px 0px rgba(0,0,0,.14),0px 1px 14px 0px rgba(0,0,0,.12)"
                w="60"
                {...props}
            >
                <Flex px="4" py="3" align="center" direction={'column'}>
                    <Image align={'center'} src={useColorModeValue(LIGHT_LOGO, DARK_LOGO)} alt="SERVICEDESK Logo" boxSize={12} />
                    <Text
                        fontSize="lg"
                        color="#999999"
                        fontWeight="extrabold"
                        mt={2}
                    >
                        <span style={{ 'color': '#B40001' }}>SERVICE</span> DESK
                    </Text>
                </Flex>
                <Flex
                    direction="column"
                    as="nav"
                    fontSize="sm"
                    color="gray.400"
                    aria-label="Main Navigation"
                >
                    {
                        (rol === ROLES.ADMINISTRADOR) || (rol === ROLES.ASISTENTE_INFORMATICO) ? (
                            LinkItemsAdministrador.map((link, index) => (
                                <Link key={index} as={NavLink} to={link.ruta} _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor }} _hover={{ textDecoration: 'none' }}>
                                    <NavItem icon={link.icon}>{link.name}</NavItem>
                                </Link>
                            ))) : (rol === ROLES.SOPORTE_TECNICO) ? (
                                LinkItemsSoporteTecnico.map((link, index) => (
                                    <Link key={index} as={NavLink} to={link.ruta} _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor }} _hover={{ textDecoration: 'none' }}>
                                        <NavItem icon={link.icon}>{link.name}</NavItem>
                                    </Link>
                                ))) : (rol === ROLES.USUARIO_COMUN) ? (
                                    LinkItemsUsuarioComun.map((link, index) => (
                                        <Link key={index} as={NavLink} to={link.ruta} _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor }} _hover={{ textDecoration: 'none' }}>
                                            <NavItem icon={link.icon}>{link.name}</NavItem>
                                        </Link>
                                    ))) : null
                    }
                </Flex>
            </Box>
        </>
    )
}

export default SidebarContent