import React, { useState } from 'react';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalFooter,
    IconButton,
    Button,
    Flex,
    Box,
    chakra,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    HStack,
    Avatar,
    Text,
    Badge,
    Stack,
    Divider,
    VStack,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { FaHistory } from 'react-icons/fa';
import Moment from 'moment';
import parse from 'html-react-parser';

export const IncidenciaHistorial = ({ rowData }) => {

    const [openModal, setOpenModal] = useState(false);

    const handleClickOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <>
            <IconButton
                size="sm"
                colorScheme="orange"
                variant={'outline'}
                icon={<FaHistory fontSize={'20px'} />}
                ml={2}
                _focus={{ boxShadow: 'none' }}
                onClick={handleClickOpenModal}
            />
            <Modal isOpen={openModal} onClose={handleCloseModal} size={'5xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader w={'full'} flex="1" textAlign="center" fontWeight={'bold'}>MÁS DETALLES DE LA INCIDENCIA</ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody>
                        <Flex
                            bg="#edf3f8"
                            _dark={{
                                bg: "#3e3e3e",
                            }}
                            py={5}
                            px={5}
                            w="full"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box
                                w='full'
                                px={8}
                                py={4}
                                rounded="lg"
                                shadow="lg"
                                bg="white"
                                _dark={{
                                    bg: "gray.800",
                                }}
                            >
                                <Flex justifyContent="space-between" alignItems="center">
                                    <chakra.span
                                        fontSize="sm"
                                        color="gray.600"
                                        _dark={{
                                            color: "gray.400",
                                        }}
                                    >
                                        {Moment(rowData.fecha).format('yyyy-MM-DD - HH:mm:ss')}
                                    </chakra.span>
                                    <HStack alignItems={'baseline'}>
                                        <Avatar color="white" size="xs" name={rowData.persona.nombre + ' ' + rowData.persona.apellido} />
                                        <Text>{rowData.persona.nombre + ' ' + rowData.persona.apellido}</Text>
                                    </HStack>
                                </Flex>

                                <Box mt={2} w='full'>
                                    <Flex justifyContent={'space-between'} alignItems="center" w="full">
                                        <HStack alignItems={'baseline'}>
                                            <Text fontSize="md" fontWeight="bold">
                                                MOTIVO
                                            </Text>
                                            <Text fontSize="sm">
                                                {rowData?.motivo?.motivo}
                                            </Text>
                                        </HStack>
                                        <HStack alignItems={'baseline'}>
                                            <Text fontSize="md" fontWeight="bold">
                                                ORIGEN
                                            </Text>
                                            <Text fontSize="sm">
                                                {rowData?.motivo?.motivo}
                                            </Text>
                                        </HStack>
                                    </Flex>

                                    <Text textAlign={'center'} fontSize="md" fontWeight="bold">
                                        DESCRIPCIÓN
                                    </Text>
                                    <Box textAlign={'center'} fontSize="sm">
                                        {parse(rowData?.descripcion)}
                                    </Box>
                                </Box>

                                <Flex alignItems="center" mt={4} w={'full'}>
                                    <Accordion w='full' allowMultiple>
                                        <AccordionItem>
                                            <AccordionButton _focus={{ boxShadow: "none" }}>
                                                <Box flex='1' textAlign='center'>
                                                    <Text fontWeight={'bold'}>
                                                        HISTORIAL DE LA INCIDENCIA
                                                    </Text>
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                            <AccordionPanel pb={4} w="full">
                                                {rowData.historialIncidencia.map((item, index) => (
                                                    <>
                                                        <Flex justifyContent={'space-between'} alignItems="center" w="full" key={index}>
                                                            <Stack direction='row' w='full' h='100px' p={4}>
                                                                <VStack textAlign="right" fontSize="xs">
                                                                    <Text textAlign={'right'}>{Moment(item.fecha).format('DD/MM/YYYY')}</Text>
                                                                    <Text textAlign={'right'}>{Moment(item.fecha).format('HH:mm:ss')}</Text>
                                                                </VStack>
                                                                <Divider borderWidth="0.5px" borderColor={
                                                                    item?.estadoIncidencia === 'P'
                                                                        ? 'red.600'
                                                                        : item?.estadoIncidencia === 'T'
                                                                            ? 'yellow.600'
                                                                            : 'green.600'
                                                                } orientation='vertical' />
                                                                <TableContainer w="full">
                                                                    <Table size='sm' w="full" variant='striped' textAlign={'justify'}>
                                                                        <Thead>
                                                                            <Tr>
                                                                                <Th>Persona Registro</Th>
                                                                                <Th>Técnico Asignado</Th>
                                                                                <Th>IP</Th>
                                                                                <Th>Estado</Th>
                                                                            </Tr>
                                                                        </Thead>
                                                                        <Tbody>
                                                                            <Tr>
                                                                                <Td fontSize={'11px'}>{item?.persona_registro?.nombre + " " + item?.persona_registro?.apellido}</Td>
                                                                                <Td fontSize={'11px'}>{item?.persona_asignado ? item.persona_asignado.nombre + ' ' + item.persona_asignado.apellido : 'NO ASIGNADO'}</Td>
                                                                                <Td fontSize={'11px'}>{item?.ip}</Td>
                                                                                <Td>
                                                                                    <Badge
                                                                                        size={'sm'}
                                                                                        variant={'solid'}
                                                                                        fontSize={'10px'}
                                                                                        colorScheme={
                                                                                            item?.estadoIncidencia === 'P'
                                                                                                ? 'red'
                                                                                                : item?.estadoIncidencia === 'T'
                                                                                                    ? 'yellow'
                                                                                                    : 'green'
                                                                                        }
                                                                                    >
                                                                                        {item?.estadoIncidencia === 'P'
                                                                                            ? 'PENDIENTE'
                                                                                            : item?.estadoIncidencia === 'T'
                                                                                                ? 'EN TRÁMITE'
                                                                                                : 'ATENDIDO'}
                                                                                    </Badge>
                                                                                </Td>
                                                                            </Tr>
                                                                        </Tbody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </Stack>
                                                        </Flex>
                                                        <Divider />
                                                    </>
                                                )).slice(-2).reverse()}
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </Flex>
                            </Box>
                        </Flex>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleCloseModal} _focus={{ boxShadow: "none" }}>
                            CERRAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
