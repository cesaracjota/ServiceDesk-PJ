import React, { useState } from 'react'
import {
    Box,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { store } from '../../../../store/store';
import { AiFillNotification } from 'react-icons/ai';
import Moment from 'moment';

const ModalMensajes = () => {

    const data = store.getState().mensaje.rows;

    const dateNow = Moment(new Date()).format('YYYY-MM-DD');

    var filterData = data.filter(item => item.activo === 'S' && new Date(item.fechaHasta) >= new Date(dateNow));

    filterData.sort((a, b) => new Date(a.fechaHasta) - new Date(b.fechaHasta));

    const [isOpen, setIsOpen] = useState(filterData.length > 0 ? true : false);

    const closeModalMensaje = () => {
        setIsOpen(false);
    }

    const arrowStyles = {
        cursor: "pointer",
        pos: "absolute",
        top: "50%",
        w: "auto",
        mt: "-22px",
        px: "14px",
        py: "20px",
        color: "white",
        bg: useColorModeValue("purple.500", "purple.700"),
        fontWeight: "bold",
        fontSize: "18px",
        transition: "0.6s ease",
        borderRadius: "0 3px 3px 0",
        userSelect: "none",
        _hover: {
            opacity: 0.8,
            bg: useColorModeValue("purple.400", "purple.500"),
        },
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    const slidesCount = filterData?.length;

    const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const carouselStyle = {
        transition: "all .8s",
        ml: `-${currentSlide * 100}%`,
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                size="4xl"
                scrollBehavior="inside"
                isCentered
            >
                <ModalOverlay
                    bg="rgba(0,0,0,0.7)"
                    backdropFilter='auto'
                    backdropBlur='4px'
                />
                <ModalContent py={4} borderRadius="sm">
                    <ModalHeader textAlign={'center'} fontWeight="black" color="purple.500">MENSAJES PARA SOPORTES TÉCNICOS</ModalHeader>
                    <ModalBody>
                        <Flex
                            w="full"
                            px={2}
                            py={4}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Flex w="full" overflow="hidden" pos="relative">
                                <Flex h="auto" w="full" {...carouselStyle}>
                                    {filterData.map((item, sid) => (
                                        <Box key={`slide-${sid}`} flex="none" boxSize="full" px={12}>
                                            <Stack direction="column" spacing={2} w="full">
                                                <Box 
                                                    w="full" 
                                                    bg="gray.50" 
                                                    _dark={{ bg: "gray.800", color: "gray.50" }} 
                                                    color="purple.600"
                                                    px={2} 
                                                    py={2} 
                                                    borderRadius="sm"
                                                    borderWidth="1px" 
                                                    textAlign="center"
                                                    alignContent="center"
                                                    justifyContent="center"
                                                >
                                                    <Text fontSize={'lg'} fontWeight="extrabold" textAlign={'center'}>
                                                        {item?.asunto}
                                                    </Text>
                                                    <Box justifyContent="center" display="flex">
                                                        <AiFillNotification fontSize="70px"/>
                                                    </Box>
                                                </Box>

                                                <Box w="full" bg="gray.50" _dark={{ bg: "gray.800" }} px={4} py={4} borderRadius="sm" borderWidth="1px">
                                                    <Text textAlign={'justify'} fontWeight="bold">
                                                        {item?.mensaje}
                                                    </Text>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    ))}
                                </Flex>
                                <Text {...arrowStyles} left="0" onClick={prevSlide}>
                                    &#10094;
                                </Text>
                                <Text {...arrowStyles} right="0" onClick={nextSlide}>
                                    &#10095;
                                </Text>
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter justifyContent="center" px={20}>
                        <Button w="full" bg="purple.600" _hover={{bg: "purple.700"}} borderRadius="sm" size="md" color="white" onClick={closeModalMensaje} _focus={{ boxShadow: "none" }}>
                            OK
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalMensajes;