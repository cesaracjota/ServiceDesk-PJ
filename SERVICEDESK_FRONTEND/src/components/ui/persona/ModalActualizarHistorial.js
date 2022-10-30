import React, { useState, useRef } from 'react';
import {
    FormControl,
    FormLabel,
    Button,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
    Box,
    Text,
    Select as ChakraSelect,
    Center,
    Avatar,
    useColorModeValue,
    SimpleGrid,
    Heading,
    Stack,
    Tooltip,
} from '@chakra-ui/react';

import { RiRoadMapFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Select from 'react-select';
import { createHistorialPersona, fetchHistorialPersona } from '../../../actions/historialpersona';
import { useEffect } from 'react';

const ModalActualizarHistorial = ({ rowData }) => {

    const [openModal, setOpenModal] = useState(false);
    const [historialpersona, setHistorialPersona] = useState([]);
    const [selectCodicional, setSelectCodicional] = useState(false);

    const dispatch = useDispatch();

    const selectInputRefSede = useRef();
    const selectInputRef = useRef();
    const selectOficinaRef = useRef();

    const dataSede = store.getState().sede.rows;
    const dataOrgano = store.getState().organo.rows;
    const dataOficina = store.getState().oficina.rows;
    const dataCargo = store.getState().cargo.rows;

    const fetchDataHistorialPersona = async () => {
        const response = await fetchHistorialPersona(rowData.idpersona);
        setHistorialPersona(response);
    }

    useEffect(() => {
        fetchDataHistorialPersona();
    },[]);

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    const [indiceHistorial, setIndiceHistorial] = useState({
        idHistorial: null,
        persona: {
            idpersona: rowData?.idpersona,
        },
        cargo: {
            idCargo: null,
        },
        oficina: {
            idOficina: null,
        },
        iniciaCargo: hoy.toISOString().split('T')[0],
        terminaCargo: null,
        activo: 'S',
        fecha: hoy.toISOString().split('T')[0],
    });

    const [organoSelect, setOrganoSelect] = useState([
        { value: 0, label: 'SELECCIONE UNA SEDE' },
    ]);

    const [oficinaSelect, setOficinaSelect] = useState([
        { value: 0, label: 'SELECCIONE UN ORGANO' },
    ]);

    const optionsSede = dataSede.map(sede => ({
        value: sede.idSede,
        label: sede.sede,
    }));

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectCodicional(false);
        setIndiceHistorial({
            ...indiceHistorial,
            cargo: { idCargo: null },
            oficina: { idOficina: null },
        });

        if (indiceHistorial.oficina.idOficina !== null && organoSelect[0].value !== 0 && selectInputRef.current.value !== null) {
            selectInputRef.current.clearValue();
            selectOficinaRef.current.clearValue();
            selectInputRefSede.current.clearValue();
        }
    }

    const handleOpenSelect = (e) => {
        if (e.target.value === 'true') {
            setSelectCodicional(true);
        } else {
            setSelectCodicional(false);
        }
    }

    const handleChangeSede = (value) => {
        if (value === null) {
            selectInputRef.current.clearValue();
            selectOficinaRef.current.clearValue();
            setOrganoSelect([{ value: 0, label: 'SELECCIONE UNA SEDE' }]);
        } else {
            var organo = dataOrgano.filter(
                indice => indice.sede.idSede === value.value
            );
            setOrganoSelect(
                organo.map(organo => ({
                    value: organo.idOrgano,
                    label: organo.organo,
                }))
            );
        }
    };

    const handleChangeOrgano = (value) => {
        if (value === null) {
            selectOficinaRef.current.clearValue();
            setOficinaSelect([{ value: 0, label: 'SELECCIONE UN ORGANO' }]);
        } else {
            setOficinaSelect(
                dataOficina
                    .filter(indice => indice.organo.idOrgano === value.value)
                    .map(value => ({ value: value.idOficina, label: value.oficina }))
            );
            selectOficinaRef.current.clearValue();
        }
    };

    const handleChangeOficina = (value) => {
        if (value !== null) {
            setIndiceHistorial({
                ...indiceHistorial,
                oficina: { idOficina: value.value, oficina: value.label },
            });
        }
    };

    const handleChangeCargo = (value) => {
        setIndiceHistorial({
            ...indiceHistorial,
            cargo: { idCargo: value.value, cargo: value.label },
        });
    };

    const saveHistorialPersona = () => {
        var historialUsuario = {
            persona: {
                idpersona: rowData?.idpersona,
            },
            cargo: indiceHistorial.cargo.idCargo === null ? historialpersona?.data?.cargo?.cargo : indiceHistorial.cargo,
            oficina: indiceHistorial.oficina.idOficina === null ? historialpersona?.data?.oficina?.oficina : indiceHistorial.oficina,
            iniciaCargo: indiceHistorial.iniciaCargo,
            terminaCargo: indiceHistorial.terminaCargo,
            activo: indiceHistorial.activo,
        };
        dispatch(createHistorialPersona(historialUsuario)).then(() => {
            fetchDataHistorialPersona();
            setSelectCodicional(false);
        }).catch((e) => {
            console.error(e)
        });
    };

    return (
        <>
            <Tooltip hasArrow label="Ver el Historial del Usuario" placement="left" aria-label="A tooltip">
                <IconButton
                    icon={<RiRoadMapFill fontSize="22px" />}
                    size="sm"
                    ml={2}
                    colorScheme="orange"
                    
                    onClick={handleOpenModal}
                />
            </Tooltip>
            <Modal size={'6xl'} isOpen={openModal} onClose={handleCloseModal} id="modalOrganoAsignacion">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">VER Y ACTUALIZAR DATOS ADICIONALES DEL USUARIO</ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody>

                        <VStack spacing={4} w={'100%'} color="white" bgGradient='linear(to-r, gray.700, gray.700)' pb={8} mt={4} py={8} boxShadow="base" borderRadius={'xl'}>
                            <Center>
                                <Avatar
                                    size={'lg'}
                                    borderWidth="1.5px"
                                    borderColor="whiteAlpha.800"
                                    color={'white'}
                                    fontWeight={'extrabold'}
                                    bg={'gray.700'}
                                    position="absolute"
                                    mb={16}
                                    name={rowData?.nombre + ' ' + rowData?.apellido}
                                />
                            </Center>
                            <Box mt={6} mb={5}>
                                <Heading
                                    textTransform={'uppercase'}
                                    fontSize={'xl'}
                                    color={useColorModeValue('gray.100', 'gray.800')}
                                >
                                    {rowData?.nombre + ' ' + rowData?.apellido}
                                </Heading>
                            </Box>

                            {historialpersona?.data !== undefined ? (
                                <Box flex="1" mt={4} mb={4} w={'full'}>
                                    <SimpleGrid columns={[1, 1, 2, 4]} spacing={1} textAlign="center" w="full">
                                        <Box>
                                            <Text color={'gray.100'} fontWeight="bold" fontSize={'sm'}>SEDE</Text>
                                            <Text color={'gray.200'} fontSize={'12px'}>{historialpersona?.data?.oficina?.organo?.sede?.sede}</Text>
                                        </Box>
                                        <Box>
                                            <Text color={'gray.100'} fontWeight="bold" fontSize={'sm'}>ORGANO</Text>
                                            <Text color={'gray.200'} fontSize={'12px'}>{historialpersona?.data?.oficina?.organo?.organo}</Text>
                                        </Box>
                                        <Box>
                                            <Text color={'gray.100'} fontWeight="bold" fontSize={'sm'}>OFICINA</Text>
                                            <Text color={'gray.200'} fontSize={'12px'}>{historialpersona?.data?.oficina?.oficina}</Text>
                                        </Box>
                                        <Box>
                                            <Text color={'gray.100'} fontWeight="bold" fontSize={'sm'}>CARGO</Text>
                                            <Text color={'gray.200'} fontSize={'12px'} >{historialpersona?.data?.cargo?.cargo}</Text>
                                        </Box>
                                    </SimpleGrid>
                                </Box>
                            ) : (
                                <Box flex="1" mt={4} mb={4} w={'full'}>
                                    <Text color={'gray.100'} fontSize={'sm'} textAlign="center">ESTE USUARIO NO TIENE HISTORIAL!!!</Text>
                                </Box>
                            )}

                        </VStack>
                        <Box flex="1" w="full" textAlign="center" py={2}>
                            <Text fontWeight={'bold'} mb="2">¿DESEA AGREGAR O ACTUALIZAR ESTOS DATOS?</Text>
                            <Stack alignItems="center" justify="center">
                                <ChakraSelect
                                    color={'gray.700'}
                                    bg={'gray.50'}
                                    w="sm"
                                    value={selectCodicional}
                                    onChange={(e) => handleOpenSelect(e)}
                                >
                                    <option value={true}>SI</option>
                                    <option value={false}>NO</option>
                                </ChakraSelect>
                                {selectCodicional === true ? (
                                    <Stack direction="column" spacing={4} w="full">
                                        <HStack spacing={'10px'}>
                                            <FormControl>
                                                <FormLabel fontWeight={'bold'}>SEDE</FormLabel>
                                                <Select
                                                    onChange={handleChangeSede}
                                                    placeholder="SELECCIONE UNA SEDE"
                                                    isSearchable
                                                    isClearable
                                                    options={optionsSede}
                                                    ref={selectInputRefSede}
                                                >

                                                </Select>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontWeight={'bold'}>ORGANO JURIDICCIONAL</FormLabel>
                                                <Select
                                                    onChange={handleChangeOrgano}
                                                    placeholder="SELECCIONE UN ORGANO"
                                                    isClearable
                                                    options={organoSelect}
                                                    ref={selectInputRef}
                                                >
                                                </Select>
                                            </FormControl>
                                        </HStack>
                                        <HStack spacing={'10px'} mt={'10px'}>
                                            <FormControl>
                                                <FormLabel fontWeight={'bold'}>OFICINA</FormLabel>
                                                <Select
                                                    onChange={handleChangeOficina}
                                                    placeholder="SELECCIONE UNA OFICINA"
                                                    isClearable={true}
                                                    options={oficinaSelect}
                                                    isRequired
                                                    ref={selectOficinaRef}
                                                >

                                                </Select>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontWeight={'bold'}>CARGO</FormLabel>
                                                <Select
                                                    onChange={handleChangeCargo}
                                                    placeholder="SELECCIONE UN CARGO"
                                                    isClearable={true}
                                                    options={
                                                        dataCargo.map(cargo => ({
                                                            value: cargo.idCargo,
                                                            label: cargo.cargo,
                                                        }))
                                                    }
                                                    isRequired
                                                >
                                                </Select>
                                            </FormControl>
                                        </HStack>
                                    </Stack>
                                ) : null}

                            </Stack>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            
                            hidden={selectCodicional === false}
                            disabled={indiceHistorial.oficina.idOficina === null && indiceHistorial.cargo.idCargo === null}
                            onClick={saveHistorialPersona}
                        >
                            {historialpersona?.data !== undefined ? 'ACTUALIZAR': 'GUARDAR'}
                        </Button>
                        <Button
                            colorScheme="red"
                            
                            variant="outline"
                            onClick={handleCloseModal}
                        >
                            CANCELAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalActualizarHistorial