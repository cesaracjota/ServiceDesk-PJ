import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    useColorModeValue,
    Text,
    HStack,
    Badge,
    SimpleGrid,
    chakra,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Popover,
    PopoverTrigger,
    Stack,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Portal,
    Progress,
    Tooltip,
    Input,
} from '@chakra-ui/react';

import { store } from '../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component-with-filter';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import IncidenciaDetalles from './../IncidenciaDetalles';
import { RepeatIcon, SearchIcon } from '@chakra-ui/icons';
import { fetchIncidencias } from '../../../../actions/incidencia';
import { getIncidencias } from './incidencia';

import parse from 'html-react-parser';
import { FaFilter } from 'react-icons/fa';
import { AiFillFileText, AiFillFilter, AiOutlineFileSearch } from 'react-icons/ai';
import IncidenciaViewFile from './IncidenciaViewFile';
import AtencionViewFile from './AtencionViewFile';
import { IncidenciaHistorial } from './IncidenciaHistorial';
import Moment from 'moment';
import Select from 'react-select';
import { customStyles } from '../../../../helpers/customStyle';
// import { SpinnerComponent } from '../../../../helpers/spinner';

export default function TableConocimiento() {
    const { identificador } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const data = store.getState().incidencia.rows;
    const dataSede = store.getState().sede.rows;

    const [tableRowsData, setTableRowsData] = useState(data);
    const [tableRowsDataSede, setTableRowsDataSede] = useState([]);
    const [progress, setProgress] = useState(false);
    const [fechaDesdeValue, setFechaDesdeValue] = useState(null);
    const [fechaHastaValue, setFechaHastaValue] = useState(null);

    let bg = useColorModeValue('white', 'gray.900');
    let theme = useColorModeValue('default', 'solarized');
    let fechaDesde = Moment().startOf('month').format('yyyy-MM-DD');
    let fechaHasta = Moment(new Date()).format('yyyy-MM-DD');

    //Contadores de incidencia
    const ContadorPendientes = tableRowsData.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A").length > 0);
    const ContadorTramite = tableRowsData.filter(row => row.historialIncidencia.filter(tramite => tramite.estadoIncidencia === "T" && tramite.estado === "A").length > 0);
    const ContadorAtendidas = tableRowsData.filter(row => row.historialIncidencia.filter(atendida => atendida.estadoIncidencia === "A" && atendida.estado === "A").length > 0);

    // ✅ Get Min date
    const minDate = new Date(
        Math.min(
            ...tableRowsData.map(element => {
                return new Date(element.fecha);
            }
            ),
        ),
    );

    let fechaMinima = Moment(minDate).format('yyyy-MM-DD');

    const dataForm = {
        startDate: fechaDesdeValue === null ? fechaDesde : fechaDesdeValue,
        endDate: fechaHastaValue === null ? fechaHasta : fechaHastaValue,
    }

    const fetchDataIncidencias = async () => {
        const response = await fetchIncidencias(dataForm);
        dispatch(getIncidencias(response));
    }

    useEffect(() => {
        if (store.getState().incidencia.checking) {
            fetchDataIncidencias();
        }
    })

    const refreshTable = () => {
        fetchDataIncidencias();
    }

    // filtros por estado

    const handleClickFilterPendientes = async () => {
        const dataFilter = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A").length > 0);
        setTableRowsData(dataFilter);
    }

    const handleClickFilterTramite = async () => {
        const dataFilter = data.filter(row => row.historialIncidencia.filter(tramite => tramite.estadoIncidencia === "T" && tramite.estado === "A").length > 0);
        setTableRowsData(dataFilter);
    }

    const handleClickFilterAtendidas = async () => {
        const dataFilter = data.filter(row => row.historialIncidencia.filter(atendida => atendida.estadoIncidencia === "A" && atendida.estado === "A").length > 0);
        setTableRowsData(dataFilter);
    }

    const changeSetProgressTrue = () => {
        setProgress(true);
    }

    const changeSetProgressFalse = () => {
        setProgress(false);
    }

    const handleSelectSede = (value) => {
        if (value !== null) {
            setTableRowsDataSede(value.map(item => item.value));
        } else {
            return 'SELECCIONE UNA SEDE';
        }
    }

    /**
     * Function to filter data by sede
     */

    const handleClickFilterBySede = () => {
        const dataFilter = tableRowsData.filter(row => tableRowsDataSede.includes(row?.oficina?.organo?.sede?.idSede));
        setTableRowsData(dataFilter);
    }

    const columns = [
        {
            name: 'INCIDENCIA',
            selector: row => parse(row.descripcion),
            cellExport: row => row.descripcion,
            sortable: true,
            wrap: true,
        },
        {
            name: 'ATENCION INCIDENCIA',
            selector: row => (row?.descripcionIncidencia?.descripcionAtencion && row?.descripcionIncidencia?.descripcionTramite !== undefined) ? parse(row?.descripcionIncidencia?.descripcionAtencion) : 'SIN ATENCIÓN',
            cellExport: row => (row?.descripcionIncidencia?.descripcionAtencion && row?.descripcionIncidencia?.descripcionTramite !== undefined) ? row?.descripcionIncidencia?.descripcionAtencion : 'INCIDENCIA SIN ATENCIÓN',
            sortable: true,
            wrap: true,
        },
        {
            name: 'FECHA Y HORA',
            selector: row => Moment(row.fecha).format("yyyy-MM-DD - HH:mm:ss"),
            cellExport: row => Moment(row.fecha).format("yyyy-MM-DD - HH:mm:ss"),
            sortable: true,
        },
        {
            name: 'IP',
            selector: row => {
                var historial = row.historialIncidencia.filter(p => p.estado === 'A');
                return (
                    historial[0]?.ip
                )
            },
            sortable: true,
            cellExport: row => {
                var historial = row.historialIncidencia.filter(p => p.estado === 'A');
                return (
                    historial[0]?.ip
                )
            }
        },
        {
            name: 'ESTADO',
            selector: row => row.historialIncidencia.map(row => row.estado === 'A' ? row.estado : ''),
            sortable: true,
            cell: row => {
                var historial = row.historialIncidencia.filter(p => p.estado === 'A');
                return (
                    <div>
                        <Badge
                            bg={historial[0]?.estadoIncidencia === 'P' ? 'red.500' : historial[0]?.estadoIncidencia === 'T' ? 'yellow.500' : 'green.500'}
                            color={'white'}
                            py="4px"
                            w={"100px"}
                            textAlign={'center'}
                            borderRadius={'md'}
                            fontSize={'12px'}
                        >
                            {historial[0]?.estadoIncidencia === 'P' ? 'PENDIENTE' : historial[0]?.estadoIncidencia === 'T' ? 'EN TRÁMITE' : 'ATENDIDO'}
                        </Badge>
                    </div>
                )
            },
            cellExport: row => {
                var historial = row.historialIncidencia.filter(p => p.estado === 'A');
                return (
                    historial[0]?.estadoIncidencia === 'P' ? 'PENDIENTE' : historial[0]?.estadoIncidencia === 'T' ? 'EN TRÁMITE' : 'ATENDIDO'
                )
            },
            center: true,
        },
        {
            name: 'ACCIONES',
            sortable: false,
            cell: row => {
                var archivoTecnico = row.descripcionIncidencia?.incidenciaArchivos?.usuario === "T" ? row.descripcionIncidencia.incidenciaArchivos : null;
                var archivoUsuario = row.incidenciaArchivos?.usuario === "R" ? row.incidenciaArchivos : null;
                return (
                    <div>
                        <IncidenciaDetalles
                            rowId={row.idIncidencia}
                            identificador={identificador}
                        />
                        {(row.descripcionIncidencia !== null && row.descripcionIncidencia?.incidenciaArchivos !== null) || row.incidenciaArchivos !== null ? (
                            <Popover placement='left'>
                                <PopoverTrigger>
                                    <Box as="a" cursor={'pointer'}>
                                        <Tooltip placement="auto" hasArrow label="Visualizar Archivos de la Incidencia" aria-label="A tooltip">
                                            <IconButton
                                                size="sm"
                                                colorScheme="purple"
                                                icon={<AiFillFileText />}
                                                ml={2}
                                                fontSize={'20px'}
                                                _focus={{ boxShadow: 'none' }}
                                            />
                                        </Tooltip>
                                    </Box>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent _focus={{ boxShadow: 'none' }}>
                                        <PopoverArrow />
                                        <PopoverCloseButton _focus={{ boxShadow: 'none' }} />
                                        <PopoverHeader>VISUALIZAR ARCHIVO</PopoverHeader>
                                        <PopoverBody>
                                            <Stack direction={'column'} spacing={4} alignItems="start">
                                                {archivoUsuario !== null ? (
                                                    <IncidenciaViewFile
                                                        rowData={row?.incidenciaArchivos}
                                                        typeFile={archivoUsuario?.file}
                                                        setProgressTrue={() => changeSetProgressTrue()}
                                                        setProgressFalse={() => changeSetProgressFalse()}
                                                    />
                                                ) : null}

                                                {archivoTecnico !== null ? (
                                                    <AtencionViewFile
                                                        rowData={row.descripcionIncidencia?.incidenciaArchivos}
                                                        typeFile={archivoTecnico?.file}
                                                        setProgressTrue={() => changeSetProgressTrue()}
                                                        setProgressFalse={() => changeSetProgressFalse()}
                                                    />
                                                ) : null}
                                            </Stack>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        ) : null}

                        <IncidenciaHistorial
                            rowData={row}
                        />
                    </div>
                );
            },
            export: false,
        },
    ];

    // CREANDO UN TEMA PARA LA TABLA

    createTheme('solarized', {
        text: {
            primary: '#FFF',
            secondary: '#FFF',
        },
        background: {
            default: '#171923',
        },
        context: {
            background: '#171923',
            text: '#FFF',
        },
        divider: {
            default: '#FFF opacity 92%',
        },
    });

    return (
        <>
            <Box borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow={'md'}
                mb={4}
                p={2}
                fontSize={['6px', '9px', '10px', '12px']}
                bg={bg} >
                <SimpleGrid columns={4} spacing={5} textColor={'white'}>
                    <Box
                        w={'100%'}
                        bg="white"
                        _dark={{ bg: "gray.800", borderWidth: "1px" }}
                        shadow="lg"
                        rounded="lg"
                        overflow="hidden"
                        textAlign={'center'}
                    >
                        <chakra.h3
                            py={2}
                            textAlign="center"
                            fontWeight="bold"
                            textTransform="uppercase"
                            color="red.500"
                            _dark={{ color: "white" }}
                        >
                            INCIDENCIAS PENDIENTES
                        </chakra.h3>
                        <Flex
                            alignItems="center"
                            justify={'center'}
                            py={2}
                            w={'100%'}
                            bg="red.500"
                            _dark={{ bg: "gray.700" }}
                        >
                            <chakra.span
                                fontWeight="bold"
                                color="white"
                                _dark={{ color: "gray.200" }}
                            >
                                {ContadorPendientes.length}
                            </chakra.span>
                        </Flex>
                    </Box>
                    <Box
                        w={'100%'}
                        bg="white"
                        _dark={{ bg: "gray.800", borderWidth: "1px" }}
                        shadow="lg"
                        rounded="lg"
                        overflow="hidden"
                        textAlign={'center'}
                    >
                        <chakra.h3
                            py={2}
                            textAlign="center"
                            fontWeight="bold"
                            textTransform="uppercase"
                            color="yellow.500"
                            _dark={{ color: "white" }}
                        >
                            INCIDENCIA EN TRAMITE
                        </chakra.h3>
                        <Flex
                            alignItems="center"
                            justify={'center'}
                            py={2}
                            px={3}
                            bg="yellow.500"
                            _dark={{ bg: "gray.700" }}
                        >
                            <chakra.span
                                fontWeight="bold"
                                color="gray.200"
                                _dark={{ color: "gray.200" }}
                            >
                                {ContadorTramite.length}
                            </chakra.span>
                        </Flex>
                    </Box>
                    <Box
                        w={'100%'}
                        bg="white"
                        _dark={{ bg: "gray.800", borderWidth: "1px" }}
                        shadow="lg"
                        rounded="lg"
                        overflow="hidden"
                        textAlign={'center'}
                    >
                        <chakra.h3
                            py={2}
                            textAlign="center"
                            fontWeight="bold"
                            textTransform="uppercase"
                            color="green.500"
                            _dark={{ color: "white" }}
                        >
                            INCIDENCIAS ATENDIDAS
                        </chakra.h3>
                        <Flex
                            alignItems="center"
                            justify={'center'}
                            py={2}
                            px={3}
                            bg="green.500"
                            _dark={{ bg: "gray.700" }}
                        >
                            <chakra.span
                                fontWeight="bold"
                                color="white"
                                _dark={{ color: "gray.200" }}
                            >
                                {ContadorAtendidas.length}
                            </chakra.span>
                        </Flex>
                    </Box>
                    <Box
                        w={'100%'}
                        bg="white"
                        _dark={{ bg: "gray.800", borderWidth: "1px" }}
                        shadow="lg"
                        rounded="lg"
                        overflow="hidden"
                        textAlign={'center'}
                    >
                        <chakra.h3
                            py={2}
                            textAlign="center"
                            fontWeight="bold"
                            textTransform="uppercase"
                            color="gray.600"
                            _dark={{ color: "white" }}
                        >
                            TOTAL DE INCIDENCIAS
                        </chakra.h3>
                        <Flex
                            alignItems="center"
                            justify={'center'}
                            py={2}
                            px={3}
                            bg="gray.600"
                            _dark={{ bg: "gray.700" }}
                        >
                            <chakra.span
                                fontWeight="bold"
                                color="white"
                                _dark={{ color: "gray.200" }}
                            >
                                {tableRowsData.length}
                            </chakra.span>
                        </Flex>
                    </Box>
                </SimpleGrid>
            </Box>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow={'md'}
                bg={bg}
                paddingBottom={8}
            >
                <HStack
                    spacing="20px"
                    width={'100%'}
                    justifyContent={'space-between'}
                    verticalAlign={'center'}
                    px={4}
                    py={4}
                >
                    <Box>
                        <Text fontSize="lg" fontWeight="600">
                            TABLA DE CONOCIMIENTO
                        </Text>
                        <Stack direction="row" spacing={2} mt={4} alignItems={'baseline'}>
                            <Text fontSize="sm" fontWeight="600">
                                DESDE
                            </Text>
                            <Input
                                type={'date'}
                                defaultValue={fechaMinima <= fechaDesde ? fechaMinima : fechaDesde}
                                onChange={(e) => setFechaDesdeValue(e.target.value)}
                            />

                            <Text fontSize="sm" fontWeight="600">
                                HASTA
                            </Text>
                            <Input
                                type={'date'}
                                defaultValue={fechaHasta}
                                onChange={(e) => setFechaHastaValue(e.target.value)}
                            />
                            <IconButton
                                aria-label="Find Query"
                                icon={<SearchIcon />}
                                size="md"
                                colorScheme="teal"
                                onClick={fetchDataIncidencias}
                            />
                        </Stack>
                    </Box>
                    <Box>
                        <Stack direction={'row'} spacing={1} justifyContent="space-between">
                            <IconButton
                                size={'sm'}
                                icon={<RepeatIcon boxSize={4} />}
                                colorScheme={'facebook'}
                                onClick={refreshTable}
                            />
                            <Menu size={'xs'}>
                                <MenuButton as={'menu'} style={{ cursor: 'pointer' }}>
                                    <HStack spacing={2}>
                                        <Text fontSize="sm" fontWeight={'semibold'}>
                                            FILTRAR POR ESTADO
                                        </Text>
                                        <IconButton colorScheme={'twitter'} icon={<FaFilter />} size="sm" />
                                    </HStack>
                                </MenuButton>
                                <MenuList zIndex={2} fontSize="sm">
                                    <MenuItem onClick={handleClickFilterPendientes} icon={<AiFillFilter color='red' size={'20px'} />}>PENDIENTES</MenuItem>
                                    <MenuItem onClick={handleClickFilterTramite} icon={<AiFillFilter color='#d69e2e' size={'20px'} />}>EN TRAMITE</MenuItem>
                                    <MenuItem onClick={handleClickFilterAtendidas} icon={<AiFillFilter color='green' size={'20px'} />}>ATENDIDAS</MenuItem>
                                    <MenuItem icon={<AiFillFilter size={'20px'} />} onClick={refreshTable}>TODOS</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                        <Stack direction={'row'} spacing={2} mt={2} fontSize="sm" justifyContent={'space-between'}>
                            <Select
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        width: '427px',
                                        minHeight: '42px',
                                    }),
                                    menuList: (provided) => ({
                                        ...provided,
                                        maxHeight: '200px',
                                        color: 'black',
                                    }),
                                }}
                                options={
                                    dataSede.map((sede) => ({
                                        value: sede.idSede,
                                        label: sede.sede,
                                    }))
                                }
                                onChange={handleSelectSede}
                                placeholder="FILTRAR POR SEDES"
                                isMulti
                                isClearable
                                isSearchable
                            />
                            <IconButton
                                onClick={handleClickFilterBySede}
                                disabled={tableRowsDataSede.length === 0}
                                colorScheme="red"
                                icon={<AiOutlineFileSearch fontSize={24} />}
                            />
                        </Stack>
                    </Box>
                </HStack>
                <Progress mt={2} size="xs" value={progress} colorScheme="purple" hidden={progress === false} isIndeterminate={progress === true} mb={2} />
                <DataTableExtensions
                    data={tableRowsData}
                    columns={columns}
                    print={false}
                    filterPlaceholder="BUSCAR"
                    fileName={'TABLA_CONOCIMIENTO'}
                >
                    <DataTable
                        theme={theme}
                        pagination
                        responsive={true}
                        paginationPerPage={10}
                        noDataComponent={
                            <Text fontSize="sm" py={16} textAlign="center" color="gray.600">
                                NO HAY DATOS PARA MOSTRAR, REFRESCAR LA TABLA
                            </Text>
                        }
                        paginationRowsPerPageOptions={[10, 15, 20, 30]}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Filas por página:',
                            rangeSeparatorText: 'de',
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'Todos',
                        }}
                        customStyles={customStyles}
                        key={tableRowsData.map((item) => { return item.idIncidencia })}
                    />
                </DataTableExtensions>
            </Box>
        </>
    );

}
