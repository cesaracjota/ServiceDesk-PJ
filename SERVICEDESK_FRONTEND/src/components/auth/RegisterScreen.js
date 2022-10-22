import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as LinkA } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  VStack,
  Link as LinkB,
  Text,
  useColorModeValue,
  HStack,
  Stack,
  Image,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  Center,
} from '@chakra-ui/react';

import {
  InputControl,
} from "formik-chakra-ui";

import { validadorUsuario, validadorUsuarioCreado } from '../../actions/auth';

import DNI from '../../assets/img/dni.png';
import BgSignUp from '../../assets/img/fondo.jpg';
import { useHistory } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Moment from 'moment';
import { notification, timerNotification } from '../../helpers/alert';
import { QuestionIcon } from '@chakra-ui/icons';
import { consultaReniec } from '../../actions/persona';

export const RegisterScreen = () => {
  const titleColor = useColorModeValue('#c53030', 'red.700');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgCard = useColorModeValue("white", "gray.800");

  const dispatch = useDispatch();
  const history = useHistory();

  const [validadorDni, setDni] = useState({
    dni: '',
    codigoVerificacion: '',
    fechaNacimiento: '',
  });

  /**
   * Funcion para modificar el formato de la fecha
   */

  const stringToDate = (_date, _format, _delimiter) => {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }

  const StartDni = async (numeroDocumento, codigoVerificacion, fechaNacimiento) => {
      try {
        const response = await consultaReniec(numeroDocumento);

        var fechax = Moment(new Date(stringToDate(response.data[28], "dd/MM/yyyy", "/"))).format('yyyy-MM-DD');
        if ((response.data[0] === numeroDocumento) && (response.data[1] === codigoVerificacion) && (fechax === fechaNacimiento)) {
          timerNotification('VALIDACIÓN EXITOSA');
          dispatch(validadorUsuario({
            dni: response.data[0],
            numeroVerificacion: response.data[1],
            nombre: response.data[5],
            apellidos: response.data[2] + ' ' + response.data[3],
            fechaNacimiento: response.data[28],
            sexo: response.data[17]
          }))
          history.push('/auth/register/validate');
        }else{
          history.push('/auth/register');
          notification('LOS DATOS NO COINCIDEN', 'ERROR DE VALIDACIÓN, INTENTE DE NUEVO', 'error');
        }
      } catch (error) {
        notification('ERROR DE VALIDACIÓN', 'ERROR DE VALIDACIÓN, INTENTE DE NUEVO', 'error');
      }
      
  }

  const HandleValidatorUser = () => {
    validadorUsuarioCreado(validadorDni.dni)
      .then((value) => {
        if (value === true) {
          dispatch(StartDni(
            validadorDni.dni,
            validadorDni.codigoVerificacion,
            validadorDni.fechaNacimiento
          ))
        } else {
          history.push('/auth/register');
        }
      }).catch(err => {
        // console.log(err);
        history.push('/auth/register');
      })
  };

  // Validacion con formik

  const validationSchema = Yup.object({
    dni: Yup.string().required('El campo es requerido').length(8, 'El DNI debe tener 8 digitos'),
    codigoVerificacion: Yup.string().required('El campo es requerido').max(1, 'Este campo debe tener solo un 1 caracter'),
    fechaNacimiento: Yup.string().required('El campo es requerido')
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
          bgImg={BgSignUp}
          top="0"
          bgSize="cover"
        >
        </Box>
        <Flex alignItems="center" justifyContent="center" h={"100%"} w={'100%'} mt={"40px"}>
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
              backgroundColor={bgCard}
              boxShadow={'md'}
              px={'4rem'}
              py={'3rem'}
              rounded="xl"
              borderTop="8px solid"
              borderColor={titleColor}
            >
              <Box p={2} boxShadow="md" borderRadius="md">
                <Image boxSize='50px' objectFit='cover' src={DNI} />
              </Box>
              <Text
                fontSize="xl"
                color={titleColor}
                fontWeight="extrabold"
                textAlign="center"
                mb={'20px'}
              >
                VALIDAR DNI
              </Text>
              <Box minW={{ base: "90%", md: "360px" }}>
                <Formik
                  initialValues={validadorDni}
                  validationSchema={validationSchema}
                  onSubmit={HandleValidatorUser}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <VStack spacing={1} align="flex-start" mt={2}>
                        <InputControl
                          name={'dni'}
                          label={'DNI'}
                          inputProps={{ type: "text", placeholder: "INGRESE SU DNI", _focus: { boxShadow: "none" } }}
                          onChange={e => {
                            setDni({ ...validadorDni, dni: e.target.value });
                          }}
                        />
                        <InputControl
                          name={'codigoVerificacion'}
                          label={<Flex justify="space-between">
                            <Text>CODIGO DE VERIFICACIÓN</Text>
                            <PopoverForm />
                          </Flex>}
                          inputProps={{ type: "text", placeholder: "CÓDIGO DE VERIFICACIÓN", _focus: { boxShadow: "none" } }}
                          onChange={e => {
                            setDni({
                              ...validadorDni,
                              codigoVerificacion: e.target.value,
                            });
                          }}
                        />
                        <InputControl
                          name={'fechaNacimiento'}
                          inputProps={{ type: "date", _focus: { boxShadow: "none" } }}
                          label={'FECHA DE NACIMIENTO'}
                          onChange={e => {
                            setDni({
                              ...validadorDni,
                              fechaNacimiento: e.target.value.toString(),
                            });
                          }}
                        />
                        <HStack w={'100%'}>
                          <Button
                            bg="red.500"
                            fontSize="16px"
                            color="white"
                            fontWeight="extrabold"
                            w="100%"
                            mt={'10px'}
                            _hover={{
                              bg: 'red.600',
                            }}
                            type="submit"
                            _focus={{ boxShadow: "none" }}
                          >
                            VALIDAR
                          </Button>
                        </HStack>
                        <Flex justifyContent={'center'} w={'100%'} fontSize={'14px'} textAlign={'center'}>
                          <Text color={textColor} mt={1}>
                            ¿YA TIENES UNA CUENTA?
                            <LinkB
                              color={titleColor}
                              as="span"
                              ms="5px"
                              href="#"
                              fontWeight="extrabold"
                            >
                              <LinkA to={'/auth/login'}>LOGIN</LinkA>
                            </LinkB>
                          </Text>
                        </Flex>
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

const PopoverForm = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
        _focus={{ boxShadow: "none" }}
      >
        <PopoverTrigger>
          <IconButton size='xs' icon={<QuestionIcon />} _focus={{ boxShadow: "none" }} />
        </PopoverTrigger>
        <PopoverContent p={5} _focus={{ boxShadow: "none" }} color='white' bg='gray.700' borderColor='blue.600'>
          <PopoverArrow bg='gray.700'/>
          <PopoverCloseButton _focus={{ boxShadow: "none" }} />
          <PopoverHeader fontWeight="bold" fontSize={'sm'} textAlign="center">¿DONDE ENCONTRAR EL CÓDIGO DE VERIFICACIÓN DE MI DNI?</PopoverHeader>
          <PopoverBody>
            <Text fontSize="xs" color="gray.500" textTransform={'uppercase'} textAlign="justify">
              Este número se encuentra en la parte superior derecha de tu DNI, justo después del número de tu documento. Este dígito es antecedido por un guión (-).
            </Text>
            <Image src='https://www.consultadniperu.com/wp-content/uploads/2021/01/dni.png' mt={2} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}
