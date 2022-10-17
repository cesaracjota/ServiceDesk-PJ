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
        notification('Origen registrado', 'Origen ha sido registrado correctamente.', 'success');
      } else {
        notification('Error de registro', 'No se pudo registrar el Origen', 'error');
      }
    };
  };

  export const createOrigen1 = data => {
    return async dispatch => {
      const response = await fetchToken(
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
        notification('Origen actualizado', 'Origen ha sido actualizado correctamente.', 'success');
      } else {
        notification('Error al actualizar', 'No se pudo actualizar el origen de incidencia', 'error');
      }
    };
  };
  
  //  Delete ORIGEN
  
  export const deleteOrigen = (id) => {
    return async dispatch => {
      const response = await fetchToken(`origenincidencia/${id}`, '', 'DELETE');
  
      if (response.status === 200 || response.status === 201) {
        dispatch(getOrigen(await loadOrigen()));
        notification('Origen eliminado', 'Origen ha sido eliminado correctamente', 'success');
  
      } else {
        notification('Error al actualizar', 'No se pudo eliminar el origen', 'error');
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
  