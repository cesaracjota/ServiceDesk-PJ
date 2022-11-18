import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
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

import { CalendarIcon } from '@chakra-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { createDescripcionTramite, fetchIncidenciaSoporte } from '../../../../actions/incidencia';
import { getIncidenciasAsignadasSoporte } from './incidencia';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../../../../helpers/quillConfig';

const IncidenciaTramitar = ({row}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const { identificador } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [descripcion, setDescripcion] = useState('');
  const [indiceIncidenciaPersonaNotifica, setIncidenciaPersonaNotifica] = useState(identificador);

  const [indice, setIndice] = useState({
    idIncidencia: null,
    historialIncidencia: {
      persona_registro: {
        idpersona: Number(identificador)
      },
      persona_asignado: {
        idpersona: Number(identificador)
      },
      persona_notifica: {
        idpersona: indiceIncidenciaPersonaNotifica ? Number(indiceIncidenciaPersonaNotifica) : Number(identificador),
      }
    }
  });

  const handleCloseAlert = () => {
    setDescripcion('');
    setOpenAlert(false);
  };

  const handleClickOpenAlert = (index) => {
    console.log(index);
    setIndice({ ...indice, idIncidencia: index.idIncidencia });
    setIncidenciaPersonaNotifica(index.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A")[0].persona_notifica.idpersona);
    setOpenAlert(true);
  };

  const fetchDataIncidencias = async () => {
    await fetchIncidenciaSoporte(identificador).then((res) => {
      dispatch(getIncidenciasAsignadasSoporte(res));
    });
  }

  const ActualizarIncidenciaEnTramite = () => {
    var detallesObservacion = {
      incidencia: indice.idIncidencia,
      descripcion: descripcion,
      archivo: null
    }
    dispatch(createDescripcionTramite(detallesObservacion))
      .then(() => {
        fetchDataIncidencias();
        setOpenAlert(false);
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Tooltip hasArrow placement="auto" label="Cambiar a Trámite el Estado" aria-label="A tooltip">
        <IconButton
          icon={<CalendarIcon />}
          variant={'outline'}
          colorScheme={'yellow'}
          onClick={() => handleClickOpenAlert(row)}
          size={'sm'}
          fontSize={'20px'}
          ml={1}
        />
      </Tooltip>

      <AlertDialog isOpen={openAlert} onClose={handleCloseAlert} size={'5xl'}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="xl" fontWeight="bold">
              ¿DESEA CAMBIAR EL ESTADO, EN TRÁMITE?
            </AlertDialogHeader>
            <AlertDialogCloseButton  />
            <AlertDialogBody>
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">AGREGAR UNA OBSERVACIÓN</FormLabel>
                <ReactQuill
                  theme="snow"
                  placeholder="Ingrese una observación"
                  modules={modules}
                  formats={formats}
                  onChange={(e) => setDescripcion(e.valueOf())}
                />
              </FormControl>
            </AlertDialogBody>
            <AlertDialogFooter>
            <Button onClick={handleCloseAlert}  colorScheme="red" variant="outline">CANCELAR</Button>
              <Button
                bg={'yellow.500'}
                _hover={{ bg: 'yellow.600' }}
                color={'white'}
                ml={3}
                disabled={(descripcion.length < 5 || descripcion === '') ? true : false}
                onClick={() => ActualizarIncidenciaEnTramite()}
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

export default IncidenciaTramitar;