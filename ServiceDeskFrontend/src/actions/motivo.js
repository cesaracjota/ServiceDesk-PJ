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
      notification('Motivo registrado', 'El Motivo ha sido registrado correctamente.', 'success');
    } else {
      notification('Error de registro', 'No se pudo registrar el Motivo', 'error');
    }
  };
};

export const createMotivo1 = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `motivos`,
      {
        motivo: data.motivo,
      },
      'POST'
    );

    if (response.status === 200 || response.status === 201) {
      // dispatch(getMotivo(await loadMotivo()));
      // notification('Motivo registrado', 'El Motivo ha sido registrado correctamente.', 'success');
    } else {
      notification('Error de registro', 'No se pudo registrar el Motivo', 'error');
    }
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
      notification('Motivo modificado', 'El motivo ha sido modificado correctamente.', 'success');
    } else {
      notification('Error de modificación', 'No se pudo actualizar el motivo', 'error');
    }
  };
};

//  Delete la tabla

export const deleteMotivo = (id) => {
  return async dispatch => {
    const response = await fetchToken(`motivos/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getMotivo(await loadMotivo()));
      notification('Motivo eliminado correctamente', "Se ha eliminado correctame el motivo", 'success');
    } else {
      notification('No se pudo eliminar el Motivo', "No se ha logrado eliminar el motivo", 'error');
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
