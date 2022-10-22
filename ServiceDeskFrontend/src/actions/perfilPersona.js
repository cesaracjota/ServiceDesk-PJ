import { fetchToken } from '../helpers/fetch';
import { notification } from "../helpers/alert";
import { getPerfilPersona } from '../components/ui/perfilpersona/perfilPersona';

export const createPerfilPersona = (data) => {

  return async (dispatch) => {
    const response = await fetchToken(
      `perfil`,
      {
        'descripcion': data.descripcion,
        'perfil': data.perfil,
        'activo': data.activo,
      },
      'POST');

    if (response.status === 200 || response.status === 201) {
      notification("PERFIL CREADO", 'EL PERFIL DE PERSONA HA SIDO CREADO CORRECTAMENTE', 'success');
      dispatch(getPerfilPersona(await loadPerfilPersona()));
    } else {
      notification("ERROR DE REGISTRO", 'NO SE LOGRÓ CREAR EL PERFIL DE PERSONA', 'error');
    }
  }
}

export const perfilPersona = async () => {
  const response = await fetchToken('perfil');
  if(!response.ok){
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const PerfilPersona = {};
    PerfilPersona.data = data;
    return PerfilPersona;
  }
};

export const updatePerfilPersona = (data) => {

  return async (dispatch) => {
    const response = await fetchToken(
      `perfil`,
      {
        'idPerfilPersona': data.idPerfilPersona,
        'perfil': data.perfil,
        'descripcion': data.descripcion,
        'activo': data.activo,
      },
      'PUT');

    if (response.status === 200) {
      dispatch(getPerfilPersona(await loadPerfilPersona()));
      notification("PERFIL MODIFICADO", 'EL PERFIL DE PERSONA HA SIDO MODIFICADO CORRECTAMENTE', 'success');
    } else {

      notification("ERROR AL MODIFICAR", 'NO SE HA LOGRADO MODIFICAR EL PERFIL DE PERSONA', 'error');

    }
  }
}

export const deletePerfilPersona = (id) => {
  return async (dispatch) => {
    const response = await fetchToken(
      `perfil/${id}`,
      "",
      'DELETE'
    );

    if (response.status === 200) {
      dispatch(getPerfilPersona(await loadPerfilPersona()));
      notification("ESTADO PERFIL MODIFICADO", 'EL ESTADO DEL PERFIL DE PERSONA SE HA MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification("ERROR AL MODIFICAR", 'EL ESTADO DEL PERFIL PERSONA, NO SE LOGRÓ MODIFICAR', 'error');
    }
  }
}


// Refrescar la tabla

export const loadPerfilPersona = async () => {
  const response = await fetchToken('perfil');
  if(!response.ok){
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const PerfilPersona = {};
    PerfilPersona.data = data;
    return PerfilPersona;
  }
};
