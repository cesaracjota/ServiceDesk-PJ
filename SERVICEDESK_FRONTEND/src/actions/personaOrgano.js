import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';

export const createPersonaOrgano = (idpersona, idOrgano) => {
  return async dispatch => {
    const response = await fetchToken(
      `personaorganos`,
      {
        persona: { idpersona: idpersona },
        organo: { idOrgano: idOrgano },
      },
      'POST'
    );
    if (response.status === 200 || response.status === 201) {
      notification('ORGANO ASIGNADO', 'EL ORGANO HA SIDO ASIGNADO CORRECTAMENTE', 'success', 'modalOrganoAsignacion');
    } else if (response.status === 422) {
      notification('ERROR DE ASIGNACIÓN', 'NO SE PUEDE ASIGNAR ESTE ORGANO', 'error', 'modalOrganoAsignacion');
    } else {
      notification('ERROR DE ASIGNACIÓN', 'NO SE LOGRÓ ASIGNAR EL ORGANO, INTENTE DE NUEVO', 'error', 'modalOrganoAsignacion');
    }
  };
};

export const fetchPersonaOrgano = async (id) => {
  const response = await fetchToken('personaorganos/persona/' + id);
  const body = await response.json();
  const PersonaOrgano = {};
  const data = [];

  body.forEach(x => {
    data.push({
      organo: x.organo.organo,
      idOrgano: x.organo.idOrgano,
      sede: x.organo.sede.sede,
      idSede: x.organo.sede.idSede,
      idPersonaOrgano: x.idPersonaOrgano,
    });
  });
  PersonaOrgano.data = data;
  return PersonaOrgano;
};

export const deletePersonaOrgano = (id) => {
  return async dispatch => {
    const response = await fetchToken(`personaorganos/${id}`, '', 'DELETE');

    if (response.status === 200 || response.status === 201) {
      notification('REGISTRO ELIMINADO', 'EL REGISTRO SE LOGRÓ ELIMINAR CORRECTAMENTE', 'success', 'modalOrganoAsignacion');
    } else {
      notification('ERROR AL ELIMINAR', 'NO SE LOGRÓ ELIMINAR EL REGISTRO', 'error', 'modalOrganoAsignacion');
    }
  };
};

export const loadPersonaOrgano = async (id) => {
  const response = await fetchToken('personaorganos/persona/' + id);
  const body = await response.json();
  const PersonaOrgano = {};
  const data = [];

  body.forEach(x => {
    data.push({
      organo: x.organo,
      persona: x.persona,
      idPersonaOrgano: x.idPersonaOrgano,
    });
  });
  PersonaOrgano.data = data;
  return PersonaOrgano;
};
