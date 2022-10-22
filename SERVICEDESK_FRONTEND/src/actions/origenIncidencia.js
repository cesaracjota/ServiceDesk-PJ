import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getOrigen } from '../components/ui/origenIncidencia/origen';

export const createOrigen = data => {
    return async dispatch => {
      const response = await fetchToken(
        `origenincidencia`,
        {
          origen: data.origen,
        },
        'POST'
      );
  
      if (response.status === 200 || response.status === 201) {
        dispatch(getOrigen(await loadOrigen()));
        notification('ORIGEN CREADO', 'EL ORIGEN DE LA INCIDENCIA HA SIDO REGISTRADO CORRECTAMENTE', 'success');
      } else {
        notification('ERROR DE REGISTRO', 'NO SE LOGRÓ CREAR LA EL ORIGEN DE LA INCIDENCIA', 'error');
      }
    };
  };

  export const createOrigen1 = data => {
    return async dispatch => {
      await fetchToken(
        `origenincidencia`,
        {
          origen: data.origen,
        },
        'POST'
      );
    };
  };
  
  // LIST ORIGEN
  
  export const fetchOrigen = async () => {
    const response = await fetchToken('origenincidencia/listAll');
    if(!response.ok) {
      throw new Error(response.statusText);
    }else{
      const data = await response.json();
      const Origen = {};
      Origen.data = data;
      return Origen;
    }
  };
  
  //  UPDATE ORIGEN
  
  export const updateOrigen = data => {
    return async dispatch => {
      const response = await fetchToken(
        `origenincidencia`,
        {
          idOrigen: data.idOrigen,
          origen: data.origen,
        },
        'PUT'
      );
  
      if (response.status === 200 || response.status === 201) {
        dispatch(getOrigen(await loadOrigen()));
        notification('ORIGEN MODIFICADO', 'EL ORIGEN DE LA INCIDENCIA, HA SIDO MODIFICADO CORRECTAMENTE', 'success');
      } else {
        notification('ERROR DE MODIFICACIÓN', 'NO SE LOGRÓ MODIFICAR EL ORIGEN DE LA INCIDENCIA', 'error');
      }
    };
  };
  
  //  Delete ORIGEN
  
  export const deleteOrigen = (id) => {
    return async dispatch => {
      const response = await fetchToken(`origenincidencia/${id}`, '', 'DELETE');
  
      if (response.status === 200 || response.status === 201) {
        dispatch(getOrigen(await loadOrigen()));
        notification('ORIGEN ELIMINADO', 'EL ORIGEN DE LA INCIDENCIA, HA SIDO ELIMINADO CORRECTAMENTE', 'success');
  
      } else {
        notification('ERROR AL ELIMINAR', 'NO SE LOGRÓ ELIMINAR EL ORIGEN DE LA INCIDENCIA', 'error');
      }
    };
  };
  
  // Refrescar la tabla
  
  export const loadOrigen = async () => {
    const response = await fetchToken('origenincidencia/listAll');
    if(!response.ok) {
      throw new Error(response.statusText);
    }else{
      const data = await response.json();
      const Origen = {};
      Origen.data = data;
      return Origen;
    }
  };
  