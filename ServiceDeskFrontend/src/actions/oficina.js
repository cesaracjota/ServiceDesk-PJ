import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getOficinas } from '../components/ui/oficina/oficina';

// CREATE ORGANO

export const createOficina = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `oficinas`,
      {
        oficina: data.oficina,
        organo: {idOrgano: data.organo},
        activo: data.activo,
      },
      'POST'
    );

    if (response.status === 200 || response.status === 201) {
      dispatch(getOficinas(await loadOficina()));
      notification('OFICINA CREADO', 'LA OFICINA HA SIDO CREADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL CREAR', 'NO SE LOGRÓ CREAR LA OFICINA', 'error');
    }
  };
};

export const cargarOficinas = () => {
  return async dispatch => {
    const response = await fetchToken('oficinas', 'GET');
    const body = await response.json();

    if ( response.status === 200 || response.status === 201 ) {
      dispatch(getOficinas(body));
    }else{
      notification('ERROR AL CARGAR', 'NO SE LOGRÓ CARGAR LAS OFICINAS', 'error');
    }
  }
}

export const fetchOficinas = async () => {
  const response = await fetchToken('oficinas');
  if(!response.ok){
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const Oficinas = {};
    Oficinas.data = data;
    return Oficinas;
  }
};

export const fetchOficina = async (id) => {
  const response = await fetchToken('oficinas/listall/' + id);
  if(!response.ok){
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const Oficina = {};
    Oficina.data = data;
    return Oficina;
  }
};

// ACTUALIZAR ORGANO

export const updateOficina = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `oficinas`,
      {
        idOficina: data.idOficina,
        oficina: data.oficina,
        organo: data.organo,
        activo: data.activo,
      },
      'PUT'
    );

    if (response.status === 200) {
      dispatch(getOficinas(await loadOficina()));
      notification('OFICINA MODIFICADO', 'OFICINA HA SIDO MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL MODIFICAR', 'NO SE LOGRÓ MODIFICAR LA OFICINA', 'error');
    }
  };
};

// DELETE / DISABLED ORGANO

export const deleteOficina = id => {
  return async dispatch => {
    const response = await fetchToken(`oficinas/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getOficinas(await loadOficina()));
      notification('ESTADO MODIFICADO', 'EL ESTADO DE LA OFICINA HA SIDO MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL MODIFICAR', 'NO SE LOGRÓ MODIFICAR EL ESTADO DE LA OFICINA', 'error');
    }
  };
};

// Refrescar la tabla

export const loadOficina = async () => {
  const response = await fetchToken('oficinas');
  if(!response.ok){
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const Oficina = {};
    Oficina.data = data;
    return Oficina;
  }
};

