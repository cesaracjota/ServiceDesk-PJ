// Chakra imports
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Select,
  HStack,
  InputRightElement,
  Progress,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { consultaReniec, createPersona } from '../../../actions/persona';

import { FaFingerprint } from 'react-icons/fa';

import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

import { store } from '../../../store/store';
import { notification } from '../../../helpers/alert';

const PersonaAgregar = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const dataPerfil = store.getState().perfilPersona.rows;

  const PerfilUsuarioDefault = dataPerfil.filter(perfil =>
    perfil.perfil === 'USUARIO COMUN'
  );

  const [estadoInput, setEstadoInput] = useState(false);
  const [progress , setProgress] = useState(false);

  const initialPersona = {
    nombre: '',
    apellido: '',
    usuario: '',
    dni: '',
    password: '',
    correo: '',
    celular: '',
    anexo: '',
    telefono: '',
    fecha: '',
    sexo: '',
    activo: '',
    perfilPersona: {
      idPerfilPersona: '',
    },
  };

  const [persona, setPersona] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    dni: '',
    password: '',
    correo: '',
    celular: '',
    anexo: '',
    telefono: '',
    fecha: '',
    sexo: '',
    activo: '',
    perfilPersona: {
      idPerfilPersona: '',
    },
  });

  const savePersona = (e) => {
    e.preventDefault();
    var dataPersona = {
      nombre: persona.nombre,
      apellido: persona.apellido,
      usuario: persona.usuario,
      dni: persona.dni,
      password: persona.password,
      correo: persona.correo,
      celular: persona.celular,
      anexo: persona.anexo,
      telefono: persona.telefono,
      fecha: persona.fecha,
      sexo: persona.sexo !== '' ? persona.sexo : 'M',
      activo: persona.activo,
      perfilPersona: {
        idPerfilPersona: persona.perfilPersona.idPerfilPersona !== '' ? Number(persona.perfilPersona) : PerfilUsuarioDefault[0].idPerfilPersona,
      },
    }
    dispatch(createPersona(dataPersona))
      .then(() => {
        handleCloseModal(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
    setPersona(initialPersona);
    setEstadoInput(false);
    setProgress(false);
  };

  /** MÉTODO PARA REALIZAR LA CONSULTA A LA API DE LA RENIEC */

  const consultaReniecDNI = async () => {
    setProgress(true);
    try {
        const respuesta = await consultaReniec(persona.dni);
        if (!respuesta) {
          notification('ERROR DE BUSQUEDA', 'PERSONA CON ESE DNI NO EXISTE', 'error', 'modalOrganoAsignacion');
        }else{
          const body = await respuesta.data;
          setPersona({
            ...persona,
            nombre: body[5],
            apellido: body[2] + ' ' + body[3],
            fecha: body[28].split('/').reverse().join('-'),
            sexo: body[17] === 'MASCULINO' ? 'M' : 'F',
          });
          setEstadoInput(true);
          setProgress(false);
        }
    }
    catch {
      notification('ERROR DE CONSULTA', 'NO SE LOGRÓ REALIZAR LA CONSULTA, INTENTE DENTRO DE UN MOMENTO', 'error', 'modalOrganoAsignacion');
      setProgress(false);
    }
  }

  return (
    <>
      <Button leftIcon={<AddIcon />} size="sm" colorScheme={'facebook'} onClick={handleClickOpenCreate} >
        AGREGAR
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'6xl'}
        id="modalOrganoAsignacion"
      >
        <ModalOverlay />
        <form onSubmit={savePersona}>
          <ModalContent>
            <ModalHeader textAlign="center">AGREGAR NUEVO USUARIO</ModalHeader>
            <ModalCloseButton  />
            <ModalBody pb={2}>
              <Progress size="xs" value={progress} colorScheme="messenger" hidden={ progress === false } isIndeterminate = { progress === true } mb={2} />

              <InputGroup size='md'>
                <Input
                  onChange={e =>
                    setPersona({ ...persona, dni: e.target.value })
                  }
                  placeholder="DNI"
                  fontWeight="semibold"
                  type={'text'}
                  isRequired
                />
                <InputRightElement width='8.5rem'>
                  <Button
                    rightIcon={<FaFingerprint />}
                    colorScheme="facebook"
                    variant="solid"
                    h='1.85rem'
                    size='sm'
                    onClick={consultaReniecDNI}
                    disabled={persona.dni === '' || persona.dni.length !== 8}
                    
                  >
                    CONSULTAR
                  </Button>
                </InputRightElement>
              </InputGroup>
              <HStack spacing={'10px'} mt={5}>
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">NOMBRES</FormLabel>
                  <Input
                    defaultValue={persona.nombre}
                    onChange={e =>
                      setPersona({ ...persona, nombre: (e.target.value).toUpperCase() })
                    }
                    placeholder="NOMBRES"
                    textTransform={'uppercase'}
                    type={'text'}
                    readOnly={estadoInput}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">APELLIDOS</FormLabel>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, apellido: (e.target.value).toUpperCase() })
                    }
                    defaultValue={persona.apellido}
                    placeholder="APELLIDOS"
                    textTransform={'uppercase'}
                    type={'text'}
                    readOnly={estadoInput}
                  />
                </FormControl>
              </HStack>
              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel fontWeight="semibold">USUARIO</FormLabel>
                  <Input
                    defaultValue={(persona.usuario = persona.dni)}
                    onChange={e => {
                      setPersona({
                        ...persona,
                        usuario: e.target.value.usuario,
                      });
                    }}
                    type={'text'}
                    placeholder="USUARIO"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">CONTRASEÑA</FormLabel>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, password: e.target.value })
                    }
                    type={'password'}
                    placeholder="MIN 6 CARACTERES"
                    autoComplete='off'
                  />
                </FormControl>
              </HStack>
              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel fontWeight="semibold">NRO CELULAR</FormLabel>
                  <Input
                    type={'text'}
                    placeholder="NRO DE CELULAR"
                    onChange={e =>
                      setPersona({ ...persona, celular: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">ANEXO</FormLabel>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, anexo: e.target.value })
                    }
                    type={'text'}
                    placeholder="ANEXO"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">TELÉFONO</FormLabel>
                  <Input
                    type={'text'}
                    placeholder="NRO DE TELEFONO"
                    onChange={e =>
                      setPersona({ ...persona, telefono: e.target.value })
                    }
                  />
                </FormControl>
              </HStack>

              <HStack spacing={'10px'} mt={'10px'}>
              <FormControl>
                  <FormLabel fontWeight="semibold">CORREO</FormLabel>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, correo: e.target.value })
                    }
                    type={'email'}
                    placeholder="CORREO"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">FECHA DE NACIMIENTO</FormLabel>
                  <Input
                    defaultValue={persona ? persona.fecha : ''}
                    onChange={e =>
                      setPersona({ ...persona, fecha: e.target.value })
                    }
                    readOnly={estadoInput}
                    type={'date'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">SEXO</FormLabel>
                  <Select
                    value={persona.sexo ? persona.sexo : ''}
                    onChange={e => {
                      setPersona({ ...persona, sexo: e.target.value });
                    }}
                    disabled={estadoInput}
                  >
                    <option value="M">MASCULINO</option>
                    <option value="F">FEMENINO</option>
                  </Select>
                </FormControl>
              </HStack>
              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                  <Select
                    defaultValue={(persona.activo = 'S')}
                    onChange={e => {
                      setPersona({ ...persona, activo: e.target.value });
                    }}
                  >
                    <option value="S">ACTIVO</option>
                    <option value="N">INACTIVO</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">PERFIL PERSONA</FormLabel>
                  <Select
                    isRequired
                    defaultValue={(persona.perfilPersona ? PerfilUsuarioDefault[0]?.idPerfilPersona : '')}
                    onChange={e => {
                      setPersona({ ...persona, perfilPersona: e.target.value });
                    }}
                  >
                    {dataPerfil.map((item, idx) => (
                      <option value={item.idPerfilPersona} key={idx}>
                        {item.perfil}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Button 
                type={'submit'} 
                colorScheme={'facebook'} 
                mr={3} 
                
                disabled={persona.password === '' || persona.password.length < 6}
                >
                GUARDAR
              </Button>
              <Button onClick={handleCloseModal}  colorScheme="red" variant="outline">CANCELAR</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default PersonaAgregar;
