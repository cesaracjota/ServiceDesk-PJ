import React, { useState } from 'react';
import {
    Button,
    IconButton,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogFooter,
    AlertDialog,
    AlertDialogCloseButton,
    Tooltip,
} from '@chakra-ui/react';

import { VscAdd } from 'react-icons/vsc'

import Moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidenciaSoporte, asignarIncidencia, fetchIncidenciasNoAsignadas } from '../../../../actions/incidencia';
import { getIncidenciasAsignadasSoporte } from './incidencia';
import { getIncidenciaNoAsignadas } from '../asistente/incidencia';

const IncidenciaAsignarme = ({rowData}) => {

    const [openAlert, setOpenAlert] = useState(false);
    const { identificador } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [idIncidencia, setIndiceIncidencia] = useState(null);
    const [incidenciaPersonaNotifica, setIncidenciaPersonaNotifica] = useState(null);

    const handleClickCloseAlert = () => {
        setOpenAlert(false);
    }

    const handleClickOpenAlert = (index) => {
        setIndiceIncidencia(index.idIncidencia);
        setIncidenciaPersonaNotifica(index.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A")[0].persona_notifica.idpersona);
        setOpenAlert(true);
    }

    let fechaDesde = Moment().startOf('month').format('yyyy-MM-DD');
    let fechaHasta = Moment(new Date()).format('yyyy-MM-DD');
  
    const dataForm = {
      startDate: fechaDesde,
      endDate: fechaHasta,
    }

    const fetchDataIncidencias = async () => {
        await fetchIncidenciaSoporte(identificador, dataForm).then((res) => {
            dispatch(getIncidenciasAsignadasSoporte(res));
        });
    }

    const fetchDataIncidenciasNoAsignadas = async () => {
        const response = await fetchIncidenciasNoAsignadas(dataForm);
        dispatch(getIncidenciaNoAsignadas(response));
    }

    const AsignarmeIncidencia = () => {
        var incidencia = {
          idIncidencia: idIncidencia,
          historialIncidencia: [{
            persona_registro: {
              idpersona: Number(identificador)
            },
            persona_asignado: {
              idpersona: Number(identificador),
            },
            persona_notifica: {
                idpersona: incidenciaPersonaNotifica ? incidenciaPersonaNotifica : identificador,
            }
          }]
        }
        dispatch(asignarIncidencia(incidencia))
          .then(() => {
            setOpenAlert(false);
            fetchDataIncidencias();
            fetchDataIncidenciasNoAsignadas();
          }).catch((error) => {
            console.log(error);
          })
      }

    return (
        <>
            <Tooltip placement="auto" hasArrow label="Asignarme la Incidencia">
                <IconButton
                    icon={<VscAdd />}
                    variant={'solid'}
                    colorScheme={'facebook'}
                    onClick={() => handleClickOpenAlert(rowData)}
                    fontSize='20px'
                    size={'sm'}
                    ml={1}
                    
                />
            </Tooltip>

            {/* CONFIRMAR PARA ASIGNARSE A EL MISMO LA INCIDENCIA */}

            <AlertDialog isOpen={openAlert} onClose={handleClickCloseAlert} size={'3xl'}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="xl" fontWeight="bold">
                            ¿ASIGNARME LA INCIDENCIA A MI PERSONA?
                        </AlertDialogHeader>
                        <AlertDialogCloseButton  />
                        <AlertDialogBody>
                                ¿CONFIRMAR LA ACCIÓN?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={handleClickCloseAlert}  colorScheme="red" variant="outline">CANCELAR</Button>
                            <Button
                                colorScheme="facebook"
                                ml={3}
                                onClick={() => AsignarmeIncidencia()}
                            >
                                CONFIRMAR
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default IncidenciaAsignarme;
