import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getPersona } from '../components/ui/persona/persona';
import { startLogin } from './auth';

// // CREATE PERSONA

export const createPersona = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `personas`,
      {
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        usuario: data.usuario,
        password: data.password,
        correo: data.correo,
        celular: data.celular,
        telefono: data.telefono,
        anexo: data.anexo,
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: {
          idPerfilPersona: data.perfilPersona.idPerfilPersona
        }
      },
      'POST'
    );

    if (response.status === 200 || response.status === 201) {
      dispatch(getPersona(await loadPersona()));
      notification('USUARIO CREADO', 'EL USUARIO SE HA CREADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL REGISTRAR', 'NO SE LOGRÓ CREAR EL USUARIO', 'error');
    }
  };
};

export const createPersonaRegister = data => {
  return async dispatch => {
    const response = await fetchToken(
      `personas/register`,
      {
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        usuario: data.dni,
        password: data.password,
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: {
          idPerfilPersona: 4
        }
      },
      'POST'
    );
    if (response.status === 200 || response.status === 201) {
      dispatch(startLogin(data.dni, data.password));
      notification('USUARIO REGISTRADO', 'EL USUARIO HA SIDO REGISTRADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL REGISTRAR', 'NO SE LOGRÓ REGISTRAR EL USUARIO, INTENTE DE NUEVO', 'error');
    }
  };
};


export const personaList = async () => {
  const response = await fetchToken('personas');
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Persona = {};
    Persona.data = data;
    return Persona;
  }
};

// ACTUALIZAR ORGANO

export const updatePersona = (data) => {

  var idPerfilPersona = {};
  if (data.perfilPersona.idPerfilPersona != null) {
    idPerfilPersona = {
      idPerfilPersona: Number(data.perfilPersona.idPerfilPersona),
    };
  } else {
    idPerfilPersona = {
      idPerfilPersona: Number(data.perfilPersona),
    };
  }

  return async dispatch => {
    const response = await fetchToken(
      `personas`,
      {
        idpersona: data.idpersona,
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        usuario: data.usuario,
        password: data.password,
        correo: data.correo,
        celular: data.celular,
        telefono: data.telefono,
        anexo: data.anexo,
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: idPerfilPersona
      },
      'PUT'
    );

    if (response.status === 200) {
      dispatch(getPersona(await loadPersona()));
      notification('PERSONA MODIFICADO', 'LA PERSONA SE HA MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL MODIFICAR', 'NO SE LOGRÓ MODIFICAR EL USUARIO', 'error');
    }
  };
};

export const fetchUsuarioId = async (id) => {
  const response = await fetchToken(`personas/${id}`);
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Persona = {};
    Persona.data = data;
    return Persona;
  }
}

// DELETE / DISABLED ORGANO

export const deletePersona = id => {
  return async dispatch => {
    const response = await fetchToken(`personas/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getPersona(await loadPersona()));
      notification('ESTADO MODIFICADO', 'EL ESTADO DEL USUARIO SE LOGRÓ MODIFICAR CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL MODIFICAR ESTADO', 'NO SE LOGRÓ MODIFICAR EL ESTADO DEL USUARIO', 'error');
    }
  };
};

// Consulta API reniec para obtener datos de persona

export const consultaReniec = async (dni) => {
    const response = await fetchToken(`reniec/${dni}`);
    if (!response.ok) {
      throw new Error(response.status);
    } else {
        const data = await response.json();
        const Persona = {};
        Persona.data = data;
        return Persona;
    }
}

// Busqueda de usuarios por apellido
export const buscarPersonaApellido = async (apellido) => {
  const response = await fetchToken(`personas/buscar/apellido?apellido=${apellido}`);
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Persona = {};
    Persona.data = data;
    return Persona;
  }
}

// Refrescar la tabla

export const loadPersona = async () => {
  const response = await fetchToken('personas');
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Persona = {};
    Persona.data = data;
    return Persona;
  }
};

export const fetchFraseDia = async () => {
  const response = await fetchToken('frasedia');
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Frase = {};
    Frase.data = data;
    return Frase;
  }
}