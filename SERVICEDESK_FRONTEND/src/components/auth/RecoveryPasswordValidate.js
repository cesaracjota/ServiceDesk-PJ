import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as LinkA, useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    useColorModeValue,
    Stack,
    VStack,
    Image,
    Center
} from '@chakra-ui/react';
import registerImg from '../../assets/img/register.png';
import { InputControl } from "formik-chakra-ui";
import { notification } from '../../helpers/alert';

import BgSignUp from '../../assets/img/fondo.jpg';
import { updatePasswordPersona } from '../../actions/persona';
import { store } from '../../store/store';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { buscarUsuarioDni } from '../../actions/incidencia';

export const RecoveryPasswordValidate = () => {

    const titleColor = useColorModeValue('#c53030', 'red.700');
    const bgColor = useColorModeValue('white', 'gray.800');
    const dispatch = useDispatch();

    const data = store.getState().usuarioDni;
    const [persona, setPersona] = useState(null);

    const history = useHistory();

    const initialUsuario = {
        nombre: '',
        apellido: '',
        dni: '',
        usuario: '',
        password1: '',
        password2: '',
        fecha: '',
        sexo: '',
        activo: '',
        perfilPersona: {
            idPerfilPersona: 4,
        },
    };

    const obtenerDataPersona = async () => {
        const response = await buscarUsuarioDni(data?.dni);
        setPersona(response);
    };

    useEffect(() => {
        obtenerDataPersona();
    }, []);

    if(data?.dni === undefined){
        history.push('/auth/recovery-password');
    }

    const [dataUsuario, setUsuario] = useState(initialUsuario);

    const onSubmit = () => {
        if (
            dataUsuario.password1 !== dataUsuario.password2 &&
            dataUsuario.password1 !== '' &&
            dataUsuario.password2 !== ''
        ) {
            notification('ERROR DE VALIDACIÓN', 'LAS CONTRASEÑAS NO COINCIDEN', 'error');
        } else {
            var usuarioData = {
                idpersona: persona.idpersona,
                nombre: persona.nombre,
                apellido: persona.apellido,
                dni: persona.dni,
                usuario: persona.usuario,
                password: dataUsuario.password1,
                correo: persona.correo,
                celular: persona.celular,
                telefono: persona.telefono,
                anexo: persona.anexo,
                fecha: persona.fecha,
                sexo: persona.sexo,
                activo: persona.activo,
                perfilPersona: persona?.perfilPersona?.idPerfilPersona,
            };
            dispatch(updatePasswordPersona(usuarioData)).then((res) => {
                if (res === true) {
                    history.push('/login');
                }
            }).catch(err => {
                console.log(err);
            });
        }
    };

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
            <Box flex={"1"} bg="red.700" borderBottomRadius="3xl" boxShadow={'xl'}>
                <Center py={4}>
                    <Text color="#999999" fontSize={["md", "xl", "2xl", "3xl"]} fontWeight="extrabold" textAlign="center" verticalAlign={'center'}>
                        SISTEMA DE INCIDENCIAS CORTE SUPERIOR DE JUSTICIA - AREQUIPA
                    </Text>
                </Center>
            </Box>
            <Flex
                direction="column"
                alignSelf="center"
                justifySelf="center"
                overflow="hidden"
                h={"100%"}
                w={"100%"}
            >
                <Box
                    position="absolute"
                    h={"100vh"}
                    w={"100%"}
                    borderRadius={{ md: 'md' }}
                    left="0"
                    right="0"
                    bgRepeat="no-repeat"
                    overflow="hidden"
                    zIndex="-1"
                    top="0"
                    bgImage={BgSignUp}
                    bgSize="cover"
                />

                <Flex alignItems="center" justifyContent="center" h={"100%"} w={'100%'} mt="40px">
                    <Stack
                        flexDir="column"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={bgColor}
                        boxShadow={'md'}
                        px={'4rem'}
                        py={'2rem'}
                        rounded="xl"
                        borderTop="10px solid"
                        borderColor={titleColor}
                    >
                        <Box p={2} boxShadow="md" borderRadius="md">
                            <Image boxSize='50px' objectFit='cover' src={registerImg} />
                        </Box>
                        <Text
                            fontSize="xl"
                            color={titleColor}
                            fontWeight="extrabold"
                            textAlign="center"
                            mb="20px"
                        >
                            REGISTRE SU NUEVA CONTRASEÑA
                        </Text>
                        <Box w={{ base: "400px", md: "500px", lg: "700px" }}>
                            <Formik
                                initialValues={initialUsuario}
                                onSubmit={onSubmit}
                                validationSchema={validationSchema}
                            >
                                {({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <VStack spacing={2} align="stretch">
                                            <Stack>
                                                <FormControl>
                                                    <FormLabel fontSize="sm" fontWeight="normal">
                                                        DOCUMENTO DE IDENTIFICACIÓN
                                                    </FormLabel>
                                                    <Input
                                                        fontSize="sm"
                                                        type="text"
                                                        size="sm"
                                                        readOnly
                                                        name="documentoIdentificacion"
                                                        defaultValue={data ? data.dni : ''}
                                                        onChange={e => {
                                                            setUsuario({ ...dataUsuario, dni: e.target.value });
                                                        }}
                                                    />
                                                </FormControl>
                                            </Stack>

                                            <Stack direction={{ base: 'column', lg: 'row' }}>
                                                <FormControl>
                                                    <FormLabel fontSize="sm" fontWeight="normal">
                                                        NOMBRES
                                                    </FormLabel>
                                                    <Input
                                                        fontSize="sm"
                                                        type="text"
                                                        size="sm"
                                                        readOnly
                                                        defaultValue={data ? data.nombre : ''}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel fontSize="sm" fontWeight="normal">
                                                        APELLIDOS
                                                    </FormLabel>
                                                    <Input
                                                        fontSize="sm"
                                                        type="text"
                                                        size="sm"
                                                        readOnly
                                                        defaultValue={data ? data.apellidos : ''}
                                                    />
                                                </FormControl>
                                            </Stack>

                                            <Stack direction={{ base: 'column', lg: 'row' }}>
                                                <InputControl
                                                    name={'password1'}
                                                    inputProps={{
                                                        type: "password",
                                                        size: 'sm',
                                                        placeholder: "Ingrese su nueva contraseña"
                                                    }}
                                                    label="NUEVA CONTRASEÑA"
                                                    onChange={e => { setUsuario({ ...dataUsuario, password1: e.target.value }) }}
                                                />
                                                <InputControl
                                                    name={'password2'}
                                                    inputProps={{
                                                        type: "password",
                                                        size: 'sm',
                                                        placeholder: "Confirme su nueva contraseña"
                                                    }}
                                                    label="CONFIRME LA CONTRASEÑA"
                                                    onChange={e => { setUsuario({ ...dataUsuario, password2: e.target.value }) }}
                                                />
                                            </Stack>
                                            <Stack>
                                                <FormControl mt={2}>
                                                    <Button
                                                        type="submit"
                                                        bg="red.500"
                                                        color="white"
                                                        fontWeight="extrabold"
                                                        w="100%"
                                                        mb={2}
                                                        _hover={{
                                                            bg: 'red.600',
                                                        }}

                                                        disabled={
                                                            dataUsuario.password1 !== dataUsuario.password2 ||
                                                                dataUsuario.password1.length < 6 ||
                                                                dataUsuario.password2.length < 6 ||
                                                                data?.dni === undefined ? true : false
                                                        }
                                                    >
                                                        GUARDAR
                                                    </Button>
                                                </FormControl>
                                            </Stack>
                                            <LinkA to={'/auth/recovery-password'}>
                                                <Flex justifyContent={'center'} w="100%">
                                                    <Button
                                                        w="100%"
                                                        colorScheme="gray"
                                                        fontWeight="extrabold"

                                                    >
                                                        REGRESAR
                                                    </Button>
                                                </Flex>
                                            </LinkA>
                                        </VStack>
                                    </form>
                                )}
                            </Formik>
                        </Box>
                    </Stack>
                </Flex>
            </Flex>
        </>
    );
};
