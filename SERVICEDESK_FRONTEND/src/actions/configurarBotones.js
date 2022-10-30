import { fetchToken } from '../helpers/fetch';
import { getConfiguracionBotones } from '../components/ui/incidencia/asistente/incidencia';

export const ActualizarEstadoBoton = (id) => {
    return async dispatch => {
      const response = await fetchToken(`configuraciones/${id}`, '', 'POST');
      if (response.status === 200) {
        dispatch(getConfiguracionBotones(await loadConfiguracionBotones()));
      }
    };
  };

export const loadConfiguracionBotones = async () => {
    try {
        const response = await fetchToken('configuraciones');
        if (!response.ok) {
        throw new Error(response.status);
        } else {
        const data = await response.json();
        const ConfiguracionBotones = {};
        ConfiguracionBotones.data = data;
        return ConfiguracionBotones;
        }
    } catch (error) {
        // console.log(error);
    }
}