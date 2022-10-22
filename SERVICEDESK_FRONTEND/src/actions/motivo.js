import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getMotivo } from '../components/ui/motivoIncidencia/motivo';

// CREATE SEDE

export const createMotivo = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `motivos`,
      {
        motivo: data.motivo,
      },
      'POST'
    );

    if (response.status === 200 || response.status === 201) {
      dispatch(getMotivo(await loadMotivo()));
      notification('MOTIVO CREADO', 'EL MOTIVO HA SIDO CREADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR DE CREACIÓN', 'NO SE LOGRÓ CREAR EL MOTIVO', 'error');
    }
  };
};

export const createMotivo1 = (data) => {
  return async dispatch => {
    await fetchToken(
      `motivos`,
      {
        motivo: data.motivo,
      },
      'POST'
    );
  };
};

// LIST MOTIVO

export const fetchMotivos = async () => {
  const response = await fetchToken('motivos');
  if(!response.ok) {
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const Motivos = {};
    Motivos.data = data;
    return Motivos;
  }
};

//  UPDATE MOTIVO

export const updateMotivo = data => {
  return async dispatch => {
    const response = await fetchToken(
      `motivos`,
      {
        idMotivo: data.idMotivo,
        motivo: data.motivo,
      },
      'PUT'
    );

    if (response.status === 200) {
      dispatch(getMotivo(await loadMotivo()));
      notification('MOTIVO MODIFICADO', 'EL MOTIVO HA SIDO MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR DE MOFICICACIÓN', 'NO SE PUDO MODIFICAR EL MOTIVO', 'error');
    }
  };
};

//  Delete la tabla

export const deleteMotivo = (id) => {
  return async dispatch => {
    const response = await fetchToken(`motivos/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getMotivo(await loadMotivo()));
      notification('MOTIVO ELIMINADO', "EL MOTIVO HA SIDO ELIMINADO CORRECTAMENTE", 'success');
    } else {
      notification('ERROR AL ELIMINAR', "NO SE LOGRÓ ELIMINAR EL MOTIVO", 'error');
    }
  };
};

// Refrescar la tabla

export const loadMotivo = async () => {
  const response = await fetchToken('motivos');
  if(!response.ok) {
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const Motivos = {};
    Motivos.data = data;
    return Motivos;
  }
};
