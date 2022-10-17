import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getOficinas } from '../components/ui/oficina/oficina';

// CREATE ORGANO

export const createOficina = data => {
  var idOrgano = {};
  if (data.organo != null) {
    idOrgano = {
      idOrgano: Number(data.organo),
    };
  }
  
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
      notification('Oficina registrado', 'Oficina registrado correctamente.', 'success');
    } else {
      notification('Error de registro', 'No se pudo registrar la Oficina', 'error');
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
      notification('Error al cargar Oficinas', 'No se pudo cargar las Oficinas', 'error');
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

export const updateOficina = data => {

  var idOrgano = {};
  if (data.organo.idOrgano != null) {
    idOrgano = {
      idOrgano: Number(data.organo.idOrgano),
    };
  } else {
    idOrgano = {
      idOrgano: Number(data.organo),
    };
  }

  return async dispatch => {
    const response = await fetchToken(
      `oficinas`,
      {
        idOficina: data.idOficina,
        oficina: data.oficina,
        organo: idOrgano,
        activo: data.activo,
      },
      'PUT'
    );

    if (response.status === 200) {
      dispatch(getOficinas(await loadOficina()));
      notification('Oficina actualizado', 'Oficina actualizado correctamente', 'success');
    } else {
      notification('Error al actualizar', 'No se pudo actualizar el Oficina', 'error');
    }
  };
};

// DELETE / DISABLED ORGANO

export const deleteOficina = id => {
  return async dispatch => {
    const response = await fetchToken(`oficinas/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getOficinas(await loadOficina()));
      notification('Oficina actualizado', 'Oficina se ha actualizado correctamente.', 'success');
    } else {
      notification('Error al eliminar', 'No se pudo eliminar la Oficina', 'error');
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

