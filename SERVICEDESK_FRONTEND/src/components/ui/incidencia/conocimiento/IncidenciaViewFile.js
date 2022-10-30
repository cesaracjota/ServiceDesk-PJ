import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    IconButton,
    Image,
    Text,
    Stack,
    Box,
    Button,
    Tooltip,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { FaFileAlt, FaFileImage, FaFilePdf } from 'react-icons/fa';

import { fetchDescargarArchivo, fetchViewArchivo } from '../../../../actions/incidencia';
import { CloseIcon, DownloadIcon } from '@chakra-ui/icons';
import { MdOpenInNew } from 'react-icons/md';

const IncidenciaViewFile = ({ rowData, typeFile, setProgressTrue, setProgressFalse }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const [fileData, setFileData] = useState([]);

    const handleClickOpenModalFile = () => {
        setOpen(true);
        setProgressFalse();
    }

    const handleCloseModalFile = () => {
        setOpen(false);
        setProgressFalse();
    }

    const FetchViewFile = () => {
        setProgressTrue();
        var datos = {
            carpeta: rowData.carpeta,
            archivo: rowData.file,
            modulo: "1"
        }
        dispatch(fetchDescargarArchivo(datos)).then(() => {
            fetchViewArchivo(datos.archivo).then((res) => {
                setFileData(res[0]);
                handleClickOpenModalFile();
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.error(err);
        }
        );
    }

    const FetchDownloadFile = () => {
        const buffer = fileData?.blob;
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileData?.filename);
        link.click();
    }

    const handleOpenFilePdf = () => {
        const buffer = fileData?.blob;
        const blobURL = new Blob([buffer], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blobURL);
        window.open(url);
    }

    return (
        <>
            <Button
                colorScheme="red"
                variant="outline"
                size="sm"
                fontSize={'13px'}
                onClick={FetchViewFile}
                leftIcon={ 
                    typeFile?.includes(".pdf") 
                    ? <FaFilePdf fontSize="20px" /> 
                    : typeFile?.includes(".png") || typeFile?.includes(".jpg") || typeFile?.includes(".jpeg") 
                    ? <FaFileImage fontSize="20px" /> 
                    : <FaFileAlt fontSize="20px" />
                }
                _focus={{ boxShadow: 'none' }}>
                VER ARCHIVO DE LA INCIDENCIA
            </Button>
            <Modal isOpen={open} onClose={handleCloseModalFile} size="6xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'} fontWeight="bold">VISUALIZANDO EL ARCHIVO</ModalHeader>
                    <ModalCloseButton  />
                    <ModalBody maxH="80vh">
                        {
                            fileData?.filename?.includes(".pdf") ? (
                                <iframe title={fileData?.filename} src={fileData?.link} width="100%" height="500vh" />
                            ) : fileData?.filename?.includes(".docx") ? (
                                <>
                                    <Stack direction="column" textAlign="center" alignItems="center">
                                        <Text>EL ARCHIVO NO SE PUEDE VISUALIZAR</Text>
                                        <Image src={"https://logodownload.org/wp-content/uploads/2018/10/word-logo-4-1.png"} textAlign="center" w="150px" />
                                    </Stack>
                                </>
                            ) : fileData?.filename?.includes(".png") || fileData?.filename?.includes(".jpg") || fileData?.filename?.includes(".jpeg") ? (
                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w="full" borderRadius={'lg'} borderWidth="1px">
                                    <Image src={fileData?.link} alt={fileData?.filename} maxBlockSize="60vh" maxW="60vh"/>
                                </Box>
                            ) : (
                                <>
                                    <Stack direction="column" textAlign="center" alignItems="center">
                                        <Text>EL ARCHIVO NO SE PUEDE VISUALIZAR</Text>
                                        <Image src={"https://pngimg.com/uploads/folder/folder_PNG100476.png"} textAlign="center" w={'150px'} />
                                    </Stack>
                                </>
                            )
                        }
                    </ModalBody>
                    <ModalFooter display={'flex'} justifyContent="center" alignItems="center">

                        {fileData?.filename?.includes(".pdf") ? (
                            <>
                                <Tooltip placement="top" label="Descargar Archivo">
                                    <IconButton
                                        icon={<DownloadIcon fontSize={'xl'} />}
                                        variant={'outline'}
                                        colorScheme={'green'}
                                        onClick={FetchDownloadFile}
                                        rounded={'full'}
                                        size={'lg'}
                                        mr={3}
                                        
                                    />
                                </Tooltip>
                                <Tooltip placement="top" label="Abrir Archivo en una Pestaña">
                                    <IconButton
                                        icon={<MdOpenInNew fontSize={'xl'} />}
                                        variant={'outline'}
                                        colorScheme={'blue'}
                                        onClick={handleOpenFilePdf}
                                        rounded={'full'}
                                        size={'lg'}
                                        mr={3}
                                    />
                                </Tooltip>
                                <IconButton
                                    icon={<CloseIcon fontSize={'xl'} />}
                                    variant={'outline'}
                                    colorScheme={'red'}
                                    onClick={handleCloseModalFile}
                                    rounded={'full'}
                                    size={'lg'}
                                />
                            </>
                        ) : (
                            <>
                                <Tooltip placement="top" label="Descargar Archivo">
                                    <IconButton
                                        icon={<DownloadIcon fontSize={'xl'} />}
                                        variant={'outline'}
                                        colorScheme={'green'}
                                        onClick={FetchDownloadFile}
                                        rounded={'full'}
                                        size={'lg'}
                                        mr={3}
                                    />
                                </Tooltip>
                                <IconButton
                                    icon={<CloseIcon fontSize={'xl'} />}
                                    variant={'outline'}
                                    colorScheme={'red'}
                                    onClick={handleCloseModalFile}
                                    rounded={'full'}
                                    size={'lg'}
                                />
                            </>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default IncidenciaViewFile;