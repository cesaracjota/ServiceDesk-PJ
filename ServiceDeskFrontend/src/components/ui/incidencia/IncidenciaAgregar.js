import React, { useRef, useState } from 'react';
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
  Text,
  Input,
  Radio,
  RadioGroup,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  ButtonGroup,
  PopoverFooter,
} from '@chakra-ui/react';

import { notification } from '../../../helpers/alert';

import Select from "react-select";

import { AddIcon, SearchIcon } from '@chakra-ui/icons';

import { store } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { buscarUsuarioDni } from '../../../actions/incidencia';

import {
  createIncidencia, fetchIncidenciaSoporte
} from '../../../actions/incidencia';

import { getIncidenciasAsignadasSoporte } from './soporte/incidencia';
import { buscarPersonaApellido } from '../../../actions/persona';
import { fetchHistorialPersona } from '../../../actions/historialpersona';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../../../helpers/quillConfig';
import { createMotivo1, fetchMotivos } from '../../../actions/motivo';
import { createOrigen1, fetchOrigen } from '../../../actions/origenIncidencia';

const IncidenciaAgregar = () => {
  const dispatch = useDispatch();
  const usuario = store.getState().auth;
  const { identificador } = useSelector(state => state.auth);

  const motivoData = store.getState().motivo.rows;
  const origenData = store.getState().origenIncidencia.rows;

  // BUSQUEDA DE USUARIO QUIEN REPORTÓ O NOTIFICÓ LA INCIDENCIA

  const [openSearch1, setOpenSearchUsuarios1] = useState(false);
  const [usuarioApellido1, setUsuarioApellido1] = useState('');
  const [indiceUsuario1, setIndiceUsuario1] = useState(null);
  const [usuarioDataNombre1, setUsuarioDataNombre1] = useState(null);


  const [openCreate, setOpenCreate] = useState(false);
  const [openSearch, setOpenSearchUsuarios] = useState(false);
  const [radioValue, setRadioValue] = useState('apellido');
  const [radioUserValue, setRadioUserValue] = useState('mismo');

  const [usuarioDNI, setUsuarioDNI] = useState('');
  const [usuarioNotificaDNI, setUsuarioNotificaDNI] = useState('');
  const [usuarioApellido, setUsuarioApellido] = useState('');
  const [usuarioData, setUsuarioData] = useState([]);
  const [usuarioNotificaData, setUsuarioNotificaData] = useState([]);
  const [dataNombres, setDataNombres] = useState('');
  const [dataNombresNotifico, setDataNombresNotifico] = useState('');
  const [usuarioListData, setUsuarioListData] = useState([]);
  const [usuarioListData1, setUsuarioListData1] = useState([]);
  const [usuarioDataNombre, setUsuarioDataNombre] = useState(null);
  const [usuarioSede, setUsuarioSede] = useState(null);
  const [usuarioOrgano, setUsuarioOrgano] = useState(null);
  const [usuarioOficina, setUsuarioOficina] = useState(null);
  const [usuarioCargo, setUsuarioCargo] = useState(null);

  const [indiceMotivo, setIndiceMotivo] = useState(null);
  const [indiceOrigen, setIndiceOrigen] = useState(null);
  const [indiceUsuario, setIndiceUsuario] = useState(null);

  const [incidenciaArchivos, setIncidenciaArchivos] = useState(null);
  const [usuarioNotificaId, setUsuarioNotificaId] = useState(null);

  const [indiceIncidencia, setIndiceIncidencia] = useState({
    idIncidencia: null,
    persona: {
      idpersona: null,
    },
    persona_registro: {
      idpersona: null,
    },
    persona_asignado: {
      idpersona: null,
    },
    oficina: {
      idOficina: null,
    },
    motivo: {
      idMotivo: null,
    },
    origen: {
      idOrigen: null,
    },
    descripcion: '',
    historialIncidencia: {
      persona_registro: {
        idpersona: null
      },
      persona_asignado: {
        idpersona: null
      }
    }
  });

  const inputRefDNI = useRef(null);
  const inputRefApellido = useRef(null);
  const inputRefDNI1 = useRef(null);
  const inputRefApellido1 = useRef(null);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleResetValues = () => {
    setUsuarioData([]);
    setUsuarioDNI('');
    setUsuarioSede(null);
    setUsuarioOrgano(null);
    setUsuarioOficina(null);
    setUsuarioCargo(null);
    setIndiceUsuario(null);
    setUsuarioApellido('');
    setUsuarioDataNombre('');
    setDataNombres('');
    inputRefDNI.current.value = "";
    inputRefApellido.current.value = "";
  }

  const handleResetValues1 = () => {
    setUsuarioNotificaId(null)
    setUsuarioData([]);
    setUsuarioDNI('');
    setIndiceUsuario1(null);
    setUsuarioApellido1('');
    setUsuarioDataNombre1('');
    setDataNombresNotifico('');
    setDataNombres('');
    inputRefDNI1.current.value = "";
    inputRefApellido1.current.value = "";
  }

  const handleCloseModal = () => {
    setIndiceMotivo(null);
    setIndiceOrigen(null);
    setUsuarioNotificaData([]);
    setDataNombresNotifico('');
    handleResetValues();
    handleResetValues1();
    setRadioValue('apellido');
    setRadioUserValue('mismo');
    setOpenCreate(false);
    setUsuarioNotificaId(null);
  };

  const fetchDataSoporteIncidencias = async () => {
    await fetchIncidenciaSoporte(identificador).then((res) => {
      dispatch(getIncidenciasAsignadasSoporte(res));
    }).catch((err) => {
      // console.log("WARN " + err);
    });
  }

  const crearIncidencia = () => {
    var incidencia = {
      persona: {
        idpersona: indiceUsuario === null ? usuarioData.idpersona : indiceUsuario,
      },
      motivo: {
        idMotivo: indiceMotivo,
      },
      origen: {
        idOrigen: indiceOrigen,
      },
      descripcion: indiceIncidencia.descripcion,
      historialIncidencia: usuario?.rol === '[SOPORTE TECNICO]' ? [{
        persona_registro: {
          idpersona: identificador,
        },
        persona_asignado: {
          idpersona: identificador
        },
        persona_notifica: {
          idpersona: usuarioNotificaId === null ? usuarioListData[0].idpersona : usuarioNotificaId
        }
      }] : [{
        persona_registro: {
          idpersona: identificador,
        },
        persona_notifica: {
          idpersona: usuarioNotificaId === null ? usuarioNotificaData.idpersona : usuarioNotificaId
        }
      }],
      archivo: incidenciaArchivos,
    }
    dispatch(createIncidencia(incidencia))
      .then(() => {
        fetchDataSoporteIncidencias();
        handleCloseModal(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const buscarPorDni = async () => {
    await buscarUsuarioDni(usuarioDNI).then((res) => {
      fetchHistorialPersona(res.idpersona).then(historial => {
        setUsuarioSede(historial.data.oficina.organo.sede.sede)
        setUsuarioOrgano(historial.data.oficina.organo.organo)
        setUsuarioOficina(historial.data.oficina.oficina)
        setUsuarioCargo(historial.data.cargo.cargo)
      }).catch(() => {
        notification('Historial no encontrado', 'El usuario no pertenece a ningun sede, organo, sede', 'error', 'modalCrearIncidencia');
        handleResetValues();
      });
      setUsuarioData(res);
      setUsuarioNotificaData(res);
      setDataNombres(res.nombre + ' ' + res.apellido);
    }).catch(() => {
      notification('Usuario no encontrado', 'No se pudo encontrar el Usuario', 'error', 'modalCrearIncidencia');
      handleResetValues();
    });
  }

  const buscarPorDni1 = async () => {
    await buscarUsuarioDni(usuarioNotificaDNI).then((res) => {
      setUsuarioNotificaId(res.idpersona);
      setDataNombresNotifico(res.nombre + ' ' + res.apellido);
    }).catch(() => {
      notification('Usuario no encontrado', 'No se pudo encontrar el Usuario', 'error', 'modalCrearIncidencia');
      handleResetValues();
    });
  }

  const buscarPorApellido = async () => {
    await buscarPersonaApellido(usuarioApellido).then((res) => {
      if (res.data.length > 0) {
        setUsuarioListData(res.data);
        setOpenSearchUsuarios(true);
      } else {
        notification('Usuario no encontrado', 'No se pudo encontrar el usuario con ese apellido', 'error', 'modalCrearIncidencia');
        handleResetValues()
      }
    }).catch(() => {
      notification('Usuario no encontrado', 'No se pudo encontrar el usuario', 'error', 'modalCrearIncidencia');
      setUsuarioData([]);
      handleResetValues()
    })
  }

  const buscarPorApellido1 = async () => {
    await buscarPersonaApellido(usuarioApellido1).then((res) => {
      if (res.data.length > 0) {
        setUsuarioListData1(res.data);
        setOpenSearchUsuarios1(true);
      } else {
        notification('Usuario no encontrado', 'No se pudo encontrar el usuario con ese apellido', 'error', 'modalCrearIncidencia');
        handleResetValues()
      }
    }).catch(() => {
      notification('Usuario no encontrado', 'No se pudo encontrar el usuario', 'error', 'modalCrearIncidencia');
      setUsuarioData([]);
      handleResetValues()
    })
  }

  const seleccionarUsuario = async (user) => {
    await fetchHistorialPersona(user).then(historial => {
      console.log(historial);
      setUsuarioDataNombre(historial.data.persona.nombre + ' ' + historial.data.persona.apellido);
      setUsuarioNotificaData(historial.data.persona);
      setUsuarioSede(historial.data.oficina.organo.sede.sede)
      setUsuarioOrgano(historial.data.oficina.organo.organo)
      setUsuarioOficina(historial.data.oficina.oficina)
      setUsuarioCargo(historial.data.cargo.cargo)
    }).catch(() => {
      setOpenSearchUsuarios(false);
      notification('Error al Seleccionar', 'No se puede crear incidencia para este user, no tiene asignado a ninguna sede, organo, oficina', 'info', 'modalCrearIncidencia');
      handleResetValues();
    })
  }

  const seleccionarUsuario1 = async (user) => {
    setUsuarioDataNombre1(user.label);
    setUsuarioNotificaId(user.value);
  }

  const handleSearchDNI = () => {
    buscarPorDni();
  }

  const handleSearchDNI1 = () => {
    buscarPorDni1();
  }

  const handleChangeMotivo = value => {
    if (value === null) {
      return "SELECCIONE UN MOTIVO"
    } else {
      setIndiceMotivo(value.value);
    }
  };

  const handleChangeOrigen = value => {
    if (value === null) {
      return "SELECCIONE UN ORIGEN"
    } else {
      setIndiceOrigen(value.value);
    }
  };

  const handleChangeRadio = (value) => {
    handleResetValues();
    setRadioValue(value);
  }

  const handleChangeUsuario = (value) => {
    if (value === null) {
      return "SELECCIONE UN USUARIO"
    } else {
      seleccionarUsuario(value.value);
      setIndiceUsuario(value.value);
    }
  }

  const handleChangeUsuario1 = (value) => {
    if (value === null) {
      return "SELECCIONE UN USUARIO"
    } else {
      seleccionarUsuario1(value);
      setIndiceUsuario1(value.value);
    }
  }

  const handleSearchApellido = () => {
    buscarPorApellido();
  }

  const handleSearchApellido1 = () => {
    buscarPorApellido1();
  }

  const handleCloseModalSearch = () => {
    setOpenSearchUsuarios(false);
  }

  const handleCloseModalSearch1 = () => {
    setOpenSearchUsuarios1(false);
  }

  const handleSubmitFile = (e) => {
    setIncidenciaArchivos(e.target.files[0]);
  }

  const handleChangeUserRadio = (value) => {
    handleResetValues1();
    setRadioUserValue(value);
  }

  // MOTIVOS DE LA INCIDENCIA AGREGAR Y LISTAR

  const [motivos, setMotivos] = useState(motivoData);

  const listarMotivos = async () => {
    await fetchMotivos().then(res => {
      setMotivos(res.data);
    }).catch(() => {
      notification('Error al listar', 'No se pudo listar los motivos', 'error', 'modalCrearIncidencia');
    })
  }

  const initialMotivo = {
    idMotivo: null,
    motivo: "",
  }

  const [dataMotivo, setMotivo] = useState(initialMotivo);

  const { motivo } = dataMotivo;

  const inputRefMotivo = useRef(null);

  const saveMotivo = () => {
    dispatch(createMotivo1({ motivo }))
      .then(() => {
        listarMotivos();
        notification('Motivo creado', 'Se ha creado el motivo correctamente', 'success', 'modalCrearIncidencia');
        inputRefMotivo.current.value = "";
        setMotivo(initialMotivo);
      }).catch(err => {
        console.log(err);
        notification('Error al crear', 'No se pudo crear el motivo', 'error', 'modalCrearIncidencia');
      })
  }

  // ORIGENES DE LA INCIDENCIA AGREGAR Y LISTAR

  const [origenes, setOrigenes] = useState(origenData);

  const listarOrigenes = async () => {
    await fetchOrigen().then(res => {
      setOrigenes(res.data);
    }).catch(() => {
      notification('Error al listar', 'No se pudo listar los motivos', 'error', 'modalCrearIncidencia');
    })
  }

  const initialOrigen = {
    idOrigen: null,
    origen: "",
}

const [dataOrigen, setOrigen] = useState(initialOrigen);

const { origen } = dataOrigen;

const inputRefOrigen = useRef(null);

const saveOrigen = () => {
    dispatch(createOrigen1({ origen }))
        .then(() => {
          listarOrigenes();
          notification('Origen creado', 'Se ha creado el origen correctamente', 'success', 'modalCrearIncidencia');
          inputRefOrigen.current.value = "";
          setOrigen(initialOrigen);
        }).catch(err => {
            console.log(err);
            notification('Error al crear', 'No se pudo crear el origen', 'error', 'modalCrearIncidencia');
        })
}

  return (
    <>
      <Button leftIcon={<AddIcon />} size="sm" onClick={handleClickOpenCreate} colorScheme={'facebook'} _focus={{ boxShadow: "none" }}>
        NUEVA INCIDENCIA
      </Button>

      <Modal
        id="modalCrearIncidencia"
        isOpen={openCreate}
        onClose={handleCloseModal}
        size={'full'}
      >
        <ModalOverlay />
          <ModalContent borderRadius={'none'}>
            <ModalHeader>CREAR NUEVA INCIDENCIA PARA UN USUARIO</ModalHeader>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />
            <ModalBody borderRadius={'none'}>
              <Stack direction={['column', 'column', 'row', 'row']} spacing={2} mb={2} justify="space-between" >
                <Text fontWeight={'semibold'}>USUARIO QUIEN NOTIFICÓ</Text>
                <RadioGroup onChange={handleChangeUserRadio} value={radioUserValue}>
                  <Stack direction='row'>
                    <Radio size='md' value='mismo' _focus={{ boxShadow: "none" }} defaultChecked={true}>EL MISMO USUARIO QUIEN REPORTÓ</Radio>
                    <Radio size='md' value='otro' _focus={{ boxShadow: "none" }}>OTRO USUARIO</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>

              <Stack direction={'column'} spacing={2} mt={2} hidden={radioUserValue === 'mismo'} >
                <Tabs variant="enclosed-colored" w="full" size={'md'}>
                  <TabList textAlign="center" justifyContent="center">
                    <Tab _focus={{ boxShadow: "none" }} defaultChecked={true}>BUSQUEDA POR APELLIDOS</Tab>
                    <Tab _focus={{ boxShadow: "none" }}>BUSQUEDA POR DNI</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <HStack spacing={10} mt={2}>
                        <FormControl zIndex={0}>
                          <FormLabel>BUSQUEDA POR APELLIDO DEL USUARIO QUIEN NOTIFICÓ</FormLabel>
                          <InputGroup>
                            <InputRightElement
                              children={
                                <IconButton
                                  colorScheme='facebook'
                                  onClick={handleSearchApellido1}
                                  icon={<SearchIcon />}
                                  _focus={{ boxShadow: "none" }}
                                  disabled={usuarioApellido1 === null || usuarioApellido1.length < 3}
                                />
                              }
                            />
                            <Input placeholder="INGRESE EL APELLIDO" ref={inputRefApellido1} textTransform={'uppercase'} onChange={e => { setUsuarioApellido1(e.target.value.toUpperCase()) }} />
                          </InputGroup>
                        </FormControl>

                        <Modal
                          isOpen={openSearch1}
                          onClose={handleCloseModalSearch1}
                          size={'2xl'}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>LISTA DE USUARIOS CON EL APELLIDO BUSCADO</ModalHeader>
                            <ModalCloseButton _focus={{ boxShadow: "none" }} onClick={handleCloseModalSearch1} />
                            <ModalBody pb={6}>
                              <FormControl>
                                <FormLabel>LISTA DE USUARIOS</FormLabel>
                                <Select
                                  placeholder=" SELECCIONE UN USUARIO "
                                  onChange={handleChangeUsuario1}
                                  options={usuarioListData1?.map(usuario => ({
                                    value: usuario.idpersona,
                                    label: usuario.apellido + ', ' + usuario.nombre
                                  }))}
                                  isSearchable
                                  isClearable
                                />
                              </FormControl>
                            </ModalBody>
                            <ModalFooter>
                              <Button onClick={handleCloseModalSearch1} disabled={indiceUsuario1 === null} colorScheme="facebook">ACEPTAR</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>

                        <FormControl isRequired>
                          <FormLabel>NOMBRE DEL USUARIO QUIEN NOTIFICÓ</FormLabel>
                          <Input placeholder='NOMBRES APELLIDOS' value={usuarioDataNombre1 ? usuarioDataNombre1 : ''} readOnly />
                        </FormControl>
                      </HStack>
                    </TabPanel>
                    <TabPanel>
                      <HStack spacing={10} mt={2}>
                        <FormControl zIndex={0}>
                          <FormLabel>BUSQUEDA POR DNI</FormLabel>
                          <InputGroup >
                            <InputRightElement
                              children={
                                <IconButton
                                  colorScheme='facebook'
                                  onClick={handleSearchDNI1}
                                  icon={<SearchIcon />}
                                  _focus={{ boxShadow: "none" }}
                                  disabled={usuarioNotificaDNI === '' || usuarioNotificaDNI.length < 8 || usuarioNotificaDNI.length > 8}
                                />
                              }
                            />
                            <Input placeholder="DIGITE EL DNI" ref={inputRefDNI1} onChange={e => { setUsuarioNotificaDNI(e.target.value) }} />
                          </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>NOMBRE DEL USUARIO QUIEN NOTIFICÓ</FormLabel>
                          <Input placeholder='NOMBRES APELLIDOS' value={dataNombresNotifico ? dataNombresNotifico : ''} readOnly />
                        </FormControl>
                      </HStack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                {/* <RadioGroup onChange={handleChangeRadio} value={radioValue} mt={2}>
                <Stack direction='row'>
                  <Radio size='md' value='apellido' _focus={{ boxShadow: "none" }} defaultChecked={true}>BUSQUEDA POR APELLIDO</Radio>
                  <Radio size='md' value='dni' _focus={{ boxShadow: "none" }}>BUSQUEDA POR DNI</Radio>
                </Stack>
              </RadioGroup> */}
              </Stack>

              <Divider borderWidth="1px" borderColor={'#0078ff'} />

              <HStack spacing={2} mt={2} mb={2} justify="space-between">
                <Text fontWeight={'semibold'}>USUARIO QUIEN TIENE EL PROBLEMA</Text>
                <RadioGroup onChange={handleChangeRadio} value={radioValue} mt={2}>
                  <Stack direction='row'>
                    <Radio size='md' value='apellido' _focus={{ boxShadow: "none" }} defaultChecked={true}>BUSCAR POR APELLIDO</Radio>
                    <Radio size='md' value='dni' _focus={{ boxShadow: "none" }}>BUSCAR POR DNI</Radio>
                  </Stack>
                </RadioGroup>
              </HStack>

              <HStack spacing={10} mt={2} hidden={radioValue === 'apellido'} >
                <FormControl isRequired={radioValue === 'dni'} zIndex={0}>
                  <FormLabel>BUSQUEDA POR DNI</FormLabel>
                  <InputGroup >
                    <InputRightElement
                      children={
                        <IconButton
                          colorScheme='facebook'
                          onClick={handleSearchDNI}
                          icon={<SearchIcon />}
                          _focus={{ boxShadow: "none" }}
                          disabled={usuarioDNI === '' || usuarioDNI.length < 8 || usuarioDNI.length > 8}
                        />
                      }
                    />
                    <Input placeholder="DIGITE EL DNI" ref={inputRefDNI} onChange={e => { setUsuarioDNI(e.target.value) }} />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>NOMBRE DEL USUARIO QUIEN TIENE EL PROBLEMA</FormLabel>
                  <Input placeholder='NOMBRES APELLIDOS' value={dataNombres ? dataNombres : ''} readOnly />
                </FormControl>
              </HStack>

              <HStack spacing={10} mt={2} hidden={radioValue === 'dni'}>
                <FormControl isRequired={radioValue === 'apellido'} zIndex={0}>
                  <FormLabel>BUSQUEDA POR APELLIDOS</FormLabel>
                  <InputGroup>
                    <InputRightElement
                      children={
                        <IconButton
                          colorScheme='facebook'
                          onClick={handleSearchApellido}
                          icon={<SearchIcon />}
                          _focus={{ boxShadow: "none" }}
                          disabled={usuarioApellido === null || usuarioApellido.length < 3}
                        />
                      }
                    />
                    <Input placeholder="INGRESE EL APELLIDO" ref={inputRefApellido} textTransform={'uppercase'} onChange={e => { setUsuarioApellido(e.target.value.toUpperCase()) }} />
                  </InputGroup>
                </FormControl>

                <Modal
                  isOpen={openSearch}
                  onClose={handleCloseModalSearch}
                  size={'2xl'}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>LISTA DE USUARIOS CON EL APELLIDO BUSCADO</ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} onClick={handleCloseModalSearch} />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>LISTA DE USUARIOS</FormLabel>
                        <Select
                          placeholder=" SELECCIONE UN USUARIO "
                          onChange={handleChangeUsuario}
                          options={usuarioListData?.map(usuario => ({
                            value: usuario.idpersona,
                            label: usuario.apellido + ', ' + usuario.nombre
                          }))}
                          isSearchable
                          isClearable
                        />
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={handleCloseModalSearch} disabled={indiceUsuario === null} colorScheme="facebook">ACEPTAR</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <FormControl isRequired>
                  <FormLabel>NOMBRE DEL USUARIO</FormLabel>
                  <Input placeholder='NOMBRES APELLIDOS' value={usuarioDataNombre ? usuarioDataNombre : ''} readOnly />
                </FormControl>
              </HStack>

              <TableContainer>
                <Table size='sm'>
                  <Thead>
                    <Tr>
                      <Th>SEDE</Th>
                      <Th>ORGANO</Th>
                      <Th>OFICINA</Th>
                      <Th>CARGO</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{usuarioSede}</Td>
                      <Td>{usuarioOrgano}</Td>
                      <Td>{usuarioOficina}</Td>
                      <Td>{usuarioCargo}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Divider mt={2} borderWidth="1px" borderColor={'#0078ff'} />
              <HStack spacing={10} mt={2}>
                <FormControl>
                  <HStack mb={1} justify="space-between">
                    <Text fontWeight={'semibold'}>ORIGEN</Text>
                    <Popover placement='left'>
                      <PopoverTrigger>
                        <Button size='xs' leftIcon={<AddIcon />} _focus={{ boxShadow: "none" }} colorScheme="messenger">
                          NUEVO
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent _focus={{ boxShadow: "none" }}>
                        <PopoverArrow />
                        <PopoverCloseButton _focus={{ boxShadow: "none" }} />
                        <PopoverHeader>AGREGAR NUEVO</PopoverHeader>
                        <PopoverBody>
                          <FormControl>
                            <FormLabel>ORIGEN</FormLabel>
                            <Input
                              textTransform={'uppercase'}
                              placeholder="ORIGEN INCIDENCIA"
                              ref={inputRefOrigen}
                              type="text"
                              fontSize={'xs'}
                              onChange={(e) => { setOrigen({ ...dataOrigen, origen: e.target.value.toUpperCase() }) }}
                            />
                          </FormControl>
                        </PopoverBody>
                        <PopoverFooter flex="1" justifyContent="right">
                          <ButtonGroup size="sm" w="full">
                            <Button
                              onClick={() => saveOrigen()}
                              autoFocus
                              disabled={dataOrigen.origen === "" ? true : false}
                              colorScheme="green"
                              _focus={{ boxShadow: "none" }}
                            >GUARDAR</Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                  <Select
                    placeholder="SELECCIONE UN ORIGEN"
                    onChange={handleChangeOrigen}
                    options={origenes.map(origen => ({
                      value: origen.idOrigen,
                      label: origen.origen
                    }))}
                    isSearchable
                  />
                </FormControl>
                <FormControl mt={2}>
                  <HStack mb={1} justify="space-between">
                    <Text fontWeight={'semibold'}>MOTIVO</Text>
                    <Popover placement='left'>
                      <PopoverTrigger>
                        <Button size='xs' leftIcon={<AddIcon />} _focus={{ boxShadow: "none" }} colorScheme="messenger">
                          NUEVO
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent _focus={{ boxShadow: "none" }}>
                        <PopoverArrow />
                        <PopoverCloseButton _focus={{ boxShadow: "none" }} />
                        <PopoverHeader>AGREGAR NUEVO</PopoverHeader>
                        <PopoverBody>
                          <FormControl>
                            <FormLabel>MOTIVO</FormLabel>
                            <Input
                              textTransform={'uppercase'}
                              placeholder="MOTIVO INCIDENCIA"
                              type={'text'}
                              fontSize={'xs'}
                              ref={inputRefMotivo}
                              onChange={(e) => { setMotivo({ ...dataMotivo, motivo: (e.target.value).toUpperCase() }) }}
                            />
                          </FormControl>
                        </PopoverBody>
                        <PopoverFooter flex="1" justifyContent="right">
                          <ButtonGroup size="sm" w="full">
                            <Button
                              onClick={() => saveMotivo()}
                              autoFocus
                              disabled={dataMotivo.motivo === "" ? true : false}
                              colorScheme="green"
                              _focus={{ boxShadow: "none" }}
                            >GUARDAR</Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                  <Select
                    placeholder="SELECCIONE UN MOTIVO "
                    onChange={handleChangeMotivo}
                    options={motivos.map(motivo => ({
                      value: motivo.idMotivo,
                      label: motivo.motivo
                    }))}
                    isSearchable
                    isClearable
                    required
                  />
                </FormControl>
              </HStack>
              <FormControl mt={2} isRequired>
                <FormLabel>DESCRIPCIÓN</FormLabel>
                <ReactQuill
                  theme="snow"
                  formats={formats}
                  modules={modules}
                  style={{
                    textTransform: 'uppercase',
                  }}
                  placeholder="Aqui describe la incidencia"
                  onChange={(e) => {
                    setIndiceIncidencia({
                      ...indiceIncidencia,
                      descripcion: e.valueOf().toUpperCase(),
                    });
                  }}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>ARCHIVO(opcional)</FormLabel>
                <Input
                  type='file'
                  onChange={handleSubmitFile}
                  accept="image/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter borderRadius={'none'}>
              <Button
                disabled={indiceMotivo === null ? true : false || indiceOrigen === null ? true : false || radioValue === 'apellido' ? indiceUsuario === null ? true : false : false}
                type={'submit'}
                colorScheme={'facebook'}
                autoFocus mr={3}
                _focus={{ boxShadow: "none" }}
                onClick={() => { crearIncidencia() }}
              >
                GUARDAR
              </Button>
              <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  );
};

export default IncidenciaAgregar;
