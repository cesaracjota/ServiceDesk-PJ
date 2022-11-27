import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getMensajes } from '../components/ui/mensaje/mensaje';

// CREATE MENSAJE

export const createMensaje = (data) => {
    return async dispatch => {
        const response = await fetchToken(
            `mensajes`,
            {
                asunto: data.asunto,
                mensaje: data.mensaje,
                persona: data.persona,
                fechaHasta: data.fechaHasta,
                activo: data.activo,
            },
            'POST'
        );

        if (response.status === 200 || response.status === 201) {
            dispatch(getMensajes(await loadMensajes()));
            notification('MENSAJE REGISTRADO', 'EL MENSAJE SE HA REGISTRADO CORRECTAMENTE', 'success');
        } else {
            notification('ERROR DE REGISTRO', 'EL MENSAJE NO SE PUDO REGISTRAR', 'error');
        }
    };
};

// LIST CARGO

export const fetchMensajes = async () => {
    try {
        const response = await fetchToken('mensajes');
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();
            const Mensajes = {};
            Mensajes.data = data;
            return Mensajes;
        }
    } catch (error) {
        // console.log("WARN " + error);
    }
};

export const fetchMensaje = async (id) => {
    try {
        const response = await fetchToken(`mensajes/${id}`);
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();
            const Mensaje = {};
            Mensaje.data = data;
            return Mensaje;
        }
    } catch (error) {
        // console.log(error);
    }
};

//  UPDATE MENSAJE

export const updateMensaje = (data) => {
    return async dispatch => {
        const response = await fetchToken(
            `mensajes`,
            {
                idMensaje: data.idMensaje,
                asunto: data.asunto,
                persona: data.persona,
                mensaje: data.mensaje,
                fechaHasta: data.fechaHasta,
                activo: data.activo,
            },
            'PUT'
        );

        if (response.status === 200) {
            dispatch(getMensajes(await loadMensajes()));
            notification('MENSAJE MODIFICADO', 'EL MENSAJE HA SIDO MODIFICADO CORRECTAMENTE', 'success');
        } else {
            notification('ERROR AL MODIFICAR', 'NO SE LOGRÓ MODIFICAR EL MENSAJE, CORRECTAMENTE ', 'error');
        }
    };
};

// UPDATE ESTADO

export const updateEstadoMensaje = (id) => {
    return async dispatch => {
      const response = await fetchToken(`mensajes/${id}`, '', 'POST');

      if (response.status === 200) {
        dispatch(getMensajes(await loadMensajes()));
        notification('ESTADO MODIFICADO', 'EL ESTADO DEL MENSAJE HA SIDO MODIFICADO CORRECTAMENTE', 'success');
        } else {
            notification('ERROR AL MODIFICAR', 'NO SE LOGRÓ MODIFICAR EL ESTADO DEL MENSAJE, CORRECTAMENTE ', 'error');
        }
    };
  };

//  DELETE / DISABLED MENSAJE

export const deleteMensaje = (id) => {
    return async dispatch => {
        const response = await fetchToken(`mensajes/${id}`, '', 'DELETE');

        if (response.status === 200) {
            dispatch(getMensajes(await loadMensajes()));
            notification('MENSAJE ELIMINADO', 'EL MENSAJE HA SIDO ELIMINADO CORRECTAMENTE', 'success');
        } else {
            notification('ERROR AL ELIMINAR', 'NO SE LOGRÓ ELIMINAR EL MENSAJE', 'error');
        }
    };
};

// Refrescar la tabla

export const loadMensajes = async () => {
    try {
        const response = await fetchToken('mensajes');
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();
            const Mensaje = {};
            Mensaje.data = data;
            return Mensaje;
        }
    } catch (error) {
        // console.log(error);
    }
};