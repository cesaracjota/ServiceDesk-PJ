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

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      notification("Perfil registrado correctamente.", body.message, 'success');
      dispatch(getPerfilPersona(await loadPerfilPersona()));
    } else {
      notification("No se pudo registrar el Perfil", body.error, 'error');
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

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getPerfilPersona(await loadPerfilPersona()));
      notification("Perfil actualizado correctamente", body.message, 'success');
    } else {

      notification("No se pudo actualizar el Perfil", body.error, 'error');

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

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getPerfilPersona(await loadPerfilPersona()));
      notification("Perfil actualizado correctamente", body.message, 'success');
    } else {
      notification("No se pudo eliminar el Perfil", body.error, 'error');
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
