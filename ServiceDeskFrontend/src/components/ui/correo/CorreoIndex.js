import React, { useEffect } from "react";

import {
  Box,
  useColorModeValue,
  HStack,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Text,
  Tag,
  TagLabel,
  Icon,
} from "@chakra-ui/react";

import { RiInboxArchiveFill, RiSendPlane2Fill, RiNotification2Fill } from "react-icons/ri";
import { SiAddthis } from "react-icons/si";

import { CorreoRecibido } from "./CorreoRecibido";
import { CorreoEnviado } from "./CorreoEnviado";
import CorreoCrear from "./CorreoCrear";
import { store } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCorreoRecibido } from "../../../actions/correo";
import { getCorreosRecibidos } from "./index";

export default function CorreoIndex(){

  const bg = useColorModeValue("white", "gray.900");
  const hover = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.500", "gray.300");
  const hoverTextColor = useColorModeValue("black", "white");
  
  const correosRecibidos = store.getState().correoRecibido.rows;
  const correosEnviados = store.getState().correoEnviado.rows;

  const { identificador } = useSelector(state => state.auth);
  
  const dispatch = useDispatch();

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

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={'md'}
      bg={bg}
    >
      <HStack
        spacing="24px"
        width={'100%'}
        justifyContent={'space-between'}
        verticalAlign={'center'}
        p={4}
      >
        <Box>
          <Text fontSize="lg" fontWeight="600">
            Administración de Correos
          </Text>
        </Box>
      </HStack>
      <Tabs defaultIndex={1} colorScheme='blue' isFitted w={'100%'}>
        <TabList color={textColor}>
          <Tab py={4} _focus={{ boxShadow: "none" }} _hover={{ backgroundColor: hover, color: hoverTextColor, borderRadius: 'sm' }}>
              <Icon as={SiAddthis}/>
          </Tab>
          <Tab onClick={fetchCorreoRecibidoData} py={4} _focus={{ boxShadow: "none" }} _hover={{ backgroundColor: hover, color: hoverTextColor, borderRadius: 'sm' }}>
            <HStack spacing={3}>
              <Icon boxSize={5} as={RiInboxArchiveFill} />
              <Text>Recibidos</Text>
                  <Tag
                    borderRadius='full'
                    variant='solid'
                    colorScheme='blue'
                    size='sm'
                  >
                    <TagLabel>{correosRecibidos.length}</TagLabel>
                  </Tag>
            </HStack>
          </Tab>
          <Tab py={4} _focus={{ boxShadow: "none" }} _hover={{ backgroundColor: hover, color: hoverTextColor, borderRadius: 'sm' }}>
            <HStack spacing={4}>
              <Icon boxSize={5} as={RiSendPlane2Fill} />
              <Text>Enviados</Text>
              <Tag
                borderRadius='full'
                variant='solid'
                colorScheme='red'
                size='sm'
              >
                <TagLabel>{correosEnviados.length}</TagLabel>
              </Tag>
            </HStack>
          </Tab>
          <Tab py={4} _focus={{ boxShadow: "none" }} _hover={{ backgroundColor: hover, color: hoverTextColor, borderRadius: 'sm' }}>
            <HStack spacing={3}>
              <Icon boxSize={5} as={RiNotification2Fill} />
              <Text>Notificaciones</Text>
                  <Tag
                    borderRadius='full'
                    variant='solid'
                    colorScheme='green'
                    size='sm'
                  >
                    <TagLabel>0</TagLabel>
                  </Tag>
            </HStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CorreoCrear />
          </TabPanel>
          <TabPanel>
            <CorreoRecibido />
          </TabPanel>
          <TabPanel>
            <CorreoEnviado />
          </TabPanel>
          <TabPanel>
            <CorreoEnviado />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};