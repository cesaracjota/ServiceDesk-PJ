import React, { useState, useEffect } from 'react';
import {
    Heading,
    Text,
    VStack,
    HStack,
    Avatar,
    Box,
    useColorModeValue,
    Input,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Icon,
    SimpleGrid,
    Select,
    Center
} from '@chakra-ui/react';

import { InputControl } from "formik-chakra-ui";

import { useDispatch, useSelector } from 'react-redux';

import { RiEditBoxFill, RiFileEditFill, RiFileInfoFill } from 'react-icons/ri';
import { fetchUsuarioId, updatePersona } from '../../../actions/persona';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { store } from '../../../store/store';

const UserProfile = () => {

    const { identificador } = useSelector(state => state.auth);

    const usuario = store.getState().auth;

    const dispatch = useDispatch();

    const [datosUsuario, setDatosUsuario] = useState([]);
    const [perfilPersona, setPerfilPersona] = useState([]);
    const [newPassword, setNewPassword] = useState('');

    const initialUsuario = {
        password1: '',
        password2: '',
    };

    const obtenerMisDatos = async () => {
        await fetchUsuarioId(identificador).then((datos) => {
            setDatosUsuario(datos.data);
            setPerfilPersona(datos.data.perfilPersona);
        }).catch(error => {
            // console.log('Error al obtener los datos del usuario: ', error);
        })
    }

    useEffect(() => {
        obtenerMisDatos();
    }, []);

    const handleUpdatePassword = () => {
        var usuarioData = {
            idpersona: datosUsuario.idpersona,
            nombre: datosUsuario.nombre,
            apellido: datosUsuario.apellido,
            dni: datosUsuario.dni,
            usuario: datosUsuario.usuario,
            password: newPassword,
            correo: datosUsuario.correo,
            celular: datosUsuario.celular,
            fecha: datosUsuario.fecha,
            sexo: datosUsuario.sexo,
            activo: datosUsuario.activo,
            perfilPersona: perfilPersona.idPerfilPersona
        }
        dispatch(updatePersona(usuarioData))
            .then(() => {
                obtenerMisDatos();
            }).catch(error => {
                console.log(error);
            })
    }

    const validationSchema = Yup.object({
        password1: Yup.string().required('El campo es requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
        password2: Yup.string().required("Por favor confirma tu contraseña")
            .when("password1", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf([Yup.ref("password1")], "Las contraseñas no coinciden")
            })
    });

    return (
        <>
            <Box
                borderRadius="md"
                overflow="hidden"
                boxShadow={'xs'}
                w="100%"
                bg={useColorModeValue('white', 'gray.900')}
            >
                <Accordion defaultIndex={[0]} allowMultiple>
                    <AccordionItem>
                        <AccordionButton _expanded={{ bg: 'gray.600', color: 'white' }} >
                            <Box flex='1' textAlign='left'>
                                <HStack spacing={2}>
                                    <Icon as={RiFileInfoFill} />
                                    <Heading size={'sm'} fontWeight="extrabold">MIS DATOS</Heading>
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>

                            <Box
                                overflow="hidden"
                                w="100%"
                                bg={useColorModeValue('white', 'gray.900')}
                                px={4}
                            >
                                <VStack spacing={4} w="100%">
                                    <Avatar
                                        size={'lg'}
                                        name={datosUsuario.nombre + ' ' + datosUsuario.apellido}
                                        bg={
                                            usuario?.rol === "[COORDINADOR INFORMATICO]" ? 'red.600'
                                                :
                                                usuario?.rol === "[ASISTENTE INFORMATICO]" ? 'blue.600'
                                                    :
                                                    usuario?.rol === "[SOPORTE TECNICO]" ? 'green.600'
                                                        :
                                                        'gray.600'
                                        }
                                        color={'white'}
                                        fontWeight="black"
                                    />
                                    <Text fontWeight={'extrabold'}>MIS DATOS ACTUALES</Text>
                                    <Center w="100%">
                                        <Box flex="1" textAlign="center" fontSize={'13px'}>
                                            <SimpleGrid columns={[1, 2, 3, 4]} spacing={3}>
                                                <Box>
                                                    <Text fontWeight={'bold'}>NOMBRES</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario.nombre} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>APELLIDOS</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario.apellido} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>DNI</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario.dni} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>PERFIL PERSONA</Text>
                                                    <Select textAlign={'center'} size="xs" defaultValue={perfilPersona.perfil} isReadOnly>
                                                        <option value={perfilPersona.idPerfilPersona}>{perfilPersona.perfil}</option>
                                                    </Select>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>NUMERO DE CELULAR</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario.celular} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>CORREO ELECTRÓNICO</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario.correo} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>FECHA NACIMIENTO</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="date" size="xs" defaultValue={datosUsuario.fecha} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>SEXO</Text>
                                                    <Select textAlign={'center'} size="xs" defaultValue={datosUsuario.sexo} isReadOnly>
                                                        <option value={datosUsuario.sexo}>{datosUsuario.sexo === 'M' ? 'MASCULINO' : 'FEMEMINO'}</option>
                                                    </Select>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                    </Center>
                                </VStack>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionButton _expanded={{ bg: 'gray.600', color: 'white' }} >
                            <Box flex='1' textAlign='left'>
                                <HStack spacing={2}>
                                    <Icon as={RiFileEditFill} />
                                    <Heading size={'sm'} fontWeight="extrabold">ACTUALIZAR MI CONTRASEÑA</Heading>
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Box
                                overflow="hidden"
                                w="100%"
                                bg={useColorModeValue('white', 'gray.900')}
                                px={4}
                            >
                                <VStack spacing={4} w="100%">
                                    <Icon as={RiEditBoxFill} boxSize={50} color={'gray.500'} />
                                    <Text fontWeight={'extrabold'}>ACTUALIZAR MI CONTRASEÑA</Text>
                                    <Center w="100%">
                                        <Formik
                                            initialValues={initialUsuario}
                                            onSubmit={handleUpdatePassword}
                                            validationSchema={validationSchema}
                                        >
                                            {({ handleSubmit }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <Box flex="1" textAlign="center" fontSize={'13px'}>
                                                        <SimpleGrid columns={[1, 2]} spacing={10}>
                                                            <Box>
                                                                <Text fontWeight={'bold'}>CONTRASEÑA NUEVA</Text>
                                                                <InputControl
                                                                    textAlign={'center'}
                                                                    name={'password1'}
                                                                    onChange={e => setNewPassword(e.target.value)}
                                                                    inputProps={{
                                                                        type: "password",
                                                                        autoComplete: "off",
                                                                        variant: "flushed",
                                                                        size: "xs",
                                                                        textAlign: "center"
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <Text fontWeight={'bold'}>REPETIR CONTRASEÑA</Text>
                                                                <InputControl
                                                                    name={'password2'}
                                                                    textAlign={'center'}
                                                                    inputProps={{
                                                                        type: "password",
                                                                        autoComplete: "off",
                                                                        variant: "flushed",
                                                                        size: "xs",
                                                                        textAlign: "center"
                                                                    }}
                                                                />
                                                            </Box>
                                                        </SimpleGrid>
                                                        <Button
                                                            mt={4}
                                                            colorScheme={'green'}
                                                            size={'sm'}
                                                            fontWeight="extrabold"
                                                            disabled={newPassword.length < 6}
                                                            type="submit"
                                                            
                                                        >ACTUALIZAR</Button>
                                                    </Box>
                                                </form>
                                            )}
                                        </Formik>
                                    </Center>
                                </VStack>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </>
    );
};

export default UserProfile;
