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
      notification('Organo asiganado', 'Organo ha sido asiganado correctamente.', 'success', 'modalOrganoAsignacion');
    } else if (response.status === 422) {
      notification('Error de asignación', 'No se puede asignar este organo', 'error', 'modalOrganoAsignacion');
    } else {
      notification('Error de asignacion', 'No se pudo asignar este organo', 'error', 'modalOrganoAsignacion');
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
      notification('Eliminado', 'Se ha eliminado correctamente', 'success', 'modalOrganoAsignacion');
    } else {
      notification('No se pudo eliminar', 'No se pudo eliminar correctamente', 'error', 'modalOrganoAsignacion');
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
