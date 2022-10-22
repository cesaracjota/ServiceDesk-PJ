import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getOrganos } from '../components/ui/organo/organo';

// CREATE ORGANO

export const createOrgano = data => {
  return async dispatch => {
    const response = await fetchToken(
      `organos`,
      {
        organo: data.organo,
        sede: data.sede,
        activo: data.activo,
      },
      'POST'
    );

    if (response.status === 200 || response.status === 201) {
      dispatch(getOrganos(await loadOrgano()));
      notification('ORGANO CREADO', 'EL ORGANO JURIDICCIONAL HA SIDO CREADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR DE REGISTRO', 'NO SE LOGRÓ REGISTRAR EL ORGANO JURIDICCIONAL', 'error');
    }
  };
};

export const fetchOrganos = async () => {
  const response = await fetchToken('organos');
  if(!response.ok){
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const Organos = {};
    Organos.data = data;
    return Organos;
  }
};

export const fetchOrgano = async (id) => {
  const response = await fetchToken('organos/listall/' + id);
  if(!response.ok){
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const Organo = {};
    Organo.data = data;
    return Organo;
  }
};

// ACTUALIZAR ORGANO

export const updateOrgano = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `organos`,
      {
        idOrgano: data.idOrgano,
        organo: data.organo,
        sede: data.sede,
        activo: data.activo,
      },
      'PUT'
    );

    if (response.status === 200) {
      dispatch(getOrganos(await loadOrgano()));
      notification('ORGANO MODIFICADO', 'EL ORGANO JURIDICCIONAL HA SIDO MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL MODIFICAR', 'NO SE LOGRÓ MODIFICAR EL ORGANO JURIDICCIONAL', 'error');
    }
  };
};

// DELETE / DISABLED ORGANO

export const deleteOrgano = id => {
  return async dispatch => {
    const response = await fetchToken(`organos/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getOrganos(await loadOrgano()));
      notification('ESTADO MODIFICADO', 'SE HA MODIFICADO EL ESTADO DEL ORGANO JURIDICCIONAL CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL MODIFICAR ESTADO', 'NO SE LOGRÓ MODIFICAR EL ESTADO DEL ORGANO JURIDICCIONAL', 'error');
    }
  };
};

// Refrescar la tabla

export const loadOrgano = async () => {
  const response = await fetchToken('organos');
  if(!response.ok){
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const Organos = {};
    Organos.data = data;
    return Organos;
  }
};
