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
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Icon,
    Center,
    Select,
    Divider,
    SimpleGrid,
    Button
} from '@chakra-ui/react';

import { InputControl } from "formik-chakra-ui";

import { useDispatch, useSelector } from 'react-redux';

import { RiEditBoxFill, RiFileEditFill, RiFileInfoFill } from 'react-icons/ri';
import { fetchHistorialPersona } from '../../../actions/historialpersona';
import { updatePersona } from '../../../actions/persona';

import { Formik } from 'formik';
import * as Yup from 'yup';

const Profile = () => {

    const { identificador } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const [datosUsuario, setDatosUsuario] = useState([]);
    const [datosPerfilUsuario, setDatosPerfilUsuario] = useState([]);
    const [sedeUsuario, setSedeUsuario] = useState([]);
    const [organoUsuario, setOrganoUsuario] = useState([]);
    const [oficinaUsuario, setOficinaUsuario] = useState([]);
    const [cargoUsuario, setCargoUsuario] = useState([]);
    const [newPassword, setNewPassword] = useState('');

    const initialUsuario = {
        password1: '',
        password2: '',
    };

    const obtenerMisDatos = async () => {
        await fetchHistorialPersona(identificador).then(historial => {
            setDatosUsuario(historial?.data.persona);
            setDatosPerfilUsuario(historial?.data.persona.perfilPersona);
            setSedeUsuario(historial?.data.oficina.organo.sede);
            setOrganoUsuario(historial?.data.oficina.organo);
            setOficinaUsuario(historial?.data.oficina);
            setCargoUsuario(historial?.data.cargo);
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
            telefono: datosUsuario.telefono,
            anexo: datosUsuario.anexo,
            fecha: datosUsuario.fecha,
            sexo: datosUsuario.sexo,
            activo: datosUsuario.activo,
            perfilPersona: datosPerfilUsuario.idPerfilPersona
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
                                py={5}
                            >
                                <VStack spacing={4} w="100%">
                                    <Avatar fontWeight="black" size={'xl'} name={datosUsuario?.nombre + ' ' + datosUsuario?.apellido} bg="gray.600" color="white" />
                                    <Text fontWeight={'extrabold'}>MIS DATOS ACTUALES</Text>
                                    <Center w="100%">
                                        <Box flex="1" textAlign="center" fontSize={'13px'}>
                                            <SimpleGrid columns={[1, 2, 3, 4]} spacing={3}>
                                                <Box>
                                                    <Text fontWeight={'bold'}>NOMBRES</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario?.nombre} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>APELLIDOS</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario?.apellido} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>DNI</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario?.dni} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>PERFIL PERSONA</Text>
                                                    <Select textAlign={'center'} size="xs" defaultValue={datosPerfilUsuario ? datosPerfilUsuario?.idPerfilUsuario : ''} isReadOnly>

                                                        <option>{datosPerfilUsuario?.perfil}</option>

                                                    </Select>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>NUMERO DE CELULAR</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario?.celular} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>CORREO ELECTRÓNICO</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario?.correo} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>FECHA NACIMIENTO</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="date" size="xs" defaultValue={datosUsuario?.fecha} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>SEXO</Text>
                                                    <Select textAlign={'center'} size="xs" defaultValue={datosUsuario?.sexo} isReadOnly>
                                                        <option value={datosUsuario?.sexo}>{datosUsuario?.sexo === 'M' ? 'MASCULINO' : 'FEMEMINO'}</option>
                                                    </Select>
                                                </Box>
                                            </SimpleGrid>
                                            <Divider mt={4} mb={1} />
                                            <Divider mt={4} mb={1} />
                                            <SimpleGrid columns={[1, 2, 3, 4]} spacing={1}>
                                                <Box>
                                                    <Text fontWeight={'bold'}>SEDE</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={sedeUsuario?.sede} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>ORGANO</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={organoUsuario?.organo} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>OFICINA</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={oficinaUsuario?.oficina} readOnly />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>CARGO</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={cargoUsuario?.cargo} readOnly />
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
                                                    <Box flex="1" textAlign="center" fontSize={'13px'} py={4}>
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
                                                            
                                                            >ACTUALIZAR
                                                        </Button>
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

export default Profile;
