import React, { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormLabel,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Text,
  SimpleGrid,
  Badge,
  Divider,
  useColorModeValue,
  Flex,
  Tooltip,
} from '@chakra-ui/react';

import { ViewIcon } from '@chakra-ui/icons';

import { fetchIncidenciaDetalles } from '../../../actions/incidencia';
import { fetchHistorialPersona } from '../../../actions/historialpersona';
import Moment from 'moment';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//import parse from 'html-react-parser';

const IncidenciaDetalles = (props) => {
  const colorStatus = useColorModeValue('gray.700', 'white');
  const bgAcordion = useColorModeValue('gray.100', 'gray.600');

  const [openCreate, setOpenCreate] = React.useState(false);

  const [detalleIncidencia, setDetalleIncidencia] = useState([]);
  const [incidenciaHistorial, setIncidenciaHistorial] = useState([]);
  const [incidenciaMotivo, setIncidenciaMotivo] = useState([]);
  const [incidenciaOrigen, setIncidenciaOrigen] = useState([]);
  const [incidenciaOficina, setIncidenciaOficina] = useState([]);
  const [incidenciaOrgano, setIncidenciaOrgano] = useState([]);
  const [incidenciaSede, setIncidenciaSede] = useState([]);
  const [incidenciaPersona, setIncidenciaPersona] = useState([]);
  const [incidenciaPerfilPersona, setIncidenciaPerfilPersona] = useState([]);
  const [incidenciaPersonaAsignado, setIncidenciaPersonaAsignado] = useState([]);
  const [incidenciaPersonaReporta, setIncidenciaPersonaReporta] = useState([]);
  const [incidenciaPerfilPersonaAsignado, setIncidenciaPerfilPersonaAsignado] = useState([]);
  const [incidenciaUsuarioCargo, setIncidenciaUsuarioCargo] = useState('');
  const [incidenciaPersonaNotificaPerfil, setIncidenciaPersonaNotificaPerfil] = useState([]);

  const obtenerIncideciadetalle = async () => {
    await fetchIncidenciaDetalles(props.rowId).then(incidencia => {
      setDetalleIncidencia(incidencia.data);
      var incidenciaHistorialFilter = [];
      incidenciaHistorialFilter = incidencia.data.historialIncidencia.filter(historial => historial.estado === 'A');
      setIncidenciaHistorial(incidenciaHistorialFilter);
      setIncidenciaMotivo(incidencia.data.motivo);
      setIncidenciaOrigen(incidencia.data.origen);
      setIncidenciaOficina(incidencia.data.oficina);
      setIncidenciaOrgano(incidencia.data.oficina.organo);
      setIncidenciaSede(incidencia.data.oficina.organo.sede);
      setIncidenciaPersona(incidencia.data.persona);
      setIncidenciaPerfilPersona(incidencia.data.persona.perfilPersona);
      setIncidenciaPersonaReporta(incidenciaHistorialFilter.map(persona => persona?.persona_notifica));
      setIncidenciaPersonaNotificaPerfil(incidenciaHistorialFilter.map(persona => persona?.persona_notifica?.perfilPersona));
      fetchHistorialPersona(incidencia.data.persona.idpersona).then(historial => {
        setIncidenciaUsuarioCargo(historial?.data.cargo.cargo);
      })
      if (incidenciaHistorialFilter.persona_asignado === null) {
        setIncidenciaPersonaAsignado(null);
      } else {
        setIncidenciaPersonaAsignado(incidenciaHistorialFilter.map(persona => persona.persona_asignado));
        setIncidenciaPerfilPersonaAsignado(incidenciaHistorialFilter.map(persona => persona.persona_asignado?.perfilPersona));
      }
    });
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
    obtenerIncideciadetalle();
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  return (
    <>
      <Tooltip hasArrow placement="auto" label="Ver Detalles de la Incidencia">
        <IconButton
          icon={<ViewIcon />}
          variant={'outline'}
          colorScheme={'facebook'}
          onClick={handleClickOpenCreate}
          size={'sm'}
          fontSize={'20px'}
          _focus={{ boxShadow: 'none' }}
        />
      </Tooltip>

      <Drawer
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={"xl"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Box flex="1" textAlign="center" fontSize={'20px'}>
              <Text as="u" fontWeight={'bold'}>DETALLES DE LA INCIDENCIA</Text>
            </Box>
          </DrawerHeader>
          <DrawerCloseButton _focus={{ boxShadow: 'none' }} />
          <DrawerBody pb={2}>
            <Box flex="1" textAlign="center">
              <SimpleGrid columns={4} spacing={1}>
                <Box>
                  <Text fontSize={'14px'} fontWeight={'bold'}>
                    FECHA Y HORA
                  </Text>
                  <Text fontSize={'13px'}>{Moment(detalleIncidencia.fecha).format("yyyy-MM-DD - HH:mm:ss")}</Text>
                </Box>
                <Box>
                  <Text fontSize={'14px'} fontWeight={'bold'}>
                    ORIGEN INCIDENCIA
                  </Text>
                  <Text fontSize={'13px'}>{incidenciaOrigen.origen}</Text>
                </Box>
                <Box>
                  <Text fontSize={'14px'} fontWeight={'bold'}>
                    MOTIVO INCIDENCIA
                  </Text>
                  <Text fontSize={'13px'}>{incidenciaMotivo.motivo}</Text>
                </Box>
                <Box>
                  <Text fontSize={'14px'} fontWeight={'bold'} mb={-1}>
                    ESTADO INCIDENCIA
                  </Text>
                  <Badge
                    variant={'solid'}
                    fontSize={'11px'}
                    p={0.5}
                    colorScheme={
                      incidenciaHistorial[0]?.estadoIncidencia === 'P'
                        ? 'red'
                        : incidenciaHistorial[0]?.estadoIncidencia === 'T'
                          ? 'yellow'
                          : 'green'
                    }
                  >
                    {incidenciaHistorial[0]?.estadoIncidencia === 'P'
                      ? 'PENDIENTE'
                      : incidenciaHistorial[0]?.estadoIncidencia === 'T'
                        ? 'EN TRÁMITE'
                        : 'ATENDIDO'}
                  </Badge>
                </Box>
              </SimpleGrid>
            </Box>
            <Flex w='full' mt={2}>
              <Box flex="1" textAlign="center">
                <FormControl>
                  <FormLabel
                    fontSize={'14px'}
                    textAlign="center"
                    fontWeight={'bold'}
                  >
                    DESCRIPCIÓN DE LA INCIDENCIA
                  </FormLabel>
                  <ReactQuill
                    style={{
                      border: '1px solid #385898',
                      borderRadius: '5px',
                      color: '#385898',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      maxHeight: '60px',
                    }}
                    scrollingContainer="true"
                    tabIndex={2}
                    theme="bubble"
                    value={detalleIncidencia.descripcion}
                    readOnly={true}
                  />
                </FormControl>
              </Box>
            </Flex>
            <Accordion defaultIndex={[0, 2, 3]} mt={2} allowMultiple>
              <AccordionItem>
                <AccordionButton
                  _focus={{ boxShadow: 'none' }}
                  _expanded={{ bg: bgAcordion, color: colorStatus }}
                >
                  <Box
                    flex="1"
                    fontSize={'14px'}
                    textAlign="center"
                    fontWeight={'bold'}
                  >
                    DETALLES DEL USUARIO CON EL PROBLEMA
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={2}>
                  <Box flex="1" textAlign="center" fontSize={'13px'}>
                    <SimpleGrid columns={4} spacing={1}>
                      <Box>
                        <Text fontWeight={'bold'}>NOMBRES</Text>
                        <Text>{incidenciaPersona.nombre}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>APELLIDOS</Text>
                        <Text>{incidenciaPersona.apellido}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>DNI</Text>
                        <Text>{incidenciaPersona.dni}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>PERFIL PERSONA</Text>
                        <Text>{incidenciaPerfilPersona.perfil}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>NUMERO DE CELULAR</Text>
                        <Text>{incidenciaPersona.celular}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>CORREO ELECTRÓNICO</Text>
                        <Text>{incidenciaPersona.correo}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>TELEFONO</Text>
                        <Text>{incidenciaPersona.telefono}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>ANEXO</Text>
                        <Text>{incidenciaPersona.anexo}</Text>
                      </Box>
                    </SimpleGrid>
                    <Divider mt={1} mb={1} />
                    <SimpleGrid columns={[2, 4, 4]} spacing={1}>
                      <Box>
                        <Text fontWeight={'bold'}>SEDE</Text>
                        <Text>{incidenciaSede.sede}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>ORGANO</Text>
                        <Text>{incidenciaOrgano.organo}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>OFICINA</Text>
                        <Text>{incidenciaOficina.oficina}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>CARGO</Text>
                        <Text>{incidenciaUsuarioCargo}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton
                  _focus={{ boxShadow: 'none' }}
                  _expanded={{ bg: bgAcordion, color: colorStatus }}
                >
                  <Box
                    flex="1"
                    fontSize={'14px'}
                    textAlign="center"
                    fontWeight={'bold'}
                  >
                    DETALLES DEL USUARIO QUIEN REPORTÓ O NOTIFICÓ
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={2}>
                  <Box flex="1" textAlign="center" fontSize={'13px'}>
                    <SimpleGrid columns={4} spacing={1}>
                      <Box>
                        <Text fontWeight={'bold'}>NOMBRES</Text>
                        <Text>{incidenciaPersonaReporta[0]?.nombre}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>APELLIDOS</Text>
                        <Text>{incidenciaPersonaReporta[0]?.apellido}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>DNI</Text>
                        <Text>{incidenciaPersonaReporta[0]?.dni}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>PERFIL PERSONA</Text>
                        <Text>{incidenciaPersonaNotificaPerfil[0]?.perfil}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>NUMERO DE CELULAR</Text>
                        <Text>{incidenciaPersonaReporta[0]?.celular}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>CORREO ELECTRÓNICO</Text>
                        <Text>{incidenciaPersonaReporta[0]?.correo}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>TELEFONO</Text>
                        <Text>{incidenciaPersonaReporta[0]?.telefono}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>ANEXO</Text>
                        <Text>{incidenciaPersonaReporta[0]?.anexo}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
              {incidenciaPersonaAsignado[0] === null ?
                (
                  <AccordionItem>
                    <AccordionButton
                      _focus={{ boxShadow: 'none' }}
                      _expanded={{ bg: bgAcordion, color: colorStatus }}
                    >
                      <Box
                        flex="1"
                        textAlign="center"
                        fontWeight={'bold'}
                        fontSize={'14px'}
                        color={'red.500'}
                      >
                        ESTA INCIDENCIA NO ESTÁ ASIGNADO A NINGÚN TÉCNICO
                      </Box>
                    </AccordionButton>
                  </AccordionItem>
                ) : (
                  <AccordionItem>
                    <AccordionButton
                      _focus={{ boxShadow: 'none' }}
                      _expanded={{ bg: bgAcordion, color: colorStatus }}
                    >
                      <Box
                        flex="1"
                        textAlign="center"
                        fontWeight={'bold'}
                        fontSize={'14px'}
                      >
                        DETALLES DEL TÉCNICO ASIGNADO
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                      <Box flex="1" textAlign="center" fontSize={'13px'}>
                        <SimpleGrid columns={4} alignItems='center' spacing={1}>
                          <Box>
                            <Text fontWeight={'bold'}>NOMBRES</Text>
                            <Text>{incidenciaPersonaAsignado[0]?.nombre}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight={'bold'}>APELLIDOS</Text>
                            <Text>{incidenciaPersonaAsignado[0]?.apellido}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight={'bold'}>DNI</Text>
                            <Text>{incidenciaPersonaAsignado[0]?.dni}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight={'bold'}>PERFIL PERSONA</Text>
                            <Text>{incidenciaPerfilPersonaAsignado[0]?.perfil}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight={'bold'}>NUMERO DE CELULAR</Text>
                            <Text>{incidenciaPersonaAsignado[0]?.celular}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight={'bold'}>CORREO ELECTRÓNICO</Text>
                            <Text>{incidenciaPersonaAsignado[0]?.correo}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight={'bold'}>TELEFONO</Text>
                            <Text>{incidenciaPersonaAsignado[0]?.telefono}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight={'bold'}>ANEXO</Text>
                            <Text>{incidenciaPersonaAsignado[0]?.anexo}</Text>
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                )}
            </Accordion>
            { detalleIncidencia?.descripcionIncidencia === null ?
              (
                <Box flex="1" textAlign="center" mt={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={'14px'}
                      textAlign="center"
                      fontWeight={'bold'}
                      color={'red.500'}
                    >
                      ESTA INCIDENCIA AÚN NO TIENE UNA ATENCIÓN DE UN SOPORTE T.
                    </FormLabel>
                  </FormControl>
                </Box>
              ) : (
                detalleIncidencia?.descripcionIncidencia?.descripcionTramite === null ? (
                  <Box flex="1" mt={2} justify="center" alignItems={'center'}>
                    <FormControl>
                      <FormLabel
                        fontSize={'14px'}
                        textAlign="center"
                        fontWeight={'bold'}
                      >
                        DESCRIPCIÓN DE LA ATENCIÓN DE LA INCIDENCIA
                      </FormLabel>
                      <Box flex="1" mt={2} textAlign="center" alignItems={'center'}>
                        <ReactQuill
                          style={{
                            border: '1px solid #38a169',
                            borderRadius: '5px',
                            color: '#38a169',
                            fontWeight: 'bold',
                            fontSize: '13px',
                            maxHeight: '60px',
                          }}
                          theme="bubble"
                          value={detalleIncidencia?.descripcionIncidencia?.descripcionAtencion}
                          rows={2}
                          scrollingContainer="true"
                          tabIndex={2}
                          readOnly
                        />
                      </Box>
                    </FormControl>
                  </Box>
                ) : (
                  detalleIncidencia?.descripcionIncidencia?.descripcionAtencion === null ? (
                    <Box flex="1" mt={2} justify="center" alignItems={'center'}>
                    <FormControl>
                      <FormLabel
                        fontSize={'14px'}
                        textAlign="center"
                        fontWeight={'bold'}
                      >
                        DESCRIPCIÓN DE LA OBSERVACIÓN DEL CAMBIO A ESTADO EN TRÁMITE
                      </FormLabel>
                      <Box flex="1" mt={2} textAlign="center" alignItems={'center'}>
                        <ReactQuill
                          style={{
                            border: '1px solid #d69e2e',
                            borderRadius: '5px',
                            color: '#d69e2e',
                            fontWeight: 'bold',
                            fontSize: '13px',
                            maxHeight: '60px',
                          }}
                          theme="bubble"
                          value={detalleIncidencia?.descripcionIncidencia?.descripcionTramite}
                          rows={2}
                          scrollingContainer="true"
                          tabIndex={2}
                          readOnly
                        />
                      </Box>
                    </FormControl>
                  </Box>
                  ) : (
                    <>
                      <Box flex="1" mt={2} justify="center" alignItems={'center'}>
                        <FormControl>
                          <FormLabel
                            fontSize={'14px'}
                            textAlign="center"
                            fontWeight={'bold'}
                          >
                            DESCRIPCIÓN DE LA OBSERVACIÓN DEL CAMBIO A ESTADO EN TRÁMITE
                          </FormLabel>
                          <Box flex="1" mt={2} textAlign="center" alignItems={'center'}>
                            <ReactQuill
                              style={{
                                border: '1px solid #d69e2e',
                                borderRadius: '5px',
                                color: '#d69e2e',
                                fontWeight: 'bold',
                                fontSize: '13px',
                                maxHeight: '60px',
                              }}
                              theme="bubble"
                              value={detalleIncidencia?.descripcionIncidencia?.descripcionTramite}
                              rows={2}
                              scrollingContainer="true"
                              tabIndex={2}
                              readOnly
                            />
                          </Box>
                        </FormControl>
                      </Box>

                      <Box flex="1" mt={2} justify="center" alignItems={'center'}>
                        <FormControl>
                          <FormLabel
                            fontSize={'14px'}
                            textAlign="center"
                            fontWeight={'bold'}
                          >
                            DESCRIPCIÓN DE LA ATENCIÓN DE LA INCIDENCIA
                          </FormLabel>
                          <Box flex="1" mt={2} textAlign="center" alignItems={'center'}>
                            <ReactQuill
                              style={{
                                border: '1px solid #38a169',
                                borderRadius: '5px',
                                color: '#38a169',
                                fontWeight: 'bold',
                                fontSize: '13px',
                                maxHeight: '60px',
                              }}
                              theme="bubble"
                              value={detalleIncidencia?.descripcionIncidencia?.descripcionAtencion}
                              rows={2}
                              scrollingContainer="true"
                              tabIndex={2}
                              readOnly
                            />
                          </Box>
                        </FormControl>
                      </Box>
                    </>
                  )
                )) }

          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme={'facebook'} onClick={handleCloseModal} >
              OK
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default IncidenciaDetalles;