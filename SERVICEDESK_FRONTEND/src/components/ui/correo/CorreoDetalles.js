import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Input,
  Textarea,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Spacer,
  Text,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

import { ViewIcon } from '@chakra-ui/icons';

import { fetchCorreoDetalles, correoLeido } from '../../../actions/correo';
import { fetchCorreoRecibido } from "../../../actions/correo";
import { getCorreosRecibidos } from "./index";
import { store } from '../../../store/store';

const CorreoDetalles = props => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();
  const { identificador } = useSelector(state => state.auth);

  const [detalleCorreo, setDetalleCorreo] = useState([]);
  const [correoRemitente, setCorreoRemitente] = useState([]);
  const [correoDestinatario, setCorreoDestinatario] = useState([]);
  const [correoPerfilRemitente, setCorreoPerfilRemitente] = useState([]);
  const [correoPerfilDestinatario, setCorreoPerfilDestinatario] = useState([]);

  const fetchCorreoRecibidoData = async () => {
    await fetchCorreoRecibido(identificador).then(res => {
      dispatch(getCorreosRecibidos(res));
    });
  };
  useEffect(() => {
    if (store.getState().correoRecibido.checking) {
      fetchCorreoRecibidoData();
    }
  });

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const obtenerCorreodetalle = async () => {
    handleClickOpenCreate();
    await fetchCorreoDetalles(props.rowId).then(correo => {
        setDetalleCorreo(correo.data);
        setCorreoDestinatario(correo.data.to);
        setCorreoRemitente(correo.data.from);
        setCorreoPerfilDestinatario(correo.data.to.perfilPersona);
        setCorreoPerfilRemitente(correo.data.from.perfilPersona);
    });
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
    dispatch(correoLeido(props.rowId)).
    then(() => {
      fetchCorreoRecibidoData();
    });
  };

  return (
    <>
      <IconButton
        icon={<ViewIcon />}
        variant={'outline'}
        colorScheme={'blue'}
        onClick={obtenerCorreodetalle}
        fontSize={'22px'}
        size={'sm'}
        _focus={{ boxShadow: "none" }}
      />

      <Drawer
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'xl'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <HStack>
              <Text>DETALLES DEL CORREO</Text>
              <Text fontWeight={'normal'}>{detalleCorreo.idCorreo}</Text>
            </HStack>
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody pb={6}>
            <Flex> 
              <Text fontWeight={'bold'}>FECHA DEL ENVÍO O RECEPCIÓN DEL MENSAJE</Text>
              <Spacer />
              <Text>{detalleCorreo.fecha}</Text>
            </Flex>
            <VStack spacing={'10px'}>
              <HStack spacing={20} mt={4} w={'100%'}>
                <FormControl>
                  <FormLabel fontWeight={'semibold'}>ASUNTO DEL MENSAJE</FormLabel>
                  <Input size={'sm'} value={detalleCorreo.asunto} state={''} onChange={null} readOnly />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel fontWeight={'bold'}>DESCRIPCIÓN DEL MENSAJE</FormLabel>
                <Textarea size={'sm'} value={detalleCorreo.mensaje} state={''} onChange={null} readOnly />
              </FormControl>
            </VStack>
            {/* Acordion items */}
            <Accordion defaultIndex={[0]} mt={4} allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton _focus={{ boxShadow: "none" }}>
                    <Box flex="1" ml={0}  textAlign="left" fontWeight={'bold'}>
                      DETALLES DEL USUARIO REMITENTE
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <SimpleGrid columns={2} spacing={5}>
                      <Box>
                          <Text fontWeight={'bold'}>NOMBRES</Text>
                          <Text>{correoRemitente.nombre}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>APELLIDOS</Text>
                          <Text>{correoRemitente.apellido}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>DNI</Text>
                          <Text>{correoRemitente.dni}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>PERFIL PERSONA</Text>
                          <Text>{correoPerfilRemitente.perfil}</Text>
                      </Box>
                    </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _focus={{ boxShadow: "none" }}>
                    <Box flex="1" ml={0}  textAlign="left" fontWeight={'bold'}>
                      DETALLES DEL USUARIO DESTINATARIO
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <SimpleGrid columns={2} spacing={5}>
                      <Box>
                          <Text fontWeight={'bold'}>NOMBRES</Text>
                          <Text>{correoDestinatario.nombre}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>APELLIDOS</Text>
                          <Text>{correoDestinatario.apellido}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>DNI</Text>
                          <Text>{correoDestinatario.dni}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>PERFIL PERSONA</Text>
                          <Text>{correoPerfilDestinatario.perfil}</Text>
                      </Box>
                    </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
             
            </Accordion>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme={'blue'} onClick={handleCloseModal} _focus={{ boxShadow: "none" }}>OK</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CorreoDetalles;
