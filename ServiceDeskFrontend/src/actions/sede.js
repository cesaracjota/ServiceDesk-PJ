import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getSede } from '../components/ui/sede/sede';

// CREATE SEDE

export const createSede = data => {
  return async dispatch => {
    const response = await fetchToken(
      `sedes`,
      {
        sede: data.sede,
        direccion: data.direccion,
        activo: data.activo,
      },
      'POST'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      
      dispatch(getSede(await loadSede()));

      notification('Sede registrado correctamente.', '', 'success');
    } else {
      notification('No se pudo registrar la Sede', '', 'error');
    }
  };
};

// LIST SEDE

export const fetchSedes = async () => {
  const response = await fetchToken('sedes');
  const body = await response.json();
  const Sede = {};
  const data = [];

  body.forEach(sede => {
    data.push({
      idSede: sede.idSede,
      sede: sede.sede,
      direccion: sede.direccion,
      activo: sede.activo,
    });
  });
  Sede.data = data;
  // set user info

  return Sede;
};

//  UPDATE SEDE

export const updateSede = data => {
  return async dispatch => {
    const response = await fetchToken(
      `sedes`,
      {
        idSede: data.idSede,
        sede: data.sede,
        direccion: data.direccion,
        activo: data.activo,
      },
      'PUT'
    );

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getSede(await loadSede()));
      notification('Sede actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo actualizar la Sede', body.error, 'error');
    }
  };
};

//  DELETE / DISABLED SEDE

export const deleteSede = id => {
  return async dispatch => {
    const response = await fetchToken(`sedes/${id}`, '', 'DELETE');

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getSede(await loadSede()));
      notification('Sede actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo eliminar la Sede', body.error, 'error');
    }
  };
};

// Refrescar la tabla

export const loadSede = async () => {
  const response = await fetchToken('sedes');
  const body = await response.json();
  const Sede = {};
  const data = [];

  body.forEach(sede => {
    data.push({
      idSede: sede.idSede,
      sede: sede.sede,
      direccion: sede.direccion,
      activo: sede.activo,
    });
  });
  Sede.data = data;
  return Sede;
};
