import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';

export const fetchHistorialPersona = async (id) => {
  const response = await fetchToken('historialpersonas/persona/' + id);
  if(!response.ok){
    // throw new Error(response.statusText);
  }else if(response.status === 200 || response.status === 201){
    const data = await response.json();
    const HistorialPersona = {};
    HistorialPersona.data = data;
    return HistorialPersona;
  }else{
    notification('Error al cargar Datos', 'No se pudo cargar el historial', 'error');
    return false;
  }
};

export const createHistorialPersona = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `historialpersonas/save`,
      {
        persona: { idpersona: data.persona.idpersona },
        cargo: { idCargo: data.cargo ? data.cargo.idCargo : null },
        oficina: {
          idOficina: data.oficina ? data.oficina.idOficina : null,
        },
        iniciaCargo: data.iniciaCargo,
        terminaCargo: data.terminaCargo,
        activo: data.activo,
      },
      'POST'
    );

    if (response.status === 200 || response.status === 201) {
      notification('Datos registrados correctamente.', 'Sus Datos ha sido registrado correctamente', 'success', 'modalOrganoAsignacion');
    } else {
      notification('Error de registro sus Datos', 'No se pudo registrar sus Datos', 'error', 'modalOrganoAsignacion');
    }
  };
};
