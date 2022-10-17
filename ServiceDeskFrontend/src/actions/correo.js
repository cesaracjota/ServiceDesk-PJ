import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getCorreosEnviados } from '../components/ui/correo/index';

// CREATE CORREO /listall/{id}/persona/to

export const createCorreo = data => {
  return async dispatch => {
    const response = await fetchToken(
      `correo/create`,
      {
        to: data.to,
        from: data.from,
        asunto: data.asunto,
        mensaje: data.mensaje,
        activo: data.activo,
        fecha: data.fecha,
      },
      'POST'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      notification('Correo enviado correctamente.', 'El correo enviado correctamente.', 'success');
    } else {
      notification('Error de envio', 'No se pudo enviar el Correo', 'error');
    }
  };
};

// UPDATE SET ACTIVO // CORREO LEIDO

export const correoLeido = (id) => {
  return async dispatch => {
    const response = await fetchToken(
      `correo/leido/`+ id,'', 'PUT');
    if (response.status === 200) {
    } else {
      // console.log('error', response.status)
    }
  };
};


// LIST CORREOS RECIBIDOS

export const fetchCorreoRecibido = async (id) => {
  const response = await fetchToken('correo/listall/' + id + '/persona/to');
  if(!response.ok) {
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const CorreoRecibido = {};
    CorreoRecibido.data = data;
    return CorreoRecibido;
  }
};

export const fetchCorreoEnviado = async (id) => {
  const response = await fetchToken('correo/listall/' + id + '/persona/from');
  if(!response.ok) {
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const CorreoEnviado = {};
    CorreoEnviado.data = data;
    return CorreoEnviado;
  }
};

export const fetchCorreoDetalles = async (id) => {
  const response = await fetchToken('correo/listall/' + id);
  if(!response.ok) {
    throw new Error(response.statusText);
  }else{
    const data = await response.json();
    const CorreoDetalles = {};
    CorreoDetalles.data = data;
    return CorreoDetalles;
  }
}