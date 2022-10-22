import React, { useState } from 'react';
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
  IconButton,
  Select,
  Input,
  HStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { store } from '../../../store/store';

import { updatePersona } from '../../../actions/persona';

import { AiTwotoneEdit } from 'react-icons/ai';

const PersonaEditar = ({ row }) => {

  const [openedit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const dataPerfil = store.getState().perfilPersona.rows;

  const [indice, setIndice] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    usuario: '',
    password: '',
    correo: '',
    celular: '',
    telefono: '',
    anexo: '',
    fecha: null,
    sexo: '',
    activo: '',
    perfilPersona: {
      idPerfilPersona: null,
    },
  });

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleUpdatePersona = e => {
    e.preventDefault();
    dispatch(updatePersona(indice))
      .then(() => {
        handleCloseEdit(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <IconButton
        onClick={() => handleClickOpenEdit(row)}
        variant={'outline'}
        colorScheme="facebook"
        icon={<AiTwotoneEdit size={24} />}
        size={'sm'}
        _focus={{ boxShadow: "none" }}
      />

      <Modal isOpen={openedit} onClose={handleCloseEdit} size={'6xl'}>
        <ModalOverlay />
        <form onSubmit={handleUpdatePersona}>
          <ModalContent>
            <ModalHeader>EDITAR PERSONA</ModalHeader>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />
            <ModalBody pb={2}>
              <FormControl>
                <Input
                  value={indice ? indice.idpersona : ''}
                  disabled={true}
                  type="text"
                  hidden={true}
                />
              </FormControl>
              <HStack spacing={'10px'}>
                <FormControl>
                  <FormLabel fontWeight="semibold">DNI</FormLabel>
                  <Input
                    defaultValue={indice ? indice.dni : ''}
                    onChange={e =>
                      setIndice({ ...indice, dni: e.target.value })
                    }
                    placeholder="ingrese su DNI"
                    type={'text'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                  <Input
                    defaultValue={indice ? indice.nombre : ''}
                    onChange={e =>
                      setIndice({ ...indice, nombre: (e.target.value).toUpperCase() })
                    }
                    placeholder="Nombres"
                    type={'text'}
                    textTransform={'uppercase'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">APELLIDOS</FormLabel>
                  <Input
                    defaultValue={indice ? indice.apellido : ''}
                    onChange={e =>
                      setIndice({ ...indice, apellido: (e.target.value).toUpperCase() })
                    }
                    placeholder="Apellidos"
                    type={'text'}
                    textTransform={'uppercase'}
                  />
                </FormControl>
              </HStack>
              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel fontWeight="semibold">USUARIO</FormLabel>
                  <Input
                    defaultValue={indice ? indice.usuario : ''}
                    onChange={e =>
                      setIndice({ ...indice, usuario: e.target.value })
                    }
                    placeholder="Usuario"
                    type={'text'}
                    textTransform='uppercase'
                  />
                </FormControl>
                <FormControl isRequired={true}>
                  <FormLabel fontWeight="semibold">PASSWORD</FormLabel>
                  <Input
                    onChange={e =>
                      setIndice({ ...indice, password: e.target.value })
                    }
                    type={'password'}
                    placeholder="minimo 8 caracteres"
                    isRequired
                  />
                </FormControl>
              </HStack>

              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel fontWeight="semibold">ANEXO</FormLabel>
                  <Input
                    defaultValue={indice ? indice.anexo : ''}
                    onChange={e =>
                      setIndice({ ...indice, anexo: e.target.value })
                    }
                    type={'text'}
                    placeholder="ANEXO"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">TELÉFONO</FormLabel>
                  <Input
                    defaultValue={indice ? indice.telefono : ''}
                    onChange={e =>
                      setIndice({ ...indice, telefono: e.target.value })
                    }
                    type={'text'}
                    placeholder="NRO DE TELÉFONO"
                  />
                </FormControl>
              </HStack>
              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel fontWeight="semibold">CORREO</FormLabel>
                  <Input
                    defaultValue={indice ? indice.correo : ''}
                    onChange={e =>
                      setIndice({ ...indice, correo: e.target.value })
                    }
                    placeholder="Correo"
                    type={'email'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">FECHA DE NACIMIENTO</FormLabel>
                  <Input
                    defaultValue={indice ? indice.fecha : ''}
                    onChange={e =>
                      setIndice({ ...indice, fecha: e.target.value })
                    }
                    type={'date'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">SEXO</FormLabel>
                  <Select
                    defaultValue={indice ? indice.sexo : ''}
                    onChange={e =>
                      setIndice({ ...indice, sexo: e.target.value })
                    }
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
                    defaultValue={indice ? indice.activo : ''}
                    onChange={e =>
                      setIndice({ ...indice, activo: e.target.value })
                    }
                  >
                    <option value="S">ACTIVO</option>
                    <option value="N">INACTIVO</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">PERFIL</FormLabel>
                  <Select
                    defaultValue={
                      indice ? indice.perfilPersona.idPerfilPersona : ''
                    }
                    onChange={e =>
                      setIndice({
                        ...indice,
                        perfilPersona: e.target.value,
                      })
                    }
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
                colorScheme={'green'}
                mr={3}
                _focus={{ boxShadow: "none" }}
              >
                ACTUALIZAR
              </Button>
              <Button onClick={handleCloseEdit} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

    </>
  )
}

export default PersonaEditar;