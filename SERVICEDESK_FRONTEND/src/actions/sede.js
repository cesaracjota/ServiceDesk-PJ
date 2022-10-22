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

    if (response.status === 200 || response.status === 201) {
      
      dispatch(getSede(await loadSede()));

      notification('SEDE CREADO', 'LA SEDE SE HA CREADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR DE REGISTRO', 'NO SE LOGRÓ CREAR LA SEDE', 'error');
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

    if (response.status === 200) {
      dispatch(getSede(await loadSede()));
      notification('SEDE MODIFICADO', 'LA SEDE SE HA MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL MODIFICAR', 'NO SE LOGRÓ MODIFICAR LA SEDE', 'error');
    }
  };
};

//  DELETE / DISABLED SEDE

export const deleteSede = id => {
  return async dispatch => {
    const response = await fetchToken(`sedes/${id}`, '', 'DELETE');
    if (response.status === 200) {
      dispatch(getSede(await loadSede()));
      notification('ESTADO MODIFICADO', 'EL ESTADO DE LA SEDE SE HA MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL MODIFICAR ESTADO', 'NO SE HA LOGRADO MODIFICAR EL ESTADO DE LA SEDE', 'error');
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
